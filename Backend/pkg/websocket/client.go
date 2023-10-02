package websocket

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"log"
)

// User struct keep track of user
type User struct {
	ID         *websocket.Conn `json:"-"`
	Name       string          `json:"name"`
	Symbol     string          `json:"symbol"`
	PlayerTurn string          `json:"player_turn"`
}

type Client struct {
	Conn *websocket.Conn
	Room *Room
}

type Body struct {
	Pos        int    `json:"pos,omitempty"`
	PlayerTurn string `json:"player_turn"`
	Symbol     string `json:"symbol,omitempty"`
}

// The structre of the message
type Message struct {
	Type  string `json:"type,omitempty"`
	Body  Body   `json:"body,omitempty"`
	Users []User `json:"users,omitempty"`
	Ready bool   `json:"ready"`
}

//This function is going to listen to incoming messages and pass to room which will broadcast to
//other client in that room

// this is in a sense like we are associating this method to the client struct
func (c *Client) ListenMessages() {
	//This function is going to wait until the below is returned and then will close the connection
	var message Message
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
			body := Body{PlayerTurn: "X"}
			if len(c.Room.Clients) == 1 {
				message = Message{Type: message.Type, Body: body, Users: c.Room.Users, Ready: false}
				// c.Room.HandleGame<-message
			} else {
				message = Message{Type: message.Type, Body: body, Users: c.Room.Users, Ready: true}
			}

		case "game":
			message = Message{Type: message.Type, Body: message.Body, Ready: true}
		case "reset":
			fmt.Println("This case will deal with reset message type")
			message = Message{Type: message.Type, Ready: true}
		}
		//Send message to broadcast channel which will broadcast to other client
		c.Room.Broadcast <- message
		fmt.Printf("Message Received: %+v\n", message)
	}
}
