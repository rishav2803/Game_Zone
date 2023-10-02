import {Box, Button, Container, Flex, Grid, GridItem, Text} from "@chakra-ui/react";
import colorScheme from "../utils/colors";
import Cell from "./GameBoard/Cell";

export default function TicComputer(){
  return(
    <Container display="flex" justifyContent="space-evenly" flexDirection={"column"} maxW="500px" w="100%" overflow="hidden" alignItems="center" h="100vh">
      <Flex  w="full" justifyContent="space-between" bgColor={colorScheme.background} 
        boxShadow="lg"
        borderRadius="lg"
      >
        <Flex color={colorScheme.foreground}
          w="50%" flexDirection={"column"} justifyContent="center" alignItems={"center"}>
          <Text fontSize="1.1rem">X(You)</Text>
          <Text fontWeight={"bold"} fontSize={"1.5rem"}>3</Text>
        </Flex>
        <Flex color={colorScheme.foreground} borderBottom="4px" borderBottomColor={colorScheme.green} w="50%" p="1rem" flexDirection={"column"} justifyContent="center" alignItems={"center"}>
          <Text fontSize="1.1rem">O(CPU)</Text>
          <Text fontWeight={"bold"} fontSize={"1.5rem"}>4</Text>
        </Flex>
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)">
        {Array(9).fill(0).map((_, index) => (
          <GridItem key={index}
            borderTop={index < 3 ? "none" : `2px solid ${colorScheme.foreground}`}
            borderBottom={index > 5 ? "none" : `2px solid ${colorScheme.foreground}`}
            borderLeft={index % 3 === 0 ? "none" : `2px solid ${colorScheme.foreground}`}
            borderRight={(index + 1) % 3 === 0 ? "none" : `2px solid ${colorScheme.foreground}`}
          >
            <Cell
              key={index}
              value={"X"}
              onClick={() => {}}
              disabled={true}
            />
          </GridItem>
        ))}
{/* 252930 */}
      </Grid>
      <Flex w="full" borderRadius="lg">
        <Button
          color={colorScheme.foreground}
          bgColor={colorScheme.background}
          w="50%"
          mr="1rem"
          p="2rem"
          _hover={{ bgColor: colorScheme.brightBlack }}
          _active={{ bgColor: colorScheme.brightBlack }}
        >
          Go Back
        </Button>
        <Button
          color={colorScheme.foreground}
          bgColor={colorScheme.background}
          w="50%"
          p="2rem"
          _hover={{ bgColor: colorScheme.brightBlack }}
          _active={{ bgColor: colorScheme.brightBlack }}
        >
          Reset
        </Button>
      </Flex>
    </Container>
  );

}
