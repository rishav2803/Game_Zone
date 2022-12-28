import styles from "./Card.module.css";

type props = {
  children: JSX.Element | JSX.Element[];
};

const Card = ({ children }: props) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
