import {Flex,Text} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import colorScheme from '../utils/colors';

const Timer = () => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
      // Add your game over logic here
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <Flex
      w="50%"
      justifyContent="center"
      alignItems="center"
      fontSize="1.5rem"
      flexDirection="column"
      fontFamily="Fredoka"
      color={colorScheme.foreground}
    >
      <Text fontSize="1.1rem">Time Left</Text>
      <Text fontWeight={"bold"} fontSize={"1.5rem"}>{timer}</Text>     </Flex>
  );
};

export default Timer;
