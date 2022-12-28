import React from "react";

type Players={
  userName:string,
  symbol:string
}

const PlayerContext = React.createContext({
  userName:"",
  userSymbol:"",
  optionSelected:""
})


export default PlayerContext;
