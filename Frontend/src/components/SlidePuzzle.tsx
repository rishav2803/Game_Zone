import React, { useState } from "react";
import { motion, useAnimationControls } from 'framer-motion';
import { Grid, Button, Container } from "@chakra-ui/react";
import colorScheme from "../utils/colors";
import {color} from "framer-motion";

interface PuzzleProps {
  numbers: number[];
}

const SlidePuzzle: React.FC<PuzzleProps> = ({ numbers }) => {
  const [tiles, setTiles] = useState(numbers);

  const handleClick = (index: number) => {
    const emptyIndex = tiles.indexOf(0);

    //We check if the  tile is either at the left || or right || or top || or left of the empty tile
    if (emptyIndex === index - 1 || emptyIndex === index + 1 || emptyIndex === index - 3 || emptyIndex === index + 3) {
      const newTiles = [...tiles];
      //we then swap the two tile
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
    }
  };

  return (
    <Container display="flex" justifyContent="space-evenly"  flexDirection={"column"} maxW="500px" w="100%" overflow="hidden" alignItems="center" h="100vh">
      <Grid bg={colorScheme.brightBlack} templateColumns="repeat(3, 1fr)" gap={1} placeItems="center">
        {tiles.map((number, index) => (
          <button
            key={index}
            style={{
              width: "100px",
              height: "100px",
              fontSize: "1.5rem",
              fontWeight: "bold",
              border: "none",
              borderRadius: "none",
              cursor: number === 0 ? "default" : "pointer",
              background: number === 0 ? "transparent" : colorScheme.foreground,
            }}
            onClick={() => handleClick(index)}
            disabled={number === 0}
          >
            {number === 0 ? "" : number}
          </button>
        ))}
      </Grid>
    </Container>
  );
};

export default SlidePuzzle;
