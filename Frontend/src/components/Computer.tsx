import ComputerBoard from "./GameBoard/ComputerBoard";

const Computer = ({onExit}) => {
  return (
    <>
      <ComputerBoard onExit={onExit}></ComputerBoard>
    </>
  );
};

export default Computer;
