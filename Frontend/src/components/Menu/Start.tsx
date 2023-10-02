import Login from "./Login";
import Menu from "./Menu";
import { useState } from "react";
import Computer from "../Computer";
import {Box, Container} from "@chakra-ui/react";

const Start = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userSymbol, setUserSymbol] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [isSymbolSelected, setIsSymbolSelected] = useState(false);

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
    <Box bg={"teal"} w={"100%"}>
      <Container>
        <h1>GAMING AREA</h1>
      </Container>
      {!isLoggedIn && <Login login={loginHandler} onUser={userNameHandler} />}
      {!isSelected && isLoggedIn && <Menu onSelect={optionHandler} />}
      {isComputer && isSymbolSelected && isSelected && isLoggedIn && (
        <Computer  onExit={exitHandler}/>
      )}
    </Box>
  );
};

export default Start;
