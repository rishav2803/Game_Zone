package main

import (
	"fmt"
	"github.com/rishav2803/go-react-game/pkg/websocket"
	"log"
	"net/http"
)

func setupRooms() *websocket.Room {
	room := websocket.NewRoom()
	websocket.AddRoom(room)
	go room.Start()
	return room
}

// NewGame Endpoint Handler
func newGame(w http.ResponseWriter, r *http.Request) {
	room := setupRooms()

	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		log.Println(err)
	}

	client := &websocket.Client{
		Conn: conn,
		Room: room,
	}

	room.Register <- client
	client.ListenMessages()
}

// JoinGame Endpoint Handler

func joinGame(w http.ResponseWriter, r *http.Request) {
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

func groupA(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello World"))
}

func groupB(w http.ResponseWriter, r *http.Request) {

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

	//groupA socket endpoint
	http.HandleFunc("/tournament/groupA", func(w http.ResponseWriter, r *http.Request) {
		groupA(w, r)
	})

	//groupB socket endpoint
	http.HandleFunc("/tournament/groupB", func(w http.ResponseWriter, r *http.Request) {
		groupB(w, r)
	})

}

func main() {
	fmt.Println("Multiplayer game")
	setupRoutes()
	http.ListenAndServe("localhost:8080", nil)
}
