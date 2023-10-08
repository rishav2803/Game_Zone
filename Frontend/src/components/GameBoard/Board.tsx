import { useContext, useEffect, useState } from "react";
import Cell from "./Cell";
import PlayerContext from "../../context/player-context";
import {Text,Container, Grid, GridItem} from "@chakra-ui/react";
import colorScheme from "../../utils/colors";
import TicScoreCard from "../ScoreCard/TicScoreCard";
import {Player} from "../Screens/Game";
import ResultModal from "../ui/Modal";
import TicResultModal from "../ui/TicResultModal";

type BoardProps = {
  send: (a: string) => {};
  users: Player[],
  board:string[],
  playerTurn:string
  err:string
  winner:string

};

type PlayerMove = "X" | "O";

type Winner = {
  bool?: boolean;
  winner: string;
};

const Board = ({ send, users,board,playerTurn,err,winner }: BoardProps) => {
  const ctx=useContext(PlayerContext);
  function clickHandler(pos:number){
    send(
      JSON.stringify({
        type: "game",
        body: { 
          pos: pos == 0 ? 0 : pos,
          symbol: ctx?.userSymbol 
        },
      })
    );
  }

  function resetHandler(){
    send(
      JSON.stringify({
        type: "reset",
      })
    );
  }


  return (
    <>
      { winner!="" && <TicResultModal onReset={resetHandler} winner={winner} />}
      <Container display="flex" flexDirection={"column"} maxW="500px" w="100%" overflow="hidden" alignItems="center" h="100vh">
        <TicScoreCard
          players={users==undefined?[]:users}
          winner={winner}
          playerTurn={playerTurn}
        />
        <Grid mt="5rem" templateColumns="repeat(3, 1fr)">
          {board.map((val, index) => (
            <GridItem key={index}
              borderTop={index < 3 ? "none" : `2px solid ${colorScheme.foreground}`}
              borderBottom={index > 5 ? "none" : `2px solid ${colorScheme.foreground}`}
              borderLeft={index % 3 === 0 ? "none" : `2px solid ${colorScheme.foreground}`}
              borderRight={(index + 1) % 3 === 0 ? "none" : `2px solid ${colorScheme.foreground}`}
            >
              <Cell
                key={index}
                value={val}
                onClick={()=>{clickHandler(index)}}
                disabled={playerTurn===ctx?.userSymbol===true?false:true}
              />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </>
  );
};
export default Board;
