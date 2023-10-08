import { Box, Text,Heading,Stack, Tabs, TabList, Tab, TabPanel, TabPanels, Container, Card, Grid, GridItem, Flex } from "@chakra-ui/react";
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import colorScheme from "../../utils/colors";
import {games} from "../../utils/gamesList";
import PlayerContext from "../../context/player-context";
import GameCard from "../GameCard";

export default function Home() {
  const navigate=useNavigate();
  const ctx=useContext(PlayerContext);

  async function createGameHandler(){
    const res=await fetch("http://localhost:8080/newgame");
    const {RoomId,Symbol}=await res.json();
    ctx?.setSymbol(Symbol);
    navigate(`game/${RoomId}`);
  }

  return (
    <Box h="100vh" overflowY="scroll" 
      bgColor={colorScheme.brightBlack}
    >
      <Container w="full" textAlign={"center"} display="flex" flexDirection={"column"} justifyContent="center" h="30vh">
        <Flex fontSize="3rem" fontWeight="bold" mb={4} alignItems="center" justifyContent="center">
          <Text color={colorScheme.foreground}>Game-</Text>
          <Text bgColor={colorScheme.purple}>Zone</Text>
        </Flex>
        <Text color={colorScheme.foreground} fontSize="lg" fontWeight={"medium"} mt={2}>Connecting Gamers, One Move at a Time.</Text>
      </Container>
      <Container maxW="1240px" w="full" color={colorScheme.foreground}>
        <Tabs mt={4} colorScheme={"purple"}>
          <TabList>
            <Tab>Computer</Tab>
            <Tab>Multiplayer</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} marginInline="auto" gap={"2rem"}>
                {games.filter(game => game.computer === true).map((game,index) => (
                  <GameCard name={game.name} imgLink={game.imgLink} onClick={()=>navigate(game.link)}/>
                  ))}
              </Grid>
            </TabPanel>
            <TabPanel>
              <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} marginInline="auto" gap={"2rem"}>
                {games.filter(game => game.online === true).map((game,index) => (
                  <GameCard name={game.name} imgLink={game.imgLink} onClick={createGameHandler}/>
                ))}
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}

