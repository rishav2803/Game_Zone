import { useEffect,useState } from "react";
import {useWs} from "../../hooks/useWs"
import Modal from "./ui/Modal";
import Board from "./GameBoard/Board";

type User={
  type:string,
  users:[{}],
  ready:boolean
}

type Game={
  type:string,
  body:{pos:number,symbol:string},
  ready:boolean
}

const JoinGame = () => {
  const [ready, val, send] = useWs({url:"ws://localhost:8080/joingame"});
const [userInfo,setUserInfo]=useState<User>();
const [incomingMessages,setIncomingMessages]=useState<Game>();

  useEffect(() => {
    if (val.type==="user") {
      setUserInfo(val);
    }else{
      setIncomingMessages(val);
    }
  },[val]);

  return (
      <div>
        {!ready && <Modal></Modal>}
        {ready && <Board send={send} users={userInfo?.users} game={incomingMessages.body}></Board>}
      </div>
    );
};

export default JoinGame;
