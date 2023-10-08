import React, { useState } from "react";

interface PlayerContextType {
  currentUser: string;
  setUser: (val: string) => void;
  userSymbol: string;
  setSymbol: (val: string) => void;
}

const PlayerContext = React.createContext<PlayerContextType>({} as PlayerContextType);

export default PlayerContext;

export function PlayerProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [userSymbol, setUserSymbol] = useState("");

  function setUser(val:string) {
    setCurrentUser(val);
  }

  function setSymbol(val:string) {
    setUserSymbol(val);
  }

  const value = {
    currentUser,
    userSymbol,
    setSymbol,
    setUser
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}
