import { useContext, useEffect, useState } from "react";
import ScoreCard from "../ScoreCard/ScoreCard";
import styles from "./Board.module.css";
import Card from "../ui/Card";
import Cell from "./Cell";
import PlayerContext from "../../context/player-context";
import Modal from "../ui/Modal";
type Player="X"|"O"|"Both"|null;

const checkWinner=(squares:Player[])=>{
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
  return null;
}


const ComputerBoard = () => {
  const ctx = useContext(PlayerContext);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(true);
  const symbol=ctx.userSymbol=="X"?"O":"X";
  const [winner,setWinner]=useState<Player>(null);

  
  const reset=()=>{
    setSquares(Array(9).fill(null));
    setPlayerTurn(true);
  }

  const findIndex=()=>{
    const emptyCells:number[]=[];
    //Make array of all the indices that are empty
    squares.forEach((square,index) => {
      if (square==null) {
        emptyCells.push(index);
      }
    });
    //randomly select the index from the array
    const index=emptyCells[Math.floor(Math.random()*emptyCells.length)];
    const newData = squares.map((val, i) => {
      if (i == index) {
        return symbol;
      }
      return val;
    });
    setPlayerTurn(true);
    setSquares(newData);
  }

  if(playerTurn==false){
    setTimeout(()=>{
      findIndex();
    },1200)
  }

  const setSquaresValue = (value: number) => {
    const newData = squares.map((val, i) => {
      if (i == value) {
        return ctx.userSymbol;
      }
      return val;
    });
    setPlayerTurn(false);
    setSquares(newData);
  };

  useEffect(()=>{
    const winner=checkWinner(squares);
    if (winner) {
      setWinner(winner);
    }

    if (!winner && squares.filter((square)=>!square).length) {
      setWinner("Both");
    }
  },[squares])

  return (
      <Card>
        <ScoreCard currentlyPlaying={playerTurn} computerSymbol={symbol}></ScoreCard>
        {winner && winner!=="Both"&& <Modal winner={winner}></Modal>}
        <div className={styles.container}>
          <div className={styles.grid_container}>
            {Array(9)
              .fill(null)
              .map((_, i) => {
                return (
                  <Cell
                    key={i}
                    value={squares[i]}
                    onClick={
                      ()=>setSquaresValue(i)
                    }
                    disabled={playerTurn==true?false:true}
                  ></Cell>
                );
              })}
          </div>
        <button onClick={reset} className={styles.reset}>Reset</button>
        </div>
      </Card>
  );
};
export default ComputerBoard;
