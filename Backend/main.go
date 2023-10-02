package main

import (
	"encoding/json"
	"fmt"
	"github.com/rishav2803/go-react-game/pkg/websocket"
	"math/rand"
	"strings"
	"time"
	// "log"
	"net/http"
)

type ResponseData struct {
	RoomId string
	Symbol string
}

func setupRooms() *websocket.Room {
	room := websocket.NewRoom()
	websocket.AddRoom(room)
	go room.Start()
	return room
}

func getSymbol(r *websocket.Room) string {
	if len(r.Symbols) == 1 {
		return r.Symbols[0]
	}

	rand.Seed(time.Now().UnixNano())
	randomIndex := rand.Intn(len(r.Symbols))
	selectedSymbol := r.Symbols[randomIndex]
	r.Symbols = append(r.Symbols[:randomIndex], r.Symbols[randomIndex+1:]...)

	return selectedSymbol
}

func EnableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func extractGameID(path string) string {
	parts := strings.Split(path, "/")
	if len(parts) >= 3 {
		return parts[2]
	}
	return ""
}

func newGame(w http.ResponseWriter, r *http.Request) {
	//Here make a new fucn which will check whether a room is already present or not
	//if not then create else use the prev one
	var room *websocket.Room
	room = websocket.CheckRooms()
	//If no room then setup room
	if room == nil {
		room = setupRooms()
	}
	websocket.IncrementRoomCapacity(room)
	//Return the room id and the symbol
	responseData := &ResponseData{
		RoomId: room.RoomId,
		Symbol: getSymbol(room),
	}
	EnableCORS(w)
	data, err := json.Marshal(responseData)
	if err != nil {
		http.Error(w, "Failed to marshal JSON response", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}

// JoinGame Endpoint Handler

func joinGame(w http.ResponseWriter, r *http.Request) {
	//Check for empty rooms if found then return that room
	room := websocket.CheckRooms()
	if room == nil {
		fmt.Print("No new Room Found")
		return
	}
	responseData := &ResponseData{
		RoomId: room.RoomId,
	}
	EnableCORS(w)
	data, err := json.Marshal(responseData)
	if err != nil {
		http.Error(w, "Failed to marshal JSON response", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}

// Now here we will do the upgrade shit
func playGame(w http.ResponseWriter, r *http.Request) {
	// Extract the game ID from the URL path
	gameId := extractGameID(r.URL.Path)
	fmt.Printf("gameId: %v\n", gameId)

	// Upgrade the HTTP connection to a WebSocket connection
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		http.Error(w, "Failed to upgrade connection to WebSocket", http.StatusInternalServerError)
		return
	}

	//Implement a get room function which will take a room id and return that specific room
	clientRoom := websocket.GetRoom(gameId)

	client := &websocket.Client{
		Conn: conn,
		Room: clientRoom,
	}

	clientRoom.Register <- client
	client.ListenMessages()
}

func setupRoutes() {
	//Newgame socket endpoint
	//Handle func by default can match any type of request be it get,post,put,delete etc
	http.HandleFunc("/newgame", func(w http.ResponseWriter, r *http.Request) {
		newGame(w, r)
	})

	//JoinGame socket endpoint
	http.HandleFunc("/joingame", func(w http.ResponseWriter, r *http.Request) {
		joinGame(w, r)
	})

	http.HandleFunc("/game/", func(w http.ResponseWriter, r *http.Request) {
		playGame(w, r)
	})

}

func main() {
	fmt.Println("Multiplayer game")
	setupRoutes()
	http.ListenAndServe("localhost:8080", nil)
}
