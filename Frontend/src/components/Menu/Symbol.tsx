import Card from "../ui/Card";
import styles from "./Symbol.module.css";
const Symbol = ({onSymbol}) => {
  function symbolHandler(e){
    onSymbol(e.target.innerText);
  }

  return (
    <Card>
      <div className={styles.center}>
        <div className={styles.container}>
          <div className={styles.title}>
            <div className="">
              <h1>
                <span className={styles.one}>TIC TAC </span>TOE GAME
              </h1>
            </div>
          </div>
          <div className={styles.menu_container}>
            <ul className={styles.menu}>
              <li className={styles.menu_item} onClick={symbolHandler}>X</li>
              <li className={styles.menu_item} onClick={symbolHandler}>O</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default Symbol;
