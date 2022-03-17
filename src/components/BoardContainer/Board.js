import React, { useContext } from "react";
import GameContext from "../../context/game/GameContext";
import BoardBlock from "../BoardBlock/BoardBlock";

/*
*Game board Container
* [][][]
* [][][]
* [][][]
* Layout Format should be square
*/
const Board = () => {
    // Grabs all states from context
    const gameContext = useContext(GameContext);
    // Refactored for readability
    const { board, isPlayerOneTurn, setBoardValue, check4Winner,
    playerOne, playerTwo, setPlayerTurn, isGameStart, winner } = gameContext;

    // Makes grid based on board size
    const styles = {
        gridTemplateRows: `repeat(${Math.sqrt(board.length)}, 1fr)`,
        gridTemplateColumns: `repeat(${Math.sqrt(board.length)}, 1fr)`
    }

    /* Inits game
    *  Gives ea. block class props
    */
    const gameBoard = () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = <BoardBlock index={i} playerOne={playerOne} playerTwo={playerTwo}
                            key={i} setPlayerTurn={setPlayerTurn} setBoardValue={setBoardValue}
                            isPlayerOneTurn={isPlayerOneTurn} check4Winner={check4Winner} winner={winner}
                        />
        }
        return board;
    }
    
    // Board is hidden until game starts
    return (
        <div className={"board " + (!isGameStart && 'hidden')} style={styles}>
            {isGameStart && gameBoard()}
        </div>
    )
}

export default Board;