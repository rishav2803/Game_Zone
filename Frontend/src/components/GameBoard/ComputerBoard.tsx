import { useContext, useEffect, useState } from "react";
import {Box, Button, Container, Flex, Grid, GridItem, Text} from "@chakra-ui/react";
import Cell from "./Cell";
import {checkWinner, getRandomSymbol} from "../../utils/checkWinner";
import colorScheme from "../../utils/colors";
import Timer from "../Timer";
import TicResultModal from "../ui/TicResultModal";
import PlayerContext from "../../context/player-context";


const ComputerBoard = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(true);
  const [userSymbol] = useState(getRandomSymbol());
  const [computerSymbol] = useState(userSymbol === "X" ? "O" : "X");
  const [winner, setWinner] = useState("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "draw">("playing");
  const [userScore,setUserScore]=useState(0);
  const [computerScore,setComputerScore]=useState(0);
  const ctx=useContext(PlayerContext);

  const colorMapping={
    "X":colorScheme.purple,
    "O":colorScheme.green
  }


  function incrementScore(winnerName:string):void{
    if(winnerName==userSymbol){
      setUserScore(score=>score+1);
    }else{
      setComputerScore(score=>score+1);
    }
  }

  const reset = () => {
    setSquares(Array(9).fill(null));
    setWinner("");
    setGameStatus("playing")
    setPlayerTurn(true);
  };

  const findIndex = () => {
    if (gameStatus === "playing") {
      const emptyCells: number[] = [];
      squares.forEach((square, index) => {
        if (square == null) {
          emptyCells.push(index);
        }
      });
      const index = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newData = squares.map((val, i) => {
        if (i == index) {
          return computerSymbol;
        }
        return val;
      });
      setPlayerTurn(true);
      setSquares(newData);
    }
  };

  useEffect(() => {
    const makeComputerMove = () => {
      if (playerTurn === false && gameStatus === "playing") {
        console.log("Making computer move...");
        setTimeout(() => {
          findIndex();
        }, 2000);
      } else {
        console.log(`Not making computer move. playerTurn: ${playerTurn}, gameStatus: ${gameStatus}`);
      }
    };
    makeComputerMove();
  }, [playerTurn, gameStatus]);

  const setSquaresValue = (value: number) => {
    if (squares[value] !== null || gameStatus !== "playing") {
      return;
    }

    const newData = squares.map((val, i) => {
      if (i === value) {
        return userSymbol;
      }
      return val;
    });
    setPlayerTurn(false);
    setSquares(newData);
  };
  

  useEffect(() => {
    if (gameStatus === "playing") {
      const winner = checkWinner(squares);
      if (winner) {
        setGameStatus("won");
        incrementScore(winner);
        setWinner(winner);
      } else if (squares.every((square) => square !== null)) {
        setGameStatus("draw");
      }
    }
  }, [squares, gameStatus]);

  return(
    <>
      {gameStatus === "won" && <TicResultModal onReset={reset} winner={winner} />}
      {gameStatus === "draw" && <TicResultModal onReset={reset} winner="tie" />}
      <Container display="flex" flexDirection={"column"} maxW="500px" w="100%" overflow="hidden" alignItems="center" h="100vh">
        <Flex  
          w="full" 
          justifyContent="space-between" 
          bgColor={colorScheme.background} 
          boxShadow="lg"
          borderRadius="lg"
          mb="1.2rem"
          mt="3rem"
        >
          <Flex  
            color={colorScheme.foreground}
            w="50%" flexDirection={"column"} 
            borderBottom="4px" 
            borderBottomColor={playerTurn===true?colorMapping[userSymbol]:"transparent"} 
            justifyContent="center" alignItems={"center"}>
            <Text fontSize="1.1rem">{userSymbol}({ctx.currentUser})</Text>
            <Text fontWeight={"bold"} fontSize={"1.5rem"}>{userScore}</Text>
          </Flex>
          <Flex 
            color={colorScheme.foreground} 
            borderBottom="4px" 
            borderBottomColor={playerTurn===false?colorMapping[computerSymbol]:"transparent"} 
            w="50%" 
            p="1rem" 
            flexDirection={"column"} 
            justifyContent="center" 
            alignItems={"center"}
          >
            <Text fontSize="1.1rem">{computerSymbol}(CPU)</Text>
            <Text fontWeight={"bold"} fontSize={"1.5rem"}>{computerScore}</Text>
          </Flex>
        </Flex>
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
                value={squares[index]}
                onClick={() => setSquaresValue(index)}
                disabled={playerTurn == true ? false : true}
              />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </>
  );

};
export default ComputerBoard;
