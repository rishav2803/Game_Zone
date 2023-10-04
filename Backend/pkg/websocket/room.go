package websocket

import (
	"fmt"
	"strings"

	"github.com/google/uuid"
)

func intializeBoard() [9]string {
	return [9]string{"", "", "", "", "", "", "", "", ""}

}

type Room struct {
	RoomId                  string
	Register                chan *Client
	Unregister              chan *Client
	Clients                 map[*Client]bool
	Users                   []User
	Broadcast               chan interface{}
	count                   int
	HandleGame              chan Body
	HandleResetRequestsChan chan *Client
	Board                   [9]string
	Symbols                 []string
}

// This function will create a new room and return address to that room
func NewRoom() *Room {
	uuid := uuid.NewString()
	room := &Room{
		RoomId:                  uuid,
		Register:                make(chan *Client),
		Unregister:              make(chan *Client),
		Clients:                 make(map[*Client]bool),
		Broadcast:               make(chan interface{}),
		HandleGame:              make(chan Body),
		HandleResetRequestsChan: make(chan *Client),
		count:                   0,
	}
	//Intialize a new board for each room
	room.Board = intializeBoard()
	room.Symbols = []string{"X", "O"}
	return room
}

type Error struct {
	Mssg string `json:"mssg"`
}

type GameStateResponse struct {
	Type        string    `json:"type,omitempty"`
	Board       [9]string `json:"board"`
	PlayerTurn  string    `json:"player_turn"`
	Error       string    `json:"err"`
	Winner      string    `json:"winner"`
	ResetStatus bool      `json:"reset_status"`
}

// This function will check if all the players have made the reset request or not
func (room *Room) HandleResetRequests() {
	resetCount := 0

	for {
		select {
		case client := <-room.HandleResetRequestsChan:
			resetCount++
			if resetCount == len(room.Clients) {
				room.ResetGame()
				resetCount = 0
			} else {
				// Notify the client that they need to wait for the other player
				client.Conn.WriteJSON(GameStateResponse{
					Type:        "game_state",
					PlayerTurn:  "X",
					Error:       "",
					Winner:      "",
					ResetStatus: true,
				})
			}
		}
	}
}

func (room *Room) ResetGame() {
	room.Board = [9]string{}
	gameState := GameStateResponse{
		Type:        "game_state",
		Board:       intializeBoard(),
		PlayerTurn:  "X",
		Error:       "",
		Winner:      "",
		ResetStatus: false,
	}
	room.Broadcast <- gameState
}

func checkWinner(board [9]string) string {
	winningCombos := [][3]int{
		{0, 1, 2}, {3, 4, 5}, {6, 7, 8},
		{0, 3, 6}, {1, 4, 7}, {2, 5, 8},
		{0, 4, 8}, {2, 4, 6},
	}

	for _, combo := range winningCombos {
		if board[combo[0]] != "" && board[combo[0]] == board[combo[1]] && board[combo[0]] == board[combo[2]] {
			return board[combo[0]]
		}
	}

	//Check for draw
	if !strings.Contains(strings.Join(board[:], ""), "") {
		return "tie"
	}

	// No winner yet
	return ""
}

func (room *Room) handleMoves(moves Body) GameStateResponse {
	//if the position is already taken then return the prev board and the curr symbol
	if room.Board[moves.Pos] != "" {
		return GameStateResponse{
			Type:        "game_state",
			Board:       room.Board,
			PlayerTurn:  moves.Symbol,
			Error:       "Please select a valid position",
			Winner:      "",
			ResetStatus: false,
		}
	}
	var gameState GameStateResponse
	room.Board[moves.Pos] = moves.Symbol

	winner := checkWinner(room.Board)

	gameState.Board = room.Board

	gameState.Winner = winner

	if moves.Symbol == "X" {
		gameState.PlayerTurn = "O"
	} else {
		gameState.PlayerTurn = "X"
	}

	gameState.ResetStatus = false

	return gameState
}

func (room *Room) Start() {
	go room.HandleResetRequests()
	for {
		select {
		case client := <-room.Register:
			fmt.Print("Inside here")
			room.Clients[client] = true
			fmt.Println("Size of Connection Pool: ", len(room.Clients))
			break

		case client := <-room.Unregister:
			//Now also update the symbol list as it means that
			//if new user comes we can assign the remaining symbol
			for _, user := range room.Users {
				if user.ID == client.Conn {
					room.Symbols = append(room.Symbols, user.Symbol)
				}
			}
			var updatedUsers []User
			for _, user := range room.Users {
				if user.ID != client.Conn {
					updatedUsers = append(updatedUsers, user)
				}
			}
			delete(room.Clients, client)
			//Set the count to -1 so that new user can join
			room.count -= 1
			//Give the updated userlist to the new user
			room.Users = updatedUsers
			//Set the room Board to defalt
			room.Board = intializeBoard()
			userRes := UserResponse{Type: "user", Users: room.Users, Ready: false}

			for client, _ := range room.Clients {
				if err := client.Conn.WriteJSON(userRes); err != nil {
					fmt.Println(err)
					return
				}
			}
		case move := <-room.HandleGame:
			mssg := room.handleMoves(move)
			fmt.Print(mssg)
			for client, _ := range room.Clients {
				if err := client.Conn.WriteJSON(mssg); err != nil {
					fmt.Println(err)
					return
				}
			}
		case message := <-room.Broadcast:
			fmt.Println("Sending message to all clients in Pool")
			for client, _ := range room.Clients {
				if err := client.Conn.WriteJSON(message); err != nil {
					fmt.Println(err)
					return
				}
			}
		}
	}
}
