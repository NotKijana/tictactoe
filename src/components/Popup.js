import React, { useContext, useState } from "react";
import GameContext from "../context/game/GameContext";
import iconX from '../assets/icon-X.svg';
import icon0 from '../assets/icon-O.svg';

const Popup = () => {
    const gameContext = useContext(GameContext);
    const [error, setError] = useState(false);

    const { setPlayers, setBoard, playerOne, 
    board, setGameStart, isGameStart } = gameContext;

    const checkInputs = () => {
        if((playerOne === 'X' || playerOne === 'O') && 
        board.length >= 9) {
            setGameStart(true)
        } else {
            setError(true)
            return
        }
    }
    const handleClick = event => {
        const playerChoice = event.target.value;
        setPlayers(playerChoice);
    }
    const handleChange = event => {
        const boardSize = event.target.value;
        setBoard(boardSize);
    }
    return (
        <div className={"popup " + (isGameStart && 'hidden')}>
            <form>
                <h3 className="popup_header">Player One X's or O's?</h3>
                <div>
                    <input type="radio" name="playerOneChoice" id="input_X" 
                    value='X' className="hidden" onClick={e => handleClick(e)} />
                    <label className="popup_icon" htmlFor="input_X">
                        <img src={iconX}  alt='Player X Icon'/>
                    </label>                

                    <input type="radio" name="playerOneChoice" id="input_O" 
                    value='O' className="hidden" onClick={e => handleClick(e)} />
                    <label className="popup_icon o" htmlFor="input_O">
                        <img src={icon0}  alt='Player O Icon'/>    
                    </label>      
                </div>         

                <div className="popup_box" >
                    <label htmlFor="input_board">Enter grid width: {' '}</label>
                    <input type="number" name="boardDimensions" id="input_board" 
                    className="popup_textBox" placeholder="Minimum: 3"
                    min='3' onChange={e => handleChange(e)}/>
                </div>

                <button type="button" className="button" onClick={() => checkInputs()}>
                    Start Game
                </button>

                {error && <p className="reminder">Please select all options</p>}
            </form>
        </div>
    )
}

export default Popup