import { useState,useEffect,useRef, useContext} from "react";
import PlayerContext from "../src/context/player-context";

type Url={
  url:string
}

export const useWs = (props:Url) => {
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState({});

  const ws = useRef(null);
  const ctx=useContext(PlayerContext);


  useEffect(() => {
  const socket = new WebSocket(props.url);
    socket.onopen = () => {
      const { userName,userSymbol }=ctx;
      socket.send(
        JSON.stringify({
          type:'user',
          users:[{ name:userName,symbol:userSymbol }]
        })
      )
      setIsReady(true);
    };
    socket.onclose = () => setIsReady(false);

    socket.onmessage = (event) => {
        const data=JSON.parse(event.data)
        setVal(data);
    }

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  // bind is needed to make sure `send` references correct `this`
  return [isReady, val, ws.current?.send.bind(ws.current)];
};
