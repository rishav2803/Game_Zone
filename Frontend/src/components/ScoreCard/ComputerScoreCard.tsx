import styles from "./ScoreCard.module.css";
import { useContext } from "react";
import PlayerContext from "../../context/player-context";

type Computer = {
  symbol?: string;
  currentlyPlaying?:boolean;
};

const ComputerScoreCard = ({ symbol ,currentlyPlaying}: Computer) => {
  const ctx = useContext(PlayerContext);
  return (
    <div className={styles.container}>
      <div className={`${styles.scoreCard} ${currentlyPlaying==true?styles.playing:""}`}>
        <div className={styles.userName}>
          <p>{ctx.userName}</p>
        </div>
        <div className={styles.symbol}>
          <h1>{ctx.userSymbol}</h1>
        </div>
      </div>
      <div className={`${styles.scoreCard} ${currentlyPlaying==false?styles.playing:""}`}>
        <div className={styles.userName}>
          <p>Computer</p>
        </div>
        <div className={styles.symbol}>
          <h1>{symbol}</h1>
        </div>
      </div>
    </div>
  );
};

export default ComputerScoreCard;
