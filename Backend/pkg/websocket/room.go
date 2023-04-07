package websocket

import (
	"fmt"
)

type Room struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Users      []User
	Broadcast  chan interface{}
	length     int
}

// This function will create a new room and return address to that room
func NewRoom() *Room {
	return &Room{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan interface{}),
		length:     0,
	}
}

func (room *Room) Start() {
	for {
		select {
		//New client registers
		case client := <-room.Register:
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
