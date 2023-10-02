import {Spinner, Text} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {useWs} from "../../../hooks/useWs";
import Board from "../GameBoard/Board";
import {RenderIf} from "../RenderIf";
import JoiningModal from "../ui/JoiningModal";
import Modal from "../ui/Modal";

export type Player={
  name:string;
  symbol:string
}
export type PlayersPayload = {
  type: string;
  users: Player[];
  ready: boolean;
};

type Game = {
  type: string;
  body: { pos: number; symbol: string,playerTurn:string };
  ready: boolean;
};

const GameRoom = () => {
  const {gameId}=useParams();
  const [ready, val, send] = useWs({ url: `ws://localhost:8080/game/${gameId}` });

  const [usersPayload,setUsersPayload] = useState<PlayersPayload>();

  const [isReset,setIsReset]=useState(false);
  const [incomingMessages, setIncomingMessages] = useState<Game>();


  useEffect(() => {
    //this means this is my users payload
    if (val.type === "user") {
      setUsersPayload(val);
    } else if (val.type==="reset") {
      setIsReset(true);
    }else{
      setIncomingMessages(val);
    } 
  }, [val]);

  return (
    <>
      <div>
        <RenderIf
          renderIf={usersPayload?.ready===false}
          children={<JoiningModal/>}
        />
        <Board
          users={usersPayload?.users===undefined?[]:usersPayload.users}
          send={send}
          playerTurn={val.body?.player_turn}
        />
      </div>
    </>
  );
};

export default GameRoom;
