import { useContext, useEffect, useState } from "react";
import ScoreCard from "../ScoreCard/ScoreCard";
import styles from "./Board.module.css";
import Card from "../ui/Card";
import Cell from "./Cell";
import PlayerContext from "../../context/player-context";
import { checkWinner } from "../../../utils/checkWinner";
import Modal from "../ui/Modal";

type BoardProps = {
  send: (a: string) => {};
  users?: [{}];
  game: { pos: number; symbol: string };
  reset: {};
};

type Player = "X" | "O";

type Winner = {
  bool?: boolean;
  winner: string;
};

const Board = ({ send, users, game, reset }: BoardProps) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState("X");
  const [winner, setWinner] = useState<Winner>({ bool: false, winner: "" });
  const ctx = useContext(PlayerContext);
  const symbol = ctx.userSymbol;

  //other player turn is here
  useEffect(() => {
    if (game !== undefined) {
      //scuffed way to solve problem.Probably some better way to solve it?
      if (game.pos === undefined) {
        game.pos = 0;
      }
      const newData = squares.map((val, i) => {
        if (i === game.pos) {
          return game.symbol;
        }
        return val;
      });
      setSquares(newData);
      setPlayerTurn(playerTurn === "X" ? "O" : "X");
    }
  }, [game]);

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

  //Reset on both sides
  if (reset) {
    setSquares(Array(9).fill(null));
    setWinner({
      bool: false,
      winner: "",
    });
    setPlayerTurn("X");
  }

  const setSquaresValue = (value: number) => {
    console.log("Called me");
    const newData = squares.map((val, i) => {
      if (i == value) {
        send(
          JSON.stringify({
            type: "game",
            body: { pos: i == 0 ? 0 : i, symbol: ctx.userSymbol },
            ready: true,
          })
        );
        return symbol;
      }
      return val;
    });
    setSquares(newData);
  };

  return (
    <>
      {winner.bool && <Modal winner={winner.winner}></Modal>}
      <div className={styles.board_container}>
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
                    disabled={playerTurn == ctx.userSymbol ? false : true}
                  ></Cell>
                );
              })}
          </div>
          <button
            onClick={() => {
              send(
                JSON.stringify({
                  type: "reset",
                  ready: true,
                })
              );
            }}
            className={styles.reset}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};
export default Board;
