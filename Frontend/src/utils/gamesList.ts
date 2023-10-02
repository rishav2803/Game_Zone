import ticImg from "../assets/tic.png"
import rpsImg from "../assets/rps.png"

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
    online: true,
    imgLink:ticImg
  },
  {
    name: "Rock Paper Scissors",
    link: "/rock-paper-scissors",
    computer: true,
    online: true,
    imgLink:rpsImg
  },
];
