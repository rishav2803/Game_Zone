package websocket

import "fmt"

// Rooms map to keep track of all the rooms that are spawned up
var Rooms = make(map[int]*Room)
var tournamentRooms = make(map[int]*Room)

var room_no = 0

// Function to add new room to the rooms map
func AddRoom(room *Room) {
	room_no = room_no + 1
	Rooms[room_no] = room
	fmt.Println("The total rooms are", Rooms)
}

func NoOfRooms() int {
	return len(Rooms)
}

func IncrementRoomCapacity(room *Room) {
	room.count += 1
}

func CleanupEmptyRooms() {
	if len(Rooms) > 0 {
		for id, room := range Rooms {
			//Close the all the channels and delete the room from the map
			if room.count == 0 {
				fmt.Println("Hello World here")
				delete(Rooms, id)
				// close(room.Register)
				// close(room.Unregister)
				// close(room.Broadcast)
				// close(room.HandleGame)
			}
		}
	}
}

// Get the room based on the roomid provided
func GetRoom(roomId string) *Room {
	for _, r := range Rooms {
		if r.RoomId == roomId {
			return r
		}
	}
	return nil
}

// Check the no of clients in a particular room
func CheckRooms() *Room {
	for _, r := range Rooms {
		if r.count == 1 {
			return r
		}
	}
	return nil
}
