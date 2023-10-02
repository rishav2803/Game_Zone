// import styles from "./Board.module.css"
import { Box, Button, Center } from "@chakra-ui/react";
import {color} from "framer-motion";
import colorScheme from "../../utils/colors";
const Cell=({value,onClick,disabled}:{
  value:string|null,
  onClick:()=>void,
  disabled:boolean
})=>{
  return (
    <Button 
      // className={`${styles.grid_item} ${value === "X" ? styles.green : styles.grid_item}`}
      isDisabled={disabled}
      outline="none"
      onClick={onClick}
      boxSizing="border-box"
      _focus={{ outline: "none" }}
      px={"3rem"}
      py={"3rem"}
      _hover={{cursor:"pointer"}}
      bgColor={"transparent"}
      _active={{ bgColor: "transparent" }}
      color={value==="X"?colorScheme.purple:colorScheme.green}
      border="3px"
      borderColor="white"
      // bg={value === "X" ? "green.500" : "gray.200"} // Set background color for "X" cells
      fontSize="2rem" // Set font size
      fontFamily="Fredoka"
      fontWeight="extrabold"
    >
      {value}
    </Button>
  );
}

  export default Cell;
