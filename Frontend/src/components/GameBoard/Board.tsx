import { useContext, useEffect, useState } from "react";
import ScoreCard from "../ScoreCard/ScoreCard";
import styles from "./Board.module.css";
import Card from "../ui/Card";
import Cell from "./Cell";
import PlayerContext from "../../context/player-context";

type BoardProps = {
  send: (a: string) => {};
  users?: [{}];
  game:{pos:number,symbol:string};
};

type Player="X"|"O"|"Both"|null;

const Board = ({ send, users,game }: BoardProps) => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState("");
  const [winner,setWinner]=useState<Player>(null);
  const ctx=useContext(PlayerContext);
  const symbol=ctx.userSymbol;

  useEffect(()=>{
    if (game!==undefined) {
    const newData=squares.map((val,i)=>{
      if (i===game.pos) {
        return game.symbol;
      }
      return val;
    })
    setSquares(newData);
    setPlayerTurn(ctx.userSymbol);
    }
  },[game])


  const reset=()=>{
    setSquares(Array(9).fill(null));
    // setPlayerTurn(true);
  }


  const setSquaresValue = (value: number) => {
    console.log(playerTurn);
    const newData = squares.map((val, i) => {
      if (i == value) {
        send(JSON.stringify({
          type:"game",
          body:{pos:i==0?0:i,symbol:ctx.userSymbol},
          ready:true
        }));
        return symbol;
      }
      return val;
    });
    setSquares(newData);
    setPlayerTurn(ctx.userSymbol=="X"?"O":"X");
  };

  return (
    <>
      <Card>
        <ScoreCard users={users} currentlyPlaying={playerTurn}></ScoreCard>
        <div className={styles.container}>
          <div className={styles.grid_container}>
            {Array(9)
              .fill(null)
              .map((_, i) => {
                return (
                  <Cell
                    key={i}
                    value={squares[i]}
                    onClick={() => setSquaresValue(i)}
                    disabled={playerTurn==ctx.userSymbol?false:true}
                  ></Cell>
                );
              })}
          </div>
        </div>
      </Card>
    </>
  );
};
export default Board;
