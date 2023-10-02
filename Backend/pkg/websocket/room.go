package websocket

import (
	"fmt"
	"github.com/google/uuid"
)

type Room struct {
	RoomId     string
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Users      []User
	Broadcast  chan interface{}
	count      int
	HandleGame chan Body
	Board      [9]string
	Symbols    []string
}

// This function will create a new room and return address to that room
func NewRoom() *Room {
	uuid := uuid.NewString()
	room := &Room{
		RoomId:     uuid,
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan interface{}),
		HandleGame: make(chan Body),
		count:      0,
	}
	//Intialize a new board for each room
	room.Board = [9]string{"", "", "", "", "", "", "", "", ""}
	room.Symbols = []string{"X", "O"}
	return room
}

type GameState struct {
	Type       string    `json:"type,omitempty"`
	Board      [9]string `json:"board"`
	PlayerTurn string    `json:"player_turn"`
}

func (room *Room) handleMoves(moves Body) GameState {
	var gameState GameState
	// Apply the move
	gameState.Type = "game_state"
	room.Board[moves.Pos] = moves.Symbol

	gameState.Board = room.Board
	// Check if there is a winner
	// Implement checkWinner() logic here and set appropriate values in 'message'

	// Change player turn
	if moves.Symbol == "X" {
		gameState.PlayerTurn = "O"
	} else {
		gameState.PlayerTurn = "X"
	}

	return gameState
}

func (room *Room) Start() {
	for {
		select {
		//New client registers

		case client := <-room.Register:
			fmt.Print("Inside here")
			room.Clients[client] = true
			fmt.Println("Size of Connection Pool: ", len(room.Clients))
			break

		case client := <-room.Unregister:
			var updatedUsers []User
			for _, user := range room.Users {
				if user.ID != client.Conn {
					updatedUsers = append(updatedUsers, user)
				}
			}
			delete(room.Clients, client)
			room.Users = updatedUsers
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
