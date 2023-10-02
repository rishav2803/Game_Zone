import {Box,Button,Flex,Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import colorScheme from "../../utils/colors";
import {RenderIf} from "../RenderIf";
import styles from "./Modal.module.css";

type ModalMessage = {
  winner?: string;
  onReset:() => void;
};

const ResultModal = ({ winner,onReset }: ModalMessage) => {
  const navigate=useNavigate();

  function exit() {
    navigate("/");
  };

  return (
    <Box display="grid" placeItems="center" position="fixed" w="100%" h="100%" bgColor="rgba(0,0,0,0.5)" zIndex="2">
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" w="full"  h="30vh" bgColor={colorScheme.background} zIndex="3" color={colorScheme.foreground}>
        <Flex alignItems="center" justifyContent="center" fontWeight={"bold"}>
          <RenderIf
            renderIf={winner==="tie"}
            children=<Text color={colorScheme.foreground} fontSize={["2.2rem","3.1rem"]}  mr={"1.2rem"}>It's a Tie</Text>
          />
          <RenderIf
            renderIf={winner!=="tie"}
            children={
                <>
                  <Text color={colorScheme.foreground} fontSize={["2.2rem","3.1rem"]}  mr={"1.2rem"}>{winner}</Text>
                  <Text color={colorScheme.foreground} fontSize={["1.5rem","1.9rem"]} textTransform={"uppercase"}>takes the round </Text>     
                </>
           } 
          />
        </Flex>
        <Flex mt=".5rem" borderRadius="lg">
          <Button
            color={colorScheme.foreground}
            bg={colorScheme.rockGradient}
            w="50%"
            mr="1rem"
            px="2.5rem"
            py="1rem"
            boxShadow="xl"
            onClick={exit}
            _hover={{ bgColor: colorScheme.brightBlack }}
            _active={{ bgColor: colorScheme.brightBlack }}
          >
            Go Back
          </Button>
          <Button
            color={colorScheme.foreground}
            bg={colorScheme.paperGradient}
            boxShadow="xl"
            // onClick={reset}
            w="50%"
            px="2.5rem"
            py="1rem"
            _hover={{ bgColor: colorScheme.brightBlack }}
            _active={{ bgColor: colorScheme.brightBlack }}
            onClick={onReset}
          >
            Play Again
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default ResultModal;
