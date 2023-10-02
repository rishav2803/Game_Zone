import { useContext, useEffect, useState } from "react";
import Cell from "./Cell";
import PlayerContext from "../../context/player-context";
import Modal from "../ui/Modal";
import {checkWinner} from "../../utils/checkWinner";
import {Text,Container, Grid, GridItem} from "@chakra-ui/react";
import colorScheme from "../../utils/colors";
import TicScoreCard from "../ScoreCard/TicScoreCard";
import {Player} from "../Screens/Game";

type BoardProps = {
  send: (a: string) => {};
  users: Player[],
  playerTurn:string
  // game: { pos: number; symbol: string };
  // reset: {};
};

type PlayerMove = "X" | "O";

type Winner = {
  bool?: boolean;
  winner: string;
};

const Board = ({ send, users,playerTurn }: BoardProps) => {
  const ctx=useContext(PlayerContext);


  function clickHandler(pos:number){
    send(
      JSON.stringify({
        type: "game",
        body: { pos: pos == 0 ? 0 : pos, symbol: ctx?.userSymbol },
        ready: true,
      })
    );
  }

  console.log(ctx?.userSymbol===playerTurn);
  
  return (
    <Container display="flex" flexDirection={"column"} maxW="500px" w="100%" overflow="hidden" alignItems="center" h="100vh">
      <TicScoreCard
        players={users==undefined?[]:users}
        playerTurn={playerTurn}
      />
      <Grid mt="5rem" templateColumns="repeat(3, 1fr)">
        {Array(9).fill(null).map((_, index) => (
          <GridItem key={index}
            borderTop={index < 3 ? "none" : `2px solid ${colorScheme.foreground}`}
            borderBottom={index > 5 ? "none" : `2px solid ${colorScheme.foreground}`}
            borderLeft={index % 3 === 0 ? "none" : `2px solid ${colorScheme.foreground}`}
            borderRight={(index + 1) % 3 === 0 ? "none" : `2px solid ${colorScheme.foreground}`}
          >
            <Cell
              key={index}
              value={""}
              onClick={()=>{clickHandler(index)}}
              disabled={playerTurn===ctx?.userSymbol===true?false:true}
            />
          </GridItem>
        ))}
      </Grid>
   </Container>
  );
};
export default Board;
