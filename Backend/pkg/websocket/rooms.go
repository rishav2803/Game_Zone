package websocket

// Rooms map to keep track of all the rooms that are spawned up
var Rooms = make(map[int]*Room)
var tournamentRooms = make(map[int]*Room)

var room_no = 0

// Function to add new room
func AddRoom(room *Room) {
	room_no = room_no + 1
	Rooms[room_no] = room
}

// Check the no of clients in a particular room
func CheckRooms() *Room {
	for _, r := range Rooms {
		if len(r.Clients) < 2 {
			return r
		}
	}
	return nil
}

func TournamentRoom(room *Room) {
	room_no = room_no + 1
	tournamentRooms[room_no] = room
}
