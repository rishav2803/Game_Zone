import { Box , Container, Flex, Text } from "@chakra-ui/react";
import { useContext, useEffect,useState } from "react";
import colorScheme from "../utils/colors";
import RPSButton from "./RPSButton";
import {rps} from "../utils/rps";
import {checkWinnerRps} from "../utils/checkWinner";
import ResultModal from "./ui/Modal";
import PlayerContext from "../context/player-context";


export interface rpsState{
  bgColor:string
  src:string,
  gridArea:string
}


export default function RPS(){
  const [selected,setSelected]=useState(false);
  const [userChoice,setUserChoice]=useState({}as rpsState);
  const [computerChoice,setComputerChoice]=useState({}as rpsState);
  const [winner, setWinner] = useState("");
  const [playerWins, setPlayerWins] = useState(0);
  const [cpuWins, setCpuWins] = useState(0);

  const ctx=useContext(PlayerContext);
  function reset(){
    setSelected(false);
    setUserChoice({} as rpsState);
    setComputerChoice({} as rpsState);
    setWinner("");
  }

  const handleUserChoice = (bgColor, src, gridArea) => {
    setUserChoice({ bgColor, src, gridArea });
    setSelected(true);

    setTimeout(()=>{
      const randomIndex = Math.floor(Math.random() * rps.length);
      setComputerChoice(rps[randomIndex]);
    },1500)

  };

 useEffect(() => {
    if (selected) {
      const result = checkWinnerRps(userChoice,ctx.currentUser,computerChoice);
      setWinner(result);

      if (result === ctx?.currentUser) {
        setPlayerWins(playerWins + 1);
      } else if (result === "CPU") {
        setCpuWins(cpuWins + 1);
      }else if(result==="tie"){
        setPlayerWins(playerWins + 1);
        setCpuWins(cpuWins + 1);
      }
    }
  }, [selected, userChoice, computerChoice]);


  if (!selected) {
    return(
      <Container display="flex"  flexDirection={"column"} maxW="500px" w="100%" overflow="hidden" alignItems="space-between" h="100vh">
        <Flex  w="full" justifyContent="space-between" bgColor={colorScheme.background} 
          boxShadow="lg"
          borderRadius="lg"
          mb="1.2rem"
          mt="3rem"
        >
          <Flex fontFamily="Fredoka" color={colorScheme.foreground}
            w="50%" flexDirection={"column"} justifyContent="center" alignItems={"center"}>
            <Text fontSize="1.1rem">{ctx?.currentUser}</Text>
            <Text fontWeight={"bold"} fontSize={"1.5rem"}>{playerWins}</Text>
          </Flex>
          <Flex color={colorScheme.foreground} borderBottom="4px" borderBottomColor={colorScheme.green} w="50%" p="1rem" flexDirection={"column"} justifyContent="center" alignItems={"center"}>
            <Text fontSize="1.1rem">CPU</Text>
            <Text fontWeight={"bold"} fontSize={"1.5rem"}>{cpuWins}</Text>
          </Flex>
        </Flex>
        <Box 
          position="relative"
          display="grid"
          gridTemplateColumns="repeat(2,1fr)"
          gridTemplateAreas="'paper scissors' 'rock rock'"
          placeItems="center"
          height="30rem"
        >
          {rps.map((s)=>{
            return(
              <RPSButton
                setSelected={handleUserChoice}
                bgColor={s.bgColor}
                gridArea={s.gridArea}
                imgSrc={s.src}
              />
            );
          })}
        </Box>
      </Container>
    );
  }else{
    return(
      <>
        {winner !== "" && <ResultModal onReset={reset} winner={winner} />}
        <Container display="flex"  flexDirection={"column"} maxW="500px" w="100%" overflow="hidden" alignItems="space-between" h="100vh">
          <Flex  w="full" justifyContent="space-between" bgColor={colorScheme.background} 
            boxShadow="lg"
            borderRadius="lg"
            mb="1.2rem"
            mt="3rem"
          >
            <Flex fontFamily="Fredoka" color={colorScheme.foreground}
              w="50%" flexDirection={"column"} justifyContent="center" alignItems={"center"}>
              <Text fontSize="1.1rem">{ctx?.currentUser}</Text>
              <Text fontWeight={"bold"} fontSize={"1.5rem"}>{playerWins}</Text>
            </Flex>
            <Flex color={colorScheme.foreground} borderBottom="4px" borderBottomColor={colorScheme.green} w="50%" p="1rem" flexDirection={"column"} justifyContent="center" alignItems={"center"}>
              <Text fontSize="1.1rem">CPU</Text>
              <Text fontWeight={"bold"} fontSize={"1.5rem"}>{cpuWins}</Text>
            </Flex>
          </Flex>
          <Box 
            position="relative"
            display="grid"
            gridTemplateColumns="repeat(2,1fr)"
            gridTemplateAreas="'userChoiceText computerChoiceText' 'userChoice computerChoice'"
            placeItems="center"
            height="20rem"
          >
            <Text fontWeight="bold" gridArea="userChoiceText" color={colorScheme.foreground} fontSize="1.3rem">User Choice</Text>
            <RPSButton
              setSelected={()=>{}}
              bgColor={userChoice.bgColor}
              imgSrc={userChoice.src}
              gridArea={"userChoice"}

            />
            <Text fontWeight="bold" gridArea="computerChoiceText" color={colorScheme.foreground} fontSize="1.3rem">CPU Choice</Text>
            <RPSButton
              setSelected={()=>{}}
              bgColor={computerChoice.bgColor}
              imgSrc={computerChoice.src}
              gridArea={"computerChoice"}
            />
          </Box>
        </Container>
      </>
    );
}
}
