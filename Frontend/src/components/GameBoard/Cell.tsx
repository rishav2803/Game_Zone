// import styles from "./Board.module.css"
import { Box, Button, Center } from "@chakra-ui/react";
import colorScheme from "../../utils/colors";
const Cell=({value,onClick,disabled}:{
  value:string|null|number,
  onClick:()=>void,
  disabled:boolean
})=>{
  return (
    <Button 
      isDisabled={disabled}
      onClick={onClick}
      boxSizing="border-box"
      outline="none" 
      lineHeight="0"
      _hover={{cursor:"pointer"}}
      bgColor={"transparent"}
      _active={{ bgColor: "transparent" }}
      color={value==="X"?colorScheme.purple:colorScheme.green}
      borderColor="white"
      fontSize="2.5rem" 
      fontFamily="Fredoka"
      fontWeight="extrabold"
      width="100px"
      height="95px"
      display="block"
    >
      {value}
    </Button>
  );
}

 export default Cell;
