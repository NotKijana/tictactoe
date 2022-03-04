/* eslint-disable import/no-anonymous-default-export */
import { 
    SET_BOARD, RESET_GAME, SET_PLAYERS, SET_PLAYER_TURN,
    SET_WINNER, SET_GAMESTART, CREATE_WIN_CONDITIONS, SET_BOARD_VALUES
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case SET_GAMESTART:
            return {
                ...state,
                isGameStart: action.payload
            }
        case SET_PLAYERS:
            return {
                ...state,
                playerOne: action.payload[0],
                playerTwo: action.payload[1]
            }
        case SET_PLAYER_TURN:
            return {
                ...state,
                isPlayerOneTurn: action.payload
            }        
        case SET_BOARD:
            return {
                ...state,
                board: action.payload
            }
        case SET_BOARD_VALUES:
            return {
                ...state,
                boardValues: [...state.boardValues, [action.payload[0], action.payload[1]]]
            }
        case CREATE_WIN_CONDITIONS:
            return {
                ...state,
                winConditions: action.payload
            }
        case SET_WINNER:
            return {
                ...state,
                winner: action.payload,
                winnerMessage: `${action.payload} Wins!`
            }
        case RESET_GAME:
            return (window.location.reload(true))
        default:
            return state;
    }
}