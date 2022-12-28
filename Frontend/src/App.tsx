import {useState} from "react";
import { Routes, Route } from "react-router-dom";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import Start from "./components/Menu/Start";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/test" element={<Start />} />
        <Route path="/create-game" element={<CreateGame />} />
        <Route path="/join-game" element={<JoinGame />} />
      </Routes>
    </div>
  );
}
export default App;
