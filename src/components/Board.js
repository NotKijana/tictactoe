import React, { useContext } from "react";
import GameContext from "../context/game/GameContext";
import Block from "./Block";

const Board = () => {
    const gameContext = useContext(GameContext);
    const { board, isPlayerOneTurn, setBoardValue, check4Winner,
    playerOne, playerTwo, setPlayerTurn, isGameStart, winner } = gameContext;

    const gameBoard = () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = <Block index={i} playerOne={playerOne} playerTwo={playerTwo}
                            key={i} setPlayerTurn={setPlayerTurn} setBoardValue={setBoardValue}
                            isPlayerOneTurn={isPlayerOneTurn} check4Winner={check4Winner} winner={winner}
                        />
        }
        return board;
    }
// Board i had a [] around it
    //Make use Effect to check win conditions when player turn changes
    const styles = {
        gridTemplateRows: `repeat(${Math.sqrt(board.length)}, 1fr)`,
        gridTemplateColumns: `repeat(${Math.sqrt(board.length)}, 1fr)`
    }
    return (
        <div className={"board " + (!isGameStart && 'hidden')} style={styles}>
            {isGameStart && gameBoard()}
        </div>
    )
}

export default Board;