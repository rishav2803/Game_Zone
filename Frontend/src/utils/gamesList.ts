import ticImg from "../assets/tic.png"
import slideImg from "../assets/slide.png"
import rpsImg from "../assets/rps.png"
import {newGameUrl} from "../constants/urls";

interface Game {
  name: string;
  link: string;
  computer: boolean;
  online: boolean;
  imgLink:string;
}

export const games:Game[] = [
  {
    name: "Tic Tac Toe",
    link: "/tic-tac-toe",
    computer: true,
    online: false,
    imgLink:ticImg
  },
  {
    name: "Rock Paper Scissors",
    link: "/rock-paper-scissors",
    computer: true,
    online: false,
    imgLink:rpsImg
  },
  {
    name: "Sliding Puzzle",
    link: "/slide-puzzle",
    computer: true,
    online: false,
    imgLink:slideImg
  },
  {
    name: "Tic Tac Toe",
    link: newGameUrl,
    computer: false,
    online: true,
    imgLink:ticImg
  },
];
