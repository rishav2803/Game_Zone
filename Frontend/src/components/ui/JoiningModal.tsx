import {Spinner,Box,Text,Container} from "@chakra-ui/react";
import colorScheme from "../../utils/colors";


const JoiningModal = () => {
  return (
    <Box display="grid" placeItems="center" position="fixed" w="100%" h="100%" bgColor="rgba(0,0,0,0.6)" zIndex="10">
      <Container w="100%" display={"flex"} justifyContent="center" alignItems="center" flexDirection="column">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl" />
          <Text mt={4} fontSize="lg" fontWeight="bold" color={colorScheme.foreground}>
            Finding a player...
          </Text>
      </Container>
    </Box>
  );
};

export default JoiningModal;
