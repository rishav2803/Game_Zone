import { useEffect, useState } from "react";
import { useWs } from "../../hooks/useWs";

const GroupA = () => {
  const [ready, val, send] = useWs({ url: "ws://localhost:8080/tournament/groupA" });
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default GroupA;
