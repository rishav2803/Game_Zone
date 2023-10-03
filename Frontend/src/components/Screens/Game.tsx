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

type GameStateType = {
  board:string[];
  player_turn:string;
  winner:string
};

const GameRoom = () => {
  const {gameId}=useParams();
  const [ready, val, send] = useWs({ url: `ws://localhost:8080/game/${gameId}` });

  const [usersPayload,setUsersPayload] = useState<PlayersPayload>();

  const [isReset,setIsReset]=useState(false);

  const [gameState,setGameState]=useState<GameStateType>();

  console.log(val);
  


  useEffect(() => {
    //this means this is my users payload
    if (val.type === "user") {
      setUsersPayload(val);
    } 
    if (val.type==="reset") {
      setIsReset(true);
    }
    if(val.type="game_state"){
      setGameState(val);
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
          board={gameState?.board===undefined?Array(9).fill(null):gameState.board}
          winner={gameState?.winner===undefined?"":gameState.winner}
          send={send}
          err={val.err}
          playerTurn={val.player_turn}
        />
      </div>
    </>
  );
};

export default GameRoom;
