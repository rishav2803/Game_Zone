let socket= new WebSocket("ws://localhost:8080/joingame");
let connect = () => {
  console.log("Attempting Connection...");

  socket.onopen = () => {
    console.log("Successfully Joined to a Game");
  };

  socket.onmessage = msg => {
    console.log(msg);
  };

  socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
  };

  socket.onerror = error => {
    console.log("Socket Error: ", error);
  };
};

let sendMsg = msg => {
  console.log("sending msg: ", msg);
  socket.send(msg);
};

export { connect, sendMsg };
