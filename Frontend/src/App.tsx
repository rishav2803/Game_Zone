import { Routes, Route } from "react-router-dom";
import {useContext} from "react";
import CreateGame from "./components/CreateGame";
import ComputerBoard from "./components/GameBoard/ComputerBoard";
import GroupA from "./components/GroupA";
import JoinGame from "./components/JoinGame";
import RPS from "./components/RPS";
// import Start from "./components/Menu/Start";
import GameRoom from "./components/Screens/Game";
import Home from "./components/Screens/Home";
import TicComputer from "./components/TicComputer";
import PlayerContext from "./context/player-context";
import {RenderIf} from "./components/RenderIf";
import ResultModal from "./components/ui/Modal";
import NameModal from "./components/ui/NameModal";
import SlidePuzzle from "./components/SlidePuzzle";
function App() {
  const ctx=useContext(PlayerContext);
  console.log(ctx?.currentUser);
  

  return (
    <>
      <RenderIf
        renderIf={ctx?.currentUser===""}
        children={<NameModal />}
      />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tic-tac-toe" element={<ComputerBoard />} />
          <Route path="/slide-puzzle" element={<SlidePuzzle  numbers={[1, 2, 3, 4, 5, 6, 7, 8, 0]}/>} />
          <Route path="/rock-paper-scissors" element={<RPS/>} />
          <Route path="/create-game" element={<CreateGame />} />
          <Route path="/join-game" element={<JoinGame />} />
          <Route path="/game/:gameId" element={<GameRoom/>} />
          <Route path="/groupA" element={<GroupA />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
