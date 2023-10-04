import { Flex, Text, Container, useEditable } from "@chakra-ui/react";
import PlayerContext from "../../context/player-context";
import colorScheme from "../../utils/colors";
import {useState,useContext,useEffect} from "react";
import { Player } from "../Screens/Game";

interface TicScoreCardProps {
  players: Player[];
  playerTurn:string;
  winner:string;
}

export default function TicScoreCard({ players, playerTurn,winner }: TicScoreCardProps) {
  const [playerScore,setPlayerScore]=useState(0);
  const [otherPlayerScore,setOtherPlayerScore]=useState(0);
  console.log(winner);
  
  const ctx=useContext(PlayerContext);

  useEffect(()=>{
    if (players.length===1) {
      setPlayerScore(0);
      setOtherPlayerScore(0);
    }
  },[players]);


  useEffect(()=>{
    if (winner) {
      if (winner==="tie") {
        setPlayerScore(sc=>sc+1);
        setOtherPlayerScore(sc=>sc+1);
      }
      if (ctx?.userSymbol===winner) {
        console.log(winner);
        setPlayerScore(sc=>sc+1);
      }else{
        setOtherPlayerScore(sc=>sc+1);
      }

    }

  },[winner]);


  const colorMapping = {
    "X": colorScheme.purple,
    "O": colorScheme.green
  };


  
  return (
    <>
      <Flex
        w="full" 
        justifyContent="space-between" 
        bgColor={colorScheme.background} 
        boxShadow="lg"
        borderRadius="lg"
        mb="1.2rem"
        mt="3rem"
      >
        {players.map((player) => (
          <Flex
            key={player.symbol}
            color={colorScheme.foreground}
            w="50%" flexDirection={"column"}
            borderBottom="4px"
            p="1rem"
            justifyContent="center" alignItems={"center"}
            borderBottomColor={player.symbol==playerTurn?colorMapping[player.symbol]:"transparent"}
          >
            <Text fontSize="1.1rem">{player.symbol}{`(${player.name})`}</Text>
            <Text fontWeight={"bold"} fontSize={"1.5rem"}>{player.symbol===ctx?.userSymbol?playerScore:otherPlayerScore}</Text>
          </Flex>
        ))}
      </Flex>
    </>
  );
}
