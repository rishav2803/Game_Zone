import { Box, Text,Heading,Stack, Tabs, TabList, Tab, TabPanel, TabPanels, Container, Card, Grid, GridItem, Flex } from "@chakra-ui/react";
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import colorScheme from "../../utils/colors";
import {games} from "../../utils/gamesList";
import PlayerContext from "../../context/player-context";

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
            <Tab>All</Tab>
            <Tab>Computer</Tab>
            <Tab>Multiplayer</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Grid templateColumns="repeat(4, 1fr)" placeItems={"center"} rowGap={"2rem"}>
                <Stack spacing={4}  direction={{ base: "column", md: "row" }} width="full">
                  {games.map((game,index) => (
                    <GridItem borderRadius={"lg"} boxShadow={"xl"} key={index}  >
                      <Card  w={"280px"} bgColor={colorScheme.brightBlack} h={"40vh"} position="relative">
                        <Box w="100%" h="90%" marginX="auto" >
                          <img src={game.imgLink} alt="Tic Tac Toe" style={{ height: "100%", objectFit: "cover", borderRadius: "lg" }} />
                        </Box>
                        <Box position="absolute" bottom="0" w="100%" p="4" bg="rgba(0,0,0,0.5)">
                          <Text onClick={createGameHandler} color={colorScheme.foreground} textAlign="center" fontSize="lg" fontWeight="bold">
                            {game.name}
                            {/* <Link to={game.link}>{game.name}</Link> */}
                          </Text>
                        </Box>
                      </Card>
                    </GridItem>
                  ))}
                </Stack>
              </Grid>
            </TabPanel>
            <TabPanel>
              {/* Content for Multiplayer Tab */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}

