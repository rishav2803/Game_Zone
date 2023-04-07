import Login from "./Login";
import Menu from "./Menu";
import { useState } from "react";
import PlayerContext from "../../context/player-context";
import Symbol from "./Symbol";
import CreateGame from "../CreateGame";
import JoinGame from "../JoinGame";
import Computer from "../Computer";

const Start = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userSymbol, setUserSymbol] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [isSymbolSelected, setIsSymbolSelected] = useState(false);

  const [isCreateGame, setIsCreateGame] = useState(false);
  const [isJoinGame, setIsJoinGame] = useState(false);
  const [isComputer, setIsComputer] = useState(false);

  const [optionSelected, isOptionSelected] = useState("");
  const [userName, setUserName] = useState("");

  const userNameHandler = (val: string) => {
    setUserName(val);
  };

  const loginHandler = (val: boolean) => {
    setIsLoggedIn(val);
  };

  const optionHandler = (val: boolean, text: string) => {
    setIsSelected(val);
    if (text === "Create Game") {
      setIsCreateGame(true);
    } else if (text === "Join Game") {
      setIsJoinGame(true);
    } else if (text === "Vs Computer") {
      setIsComputer(true);
    }
  };

  const symbolHandler = (val: string) => {
    setUserSymbol(val);
    setIsSymbolSelected(true);
  };

  const exitHandler=(val:boolean)=>{
    setIsSelected(val);
    setIsSymbolSelected(val);
  }

  return (
    <>
      <PlayerContext.Provider
        value={{
          userName: userName,
          userSymbol: userSymbol,
          optionSelected: optionSelected,
        }}
      >
        {!isLoggedIn && <Login login={loginHandler} onUser={userNameHandler} />}
        {!isSelected && isLoggedIn && <Menu onSelect={optionHandler} />}
        {!isSymbolSelected && isSelected && isLoggedIn && (
          <Symbol onSymbol={symbolHandler} />
        )}
        {isCreateGame && isSymbolSelected && isSelected && isLoggedIn && (
          <CreateGame />
        )}
        {isJoinGame && isSymbolSelected && isSelected && isLoggedIn && (
          <JoinGame />
        )}
        {isComputer && isSymbolSelected && isSelected && isLoggedIn && (
          <Computer  onExit={exitHandler}/>
        )}
      </PlayerContext.Provider>
    </>
  );
};

export default Start;
