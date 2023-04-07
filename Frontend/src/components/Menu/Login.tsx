import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import Card from "../ui/Card";
// import Card from "../ui/Card";
import styles from "./Login.module.css";


const Login=({login,onUser})=>{
  const userNameRef=useRef<HTMLInputElement>(null);
  const loginChangeHandler=()=>{
    const userName=userNameRef.current?.value;
    if (userName==="") {
      alert("Please enter username!!!")
      return;
    }
    onUser(userName);
    login(true);
  }
  return (
    <>
      <Card>
      <div className={styles.center}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <span className={styles.one}>TIC TAC </span>TOE GAME
          </h1>
          <input type="text" name="userName" ref={userNameRef} placeholder="Enter a nickname"  className={styles.input}  />
          <button className={styles.button} name="submit" onClick={loginChangeHandler}>Start</button>
        </div>
      </div>
      </Card>
    </>
  );
}

export default Login;
