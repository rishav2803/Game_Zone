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

//func (room *Room) handleMoves(moves Body) Message {
//	//check the winner before applying the moves
//	// return checkWinner()
//	var message Message

//	//Here apply the move
//	for i := 0; i < len(room.Board); i++ {
//		if room.Board[moves.Pos] != "" {
//			room.Board[moves.Pos] = moves.Symbol
//			message = Message{Type: message.Type, Body: message.Body, Ready: true}
//			return message
//		}
//	}

//	// return something
//}

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
			message := Message{Type: "user", Users: room.Users, Ready: false}
			for client, _ := range room.Clients {
				if err := client.Conn.WriteJSON(message); err != nil {
					fmt.Println(err)
					return
				}
			}
			break
		case move := <-room.HandleGame:
			fmt.Println(move.Pos)
			//Return some kind of message form the handle moves
			// mssg := room.handleMoves(move)
			// room.Broadcast<-mssg
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
