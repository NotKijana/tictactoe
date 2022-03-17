import React, { useContext } from "react";
import GameContext from '../../context/game/GameContext'

// Resets game (Refreshes page for simplicity)
const Reset = (props) => {
    const gameContext = useContext(GameContext);

    const { resetGame } = gameContext;
  return (
    <button className={"button " + props.type} onClick={() => resetGame()}>{props.icon}</button>
  )
}

export default Reset