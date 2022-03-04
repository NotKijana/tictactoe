import React, { useContext } from "react";
import GameContext from "../context/game/GameContext";


const Reset = (props) => {
    const gameContext = useContext(GameContext);

    const { resetGame } = gameContext;
  return (
    <button className="button reset" onClick={() => resetGame()}>{props.icon}</button>
  )
}

export default Reset