import {Box, Button, Card, CardBody, CardFooter, CardHeader, Img, Text} from "@chakra-ui/react";
import colorScheme from "../utils/colors";

interface GameCardProps{
  name:string;
  imgLink:string;
  onClick:()=>void;
}

const GameCard: React.FC<GameCardProps> = ({name,imgLink,onClick}) => {
  return(
    <Card
      bgImg={imgLink}
      bgSize="cover"
      bgRepeat={"no-repeat"}
      color={colorScheme.foreground}
      position="relative"
      h="35vh"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bg="rgba(0, 0, 0, 0.5)"
        zIndex="1"
      />
      <CardHeader fontWeight={"bold"} fontSize="1.3rem" zIndex="2">
        <Text borderBottom={"2px"} pb={2} borderBottomColor={colorScheme.foreground}>
          {name}
        </Text>
      </CardHeader>
      <CardBody/>
      <CardFooter fontWeight={"bold"} fontSize="1.3rem" zIndex="2">
        <Button onClick={onClick} bgColor={colorScheme.foreground}>Play Now</Button>
      </CardFooter>
    </Card>
  );
}

export default GameCard;
