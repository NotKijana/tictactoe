import React from "react";
import GameState from "../context/game/GameState";
import Popup from "./Popup";
import GameHeader from "./GameHeader";
import Board from "./Board";
import '../styles/App.scss';
import Winner from "./Winner";

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