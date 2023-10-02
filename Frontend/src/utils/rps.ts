import ScissorsImg from "../assets/icon-scissors.svg";
import RockImg from "../assets/icon-rock.svg";
import PaperImg from "../assets/icon-paper.svg";
import colorScheme from "./colors";

export const rps=[
  {
    src:ScissorsImg,
    bgColor:colorScheme.scissorsGradient,
    gridArea:"scissors"
  },
  {
    src:PaperImg,
    bgColor:colorScheme.paperGradient,
    gridArea:"paper"
  },
  {
    src:RockImg,
    bgColor:colorScheme.rockGradient,
    gridArea:"rock"
  },
]
