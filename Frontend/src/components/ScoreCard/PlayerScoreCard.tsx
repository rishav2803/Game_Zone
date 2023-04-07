import { useContext } from "react";
import PlayerContext from "../../context/player-context";
import styles from "./ScoreCard.module.css";

type Player = {
  users: [{}];
  currentlyPlaying?: boolean | string;
};

const getUsers = (users, currentlyPlaying: string | boolean | undefined) => {
  let list: JSX.Element[] = [];
  for (let i = 0; i < users.length; i++) {
    let user = (
      <div
        className={`${styles.scoreCard} ${
          users[i].symbol === currentlyPlaying ? styles.playing : ""
        }`}
        key={i}
      >
        <div className={styles.userName}>
          <p>{users[i].name}</p>
        </div>
        <div className={styles.symbol}>
          <h1>{users[i].symbol}</h1>
        </div>
      </div>
    );
    list.push(user);
  }
  return list;
};

const PlayerScoreCard = ({ users, currentlyPlaying }: Player) => {
  const ctx = useContext(PlayerContext);
  return (
    <div className={styles.container}>{getUsers(users, currentlyPlaying)}</div>
  );
};

export default PlayerScoreCard;
