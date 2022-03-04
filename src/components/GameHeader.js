import React, { useContext } from "react";
import Reset from "./Reset";
import GameContext from "../context/game/GameContext";
import refreshBtn from '../assets/icon-restart.svg';

const GameHeader = () => {
    const gameContext = useContext(GameContext);
    const { isPlayerOneTurn, isGameStart } = gameContext;

    return (
        <header className="header">
            <h1 className="header_text">
                {isGameStart && (
                    isPlayerOneTurn ? "Player 1's Turn"
                    : "Player 2's Turn")
                }
            </h1>
            <Reset icon={<img src={refreshBtn} alt='Refresh button'/>}/>
        </header>
    )
}

export default GameHeader;