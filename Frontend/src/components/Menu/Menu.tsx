import {useNavigate} from "react-router-dom";
import Card from "../ui/Card";
import styles from "./Menu.module.css";

const Menu = ({onSelect}) => {

  const navigate=useNavigate();

  function optionHandler(e){
    onSelect(true,e.target.innerText);
  }

  async function createGameHandler(){
    const res=await fetch("http://localhost:8080/newgame");
    const {RoomId}=await res.json();
    navigate(`game/${RoomId}`);
  }

  async function joinGameHandler(){
    const res=await fetch("http://localhost:8080/joingame");
    const {RoomId}=await res.json();
    navigate(`game/${RoomId}`);
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
              <li className={styles.menu_item} onClick={createGameHandler}>Create Game</li>
              <li className={styles.menu_item} onClick={joinGameHandler}>Join Game</li>
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
