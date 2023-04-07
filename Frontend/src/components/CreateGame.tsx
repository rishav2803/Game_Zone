import { useEffect, useState } from "react";
import { useWs } from "../../hooks/useWs";
import Board from "./GameBoard/Board";
import Modal from "./ui/Modal";

type User = {
  type: string;
  users: [{}];
  ready: boolean;
};

type Game = {
  type: string;
  body: { pos: number; symbol: string };
  ready: boolean;
};

const CreateGame = () => {
  const [ready, val, send] = useWs({ url: "ws://localhost:8080/newgame" });
  const [userInfo, setUserInfo] = useState<User>();
  const [isReset,setIsReset]=useState(false);
  const [incomingMessages, setIncomingMessages] = useState<Game>();

  useEffect(() => {
    if (val.type === "user") {
      setUserInfo(val);
    } else if (val.type==="reset") {
      setIsReset(true);
    }else{
      setIncomingMessages(val);
    } 
  }, [val]);

  return (
    <div>
      {!userInfo?.ready && <Modal></Modal>}
      {ready && (
        <Board
          send={send}
          users={userInfo?.users}
          game={incomingMessages.body}
          reset={isReset}
        ></Board>
      )}
    </div>
  );
};

export default CreateGame;
