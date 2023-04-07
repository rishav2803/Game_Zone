import { useContext, useEffect, useState } from "react";
import ScoreCard from "../ScoreCard/ScoreCard";
import styles from "./Board.module.css";
import Cell from "./Cell";
import PlayerContext from "../../context/player-context";
import Modal from "../ui/Modal";
import { checkWinner } from "../../../utils/checkWinner";
import {useNavigate} from "react-router-dom";


type Winner = {
  bool?: boolean;
  winner: string;
};

const ComputerBoard = ({onExit}) => {
  const ctx = useContext(PlayerContext);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(true);
  const symbol = ctx.userSymbol == "X" ? "O" : "X";
  const [winner, setWinner] = useState<Winner>({ bool: false, winner: "" });

  const reset = () => {
    setSquares(Array(9).fill(null));
    setWinner({
      bool: false,
      winner: "",
    });
    setPlayerTurn(true);
  };

  const exit = () => {
    console.log(onExit);
    onExit(false);
  };

  const findIndex = () => {
    const emptyCells: number[] = [];
    //Make array of all the indices that are empty
    squares.forEach((square, index) => {
      if (square == null) {
        emptyCells.push(index);
      }
    });
    //randomly select the index from the array
    const index = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newData = squares.map((val, i) => {
      if (i == index) {
        return symbol;
      }
      return val;
    });
    setPlayerTurn(true);
    setSquares(newData);
  };

  if (playerTurn == false) {
    setTimeout(() => {
      findIndex();
    }, 1200);
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

  useEffect(() => {
    const winner = checkWinner(squares);
    if (winner) {
      setWinner({
        bool: true,
        winner: winner,
      });
    } else if (winner && squares.filter((square) => !square).length) {
      setWinner({
        bool: true,
        winner: "both",
      });
    }
  }, [squares]);

  return (
    <>
      {winner.bool && <Modal winner={winner.winner}></Modal>}
      <div className={styles.board_container}>
        <ScoreCard
          currentlyPlaying={playerTurn}
          computerSymbol={symbol}
        ></ScoreCard>
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
                    disabled={playerTurn == true ? false : true}
                  ></Cell>
                );
              })}
          </div>
          <div className="btn_container">
          <button onClick={reset} className={styles.reset}>
            Reset
          </button>
          <button onClick={exit} className={styles.leave}>
            Exit  
          </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ComputerBoard;
