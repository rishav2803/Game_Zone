import ComputerScoreCard from "./ComputerScoreCard";
import PlayerScoreCard from "./PlayerScoreCard";

type ScoreCardProps = {
  users?: [{}];
  computerSymbol?: string;
  currentlyPlaying:boolean;
};

const ScoreCard = ({users, computerSymbol,currentlyPlaying }: ScoreCardProps) => {
  //Here i want to have different types of scorecard for different games eg,computer,vs
  if (computerSymbol != undefined) {
    return <ComputerScoreCard symbol={computerSymbol} currentlyPlaying={currentlyPlaying} />;
  } else if (users){

    return <PlayerScoreCard users={users} currentlyPlaying={currentlyPlaying}></PlayerScoreCard>;
  }
};

export default ScoreCard;
