import { Flex, Text, Container } from "@chakra-ui/react";
import PlayerContext from "../../context/player-context";
import colorScheme from "../../utils/colors";
import { useContext } from "react";
import { Player } from "../Screens/Game";

interface TicScoreCardProps {
  players: Player[];
  playerTurn:string;
}

export default function TicScoreCard({ players, playerTurn }: TicScoreCardProps) {
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
            <Text fontWeight={"bold"} fontSize={"1.5rem"}>{0}</Text>
          </Flex>
        ))}
      </Flex>
    </>
  );
}
