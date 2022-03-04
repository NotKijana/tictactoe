import React from "react";
import { useReducer } from "react";
import GameContext from './GameContext';
import GameReducer from './GameReducer';
import { 
SET_BOARD, RESET_GAME, SET_PLAYERS, SET_PLAYER_TURN,
SET_WINNER, SET_GAMESTART, CREATE_WIN_CONDITIONS, SET_BOARD_VALUES
} from '../types';

const GameState = props => {
    const initState = {
        board: [],
        boardValues: [],
        playerOne: '',
        playerTwo: '',
        isPlayerOneTurn: true,
        winner: '',
        isGameStart: false,
        winConditions: [],
        winnerMessage: ''
    }

    const [state, dispatch] = useReducer(GameReducer, initState);

    // Set Board
    const setBoard = (boardDimension) => {
        const newBoard = [];
        for(let i = 1; i <= boardDimension; i++) {
            for(let j = 1; j <= boardDimension; j++) {
                newBoard.push(j);
            }
        }
        dispatch({
            type: SET_BOARD,
            payload: newBoard
        })
    }
    // Set Players
    const setPlayers = (playerOneChoice) => {
        let playerTwoChoice = '';
        switch(playerOneChoice) {
            case 'X':
                playerTwoChoice = 'O'
                break;
            case 'O':
                playerTwoChoice = 'X'
                break;
            default:
                return;
        }

        dispatch({
            type: SET_PLAYERS,
            payload: [playerOneChoice, playerTwoChoice]
        })
    }
    // Set Win Conditions
    const setWinConditions = () => {    
        const boardDimensions = Math.sqrt(state.board.length);
        let winningRows = [];
        let winningCols = [];
        let winningDiag = [];
        const createEmptyArr = (boardSize) => {
            let emptyArr = [];
            for(let i = 0; i < boardSize; i++) {
                emptyArr.push(i);
            }
            return emptyArr
        }
        const boardTemplate = createEmptyArr(state.board.length);
        // Winning Rows For Loop
        for(let i = 0; i < boardTemplate.length; i+boardDimensions) {
            winningRows.push((boardTemplate.splice(i, i+boardDimensions)))
        }

        // Winning Columns For Loop
        for(let i = 0; i < boardDimensions; i++) {
            let column = [];
            for(let k = 0; k < state.board.length;) {
                if(k === 0) {
                    column.push(i)
                } else {
                    column.push(k + i)
                }
                // Increments by boardDimension
                k += boardDimensions;
            }
            winningCols.push(column);
        }
    
        // For diagonal do k + diagonal * i if above 0            
        for(let i = 0; i <= boardDimensions; i+=(boardDimensions -1)) {
            let fakeArr = [];
            for(let k = 0; k < boardDimensions; k++) {
                if(i === 0 && k === 0) {
                    // If both zero push zero
                    fakeArr.push(k);
                } else if(i === 0 && k !== 0) {
                    // Will multiply K by dim for diag right
                    fakeArr.push( k * boardDimensions + k);
                } else if(i === (boardDimensions -1) && k === 0) {
                    fakeArr.push(i)
                } else {
                    fakeArr.push(i + (k * i))
                }
            
            }
            winningDiag.push(fakeArr)
        }

        const winningConditions = winningRows.concat(winningCols, winningDiag);

        dispatch({
            type: CREATE_WIN_CONDITIONS,
            payload: winningConditions
        })
    }
    // Set Game Start
    const setGameStart = (gameStatus) => {
        setWinConditions();
        dispatch({ 
        type: SET_GAMESTART, 
        payload: gameStatus
        })
    }
    // Set Board Values
    const setBoardValue = (blockIndex, playerEvent) => {
        dispatch({
            type: SET_BOARD_VALUES,
            payload: [blockIndex, playerEvent]
        })
    }

    // Check for Winner
    const check4Winner = (totalWinConditions) => {
        const boardLength = state.board.length;
        const playerOneMax = Math.ceil(boardLength / 2);
        let playerOneValues = state.boardValues.filter(item => item[1] === state.playerOne);
        let playerTwoValues = state.boardValues.filter(item => item[1] === state.playerTwo);
        playerOneValues = playerOneValues.map(x => x[0]);
        playerTwoValues = playerTwoValues.map(x => x[0]);
        
        for(let i = 0; i < totalWinConditions; i++) {
            const isIncludedP1 = (ele) => playerOneValues.indexOf(ele) !==  -1;
            const isIncludedP2 = (ele) => playerTwoValues.indexOf(ele) !==  -1;

            const playerOneWin = state.winConditions[i].every(isIncludedP1);
            const playerTwoWin = state.winConditions[i].every(isIncludedP2);
    
            if(playerOneWin) {
                setWinner('Player One');
            } else if(playerTwoWin) {
                setWinner('Player Two');
            } else if(playerOneValues.length >= playerOneMax) {
                setWinner('No One');
            } else {
                continue
            }
        }
    }

    // Set Winner
    const setWinner = (winner) => {
        dispatch({
            type: SET_WINNER,
            payload: winner
        })
    }

    // Set Player Turn
    const setPlayerTurn = () => {
        let bool;
        if(state.isPlayerOneTurn) {
            bool = false;
        } else {
            bool = true;
        }
        dispatch({
            type: SET_PLAYER_TURN,
            payload: bool
        })
    }
    // Reset Game
    const resetGame = () => {dispatch({type: RESET_GAME})}

    return (
    <GameContext.Provider
    value={{
        board: state.board,
        boardValues: state.boardValues,
        playerOne: state.playerOne,
        playerTwo: state.playerTwo,
        isPlayerOneTurn: state.isPlayerOneTurn,
        winner: state.winner,
        winConditions: state.winConditions,
        isGameStart: state.isGameStart,
        winnerMessage: state.winnerMessage,
        setBoard: setBoard,
        setPlayers: setPlayers,
        setBoardValue: setBoardValue,
        setGameStart: setGameStart,
        setPlayerTurn: setPlayerTurn,
        setWinner: setWinner,
        check4Winner: check4Winner,
        resetGame: resetGame
    }}
    >
        {props.children}
    </GameContext.Provider>)
}

export default GameState;