package websocket

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"log"
)

// User struct keep track of user
type User struct {
	ID     *websocket.Conn `json:"-"`
	Name   string          `json:"name"`
	Symbol string          `json:"symbol"`
}

type Client struct {
	Conn *websocket.Conn
	Room *Room
}

// This will contain game state send by a particular client like pos and current player turn and symbol
type Body struct {
	Pos    int    `json:"pos,omitempty"`
	Symbol string `json:"symbol,omitempty"`
}

// All types of message will come through this
type Message struct {
	Type  string `json:"type,omitempty"`
	Body  Body   `json:"body,omitempty"`
	Users []User `json:"users,omitempty"`
}

// Now if the message type is user then send it through user response struct
type UserResponse struct {
	Type       string `json:"type"`
	Users      []User `json:"users"`
	PlayerTurn string `json:"player_turn"`
	Ready      bool   `json:"ready"`
}

//This function is going to listen to incoming messages and pass to room which will broadcast to
//other client in that room

// this is in a sense like we are associating this method to the client struct
func (c *Client) ListenMessages() {
	//This function is going to wait until the below is returned and then will close the connection
	var message Message
	var userResponse UserResponse
	defer func() {
		c.Room.Unregister <- c
		c.Conn.Close()
	}()

	// Open loop which will keep on listening for messages
	//kinda of like a while(true)
	//and this will keep on runing until the ws conn is open
	//Once the conn is closed the defer part is called as a type of cleanup
	for {
		_, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		err = json.Unmarshal(p, &message)
		//Perfom different task depending on the type of message
		switch message.Type {
		case "user":
			//to prevent run time error
			if len(message.Users) == 0 {
				break
			}
			u := User{
				ID:     c.Conn,
				Name:   message.Users[0].Name,
				Symbol: message.Users[0].Symbol,
			}
			c.Room.Users = append(c.Room.Users, u)
			if len(c.Room.Clients) == 1 {
				userResponse = UserResponse{Type: "user", PlayerTurn: "X", Users: c.Room.Users, Ready: false}
			} else {
				userResponse = UserResponse{Type: "user", PlayerTurn: "X", Users: c.Room.Users, Ready: true}
			}
			c.Room.Broadcast <- userResponse
		case "game":
			body := Body{Pos: message.Body.Pos, Symbol: message.Body.Symbol}
			c.Room.HandleGame <- body
		case "reset":
			c.Room.HandleResetRequestsChan <- c
		default:
			fmt.Println("Some error occured")
		}
	}
}
