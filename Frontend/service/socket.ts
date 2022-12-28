// export const newgame_socket=new WebSocket("ws://localhost:8080/newgame");
// export const joingame_socket=new WebSocket("ws://localhost:8080/joingame");

import io from "socket.io-client";

export const socket = io.connect('http://localhost:4000')
