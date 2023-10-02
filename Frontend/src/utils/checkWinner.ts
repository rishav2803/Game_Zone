import {rpsState} from "../components/RPS";
import ScissorsImg from "../assets/icon-scissors.svg";
import RockImg from "../assets/icon-rock.svg";
import PaperImg from "../assets/icon-paper.svg";

type Player="X"|"O";

export const checkWinner=(squares:Player[])=>{
  const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c]=lines[i];
    if (squares[a] && squares[a]===squares[b] && squares[a]===squares[c]) {
      return squares[a];
    }
  }
  return "";
}

export const getRandomSymbol = () => {
  const symbols = ["X", "O"];
  const randomIndex = Math.floor(Math.random() * symbols.length);
  return symbols[randomIndex];
};

export const checkWinnerRps = (userChoice: rpsState, computerChoice: rpsState) => {

  if(Object.keys(userChoice).length>1 && Object.keys(computerChoice).length>1){
    if (userChoice.src === computerChoice.src) {
      return "tie";
    } else if (
      (userChoice.src === ScissorsImg && computerChoice.src === PaperImg) ||
      (userChoice.src === RockImg && computerChoice.src === ScissorsImg) ||
    (userChoice.src === PaperImg && computerChoice.src === RockImg)
    ) {
      return "USER";
    } else {
      return "CPU";
    }
  }
  return "";
};
