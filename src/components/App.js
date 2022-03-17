import React from "react";
import GameState from "../context/game/GameState";
import Popup from "./Popups/Popup";
import GameHeader from "./BoardContainer/GameHeader";
import Board from "./BoardContainer/Board";
import Winner from "./Popups/Winner";
import '../styles/App.scss';

const App = () => {
    return (
        <div className="App">
            <GameState>
                <Winner />
                <Popup />
                <GameHeader />
                <Board />
            </GameState>
        </div>
    )
}

export default App;