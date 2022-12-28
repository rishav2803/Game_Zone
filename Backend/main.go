package main

import (
	"fmt"
	"github.com/rishav2803/go-react-game/pkg/websocket"
	"log"
	"net/http"
)

type Test struct {
	val string
}

func setupRooms() *websocket.Room {
	room := websocket.NewRoom()
	websocket.AddRoom(room)
	go room.Start()
	return room
}

func newGame(w http.ResponseWriter, r *http.Request) {
	fmt.Println("NewGame Endpoint Hit")
	room := setupRooms()

	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Println("Errrroror")
	}

	client := &websocket.Client{
		Conn: conn,
		Room: room,
	}
	fmt.Println(client)

	room.Register <- client
	client.ListenMessages()
}

func joinGame(w http.ResponseWriter, r *http.Request) {
	fmt.Println("JoinGame Endpoint Hit")

	//Check for empty rooms if found then return that room
	room := websocket.CheckRooms()

	if room == nil {
		fmt.Print("No new Room Found")
		return
	}

	conn, err := websocket.Upgrade(w, r)

	if err != nil {
		log.Println(err)
		return
	}

	client := &websocket.Client{
		Conn: conn,
		Room: room,
	}

	room.Register <- client
	client.ListenMessages()

}

func setupRoutes() {
	//Newgame socket endpoint
	http.HandleFunc("/newgame", func(w http.ResponseWriter, r *http.Request) {
		newGame(w, r)
	})

	//JoinGame socket endpoint
	http.HandleFunc("/joingame", func(w http.ResponseWriter, r *http.Request) {
		joinGame(w, r)
	})

}

func main() {
	fmt.Println("Multiplayer game")
	setupRoutes()
	http.ListenAndServe("localhost:8080", nil)
}
