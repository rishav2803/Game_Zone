import { useEffect,useState } from "react";
import {useWs} from "../../hooks/useWs"
import Board from "./GameBoard/Board";
import Modal from "./ui/Modal";


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

const CreateGame = () => {
const [ready, val, send] = useWs({url:"ws://localhost:8080/newgame"});
const [userInfo,setUserInfo]=useState<User>();
const [incomingMessages,setIncomingMessages]=useState<Game>();

  useEffect(() => {
    if (val.type==="user") {
      console.log("hello World");
      setUserInfo(val);
    }else{
      setIncomingMessages(val);
    }
  },[val]);

  return (
      <div>
        {!userInfo?.ready && <Modal></Modal>}
        {ready && <Board send={send} users={userInfo?.users} game={incomingMessages.body}></Board>}
      </div>
    );
};

export default CreateGame;
