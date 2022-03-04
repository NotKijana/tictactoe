import React, { useContext, useEffect } from 'react';
import GameContext from '../context/game/GameContext';
import Reset from './Reset';

const Winner = () => {
    const gameContext = useContext(GameContext);
    const { winner,boardValues, winnerMessage, check4Winner, winConditions } = gameContext;

    useEffect(() => {
        if(boardValues.length >= 3) {
            check4Winner(winConditions.length);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boardValues]);
    
    return (
        <section className={(winner ? 'winScreen': 'hidden')}> 
            <div className='winScreen_container'>
                <h2 className='winScreen_header'>{ winnerMessage }</h2>
                <Reset icon='Play Again'/>
            </div>
        </section>
    )
}

export default Winner

