import {Box, Button, Image} from "@chakra-ui/react"
import { useState } from "react";
import colorScheme from "../utils/colors";
import {RenderIf} from "./RenderIf";

interface RPSButtonProps{
  setSelected:(bgColor,imgSrc,gridArea)=>void;
  bgColor:string
  imgSrc:string
  gridArea:string
}

export default function RPSButton({setSelected,bgColor,imgSrc,gridArea}:RPSButtonProps){
  const [hovering,setHovering]=useState(false);
  return(
    <Button 
      bgColor={"transparent"}
      _active={{bgColor:"transparent"}}
      _hover={{bgColor:"transparent"}}
      gridArea={gridArea}
      onClick={()=>{setSelected(bgColor,imgSrc,gridArea)}}
    >
      <Box
        position="relative"
        width="7.5rem"
        height="7.5rem"
        background={colorScheme.foreground}
        borderRadius="50%"
        display="grid"
        placeItems="center"
        boxShadow="inset 0 0.5rem #00000026"
        _before={{
          content: "''",
          position: "absolute",
          width: "130%",
          height: "130%",
          left: "-15%",
          top: "-15%",
          zIndex:"-1",
          borderRadius:"50%",
          background:bgColor,
        }}
        _after={{
          content: "''",
          position: "absolute",
          width: "130%",
          height: "130%",
          left: "-15%",
          top: "-15%",
          zIndex:"-1",
          borderRadius:"50%",
          transition: "opacity 1000ms ease-in-out",
          boxShadow: hovering ? '0 0 0 2rem #223351' : '',
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <RenderIf
          renderIf={imgSrc=="/src/assets/icon-rock.svg"}
          children=<div style={{transform:"scale(1.2)"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
              <path fill="#3B4262" d="M45.06 12.22c-.642-8.096-9.734-7.269-9.734-7.269-3.837-6.765-9.832-1.865-9.832-1.865-4.606-6.63-10.38-.486-10.38-.486-9.957-1.074-9.571 7.066-9.571 7.066-.234 2.588 1.403 10.593 1.403 10.593-1.477-4.614-4.68-.784-4.68-.784-3.94 6.078-.975 9.405-.975 9.405 5.33 6.246 16.688 13.743 16.688 13.743 4.113 2.356 2.373 4.457 2.373 4.457l24.876-4.11.571-4.718c3.782-11.436-.739-26.032-.739-26.032z"/></svg>
          </div>
        />
        <RenderIf
          renderIf={imgSrc!=="/src/assets/icon-rock.svg"}
          children= <Image style={{transform:"scale(1.2)"}} src={imgSrc}/>
        />
      </Box>
    </Button>
  );
}
