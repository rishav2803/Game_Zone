import {Box,Button,Container,FormLabel,Input} from "@chakra-ui/react";
import colorScheme from "../../utils/colors";
import {useContext,useState} from "react";
import PlayerContext from "../../context/player-context";


const NameModal = () => {
  
  const [userName,setUserName]=useState("");
  const ctx=useContext(PlayerContext);

  function submitHandler(){
    console.log(userName)
    ctx?.setUser(userName);
  }

  return (
    <Box display="grid" placeItems="center" position="fixed" w="100%" h="100%" bgColor="rgba(0,0,0,0.5)" zIndex="2">
      <Box display="flex" flexDirection="column" justifyContent="center"  w="full"  h="30vh" bgColor={colorScheme.background} zIndex="3" color={colorScheme.foreground}>
        <Container>
          <FormLabel>Enter a name:</FormLabel>
          <Input
            type="text"
            onChange={(e)=>{setUserName(e.target.value)}}
          />
          <Button
            color={colorScheme.foreground}
            bg={colorScheme.paperGradient}
            mt="1rem"
            boxShadow="xl"
            // onClick={reset}
            px="2.5rem"
            py="1rem"
            _hover={{ bgColor: colorScheme.brightBlack }}
            _active={{ bgColor: colorScheme.brightBlack }}
            onClick={submitHandler}
          >
            Submit 
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default NameModal;
