package websocket

import "fmt"

var Rooms = make(map[int]*Room)

var room_no = 0

func AddRoom(room *Room) {
	room_no = room_no + 1
	Rooms[room_no] = room
	fmt.Println(Rooms)
	fmt.Println(len(Rooms))
}

func CheckRooms() *Room {
	for _, r := range Rooms {
		if len(r.Clients) < 2 {
			return r
		}
	}
	return nil
}
