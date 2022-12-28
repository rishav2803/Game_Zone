import Card from "../ui/Card";
import Login from "./Login";
import styles from "./Menu.module.css";

const Menu = ({onSelect}) => {

  function optionHandler(e){
    onSelect(true,e.target.innerText);

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
              {/* <p className={styles.metadata}>A multiplayer game</p> */}
            </div>
          </div>
          <div className={styles.menu_container}>
            <ul className={styles.menu}>
              <li className={styles.menu_item} onClick={optionHandler}>Create Game</li>
              <li className={styles.menu_item} onClick={optionHandler}>Join Game</li>
              <li className={styles.menu_item} onClick={optionHandler}>Tournament</li>
              <li className={styles.menu_item} onClick={optionHandler}>Vs Computer</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default Menu;
