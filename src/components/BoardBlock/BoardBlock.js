import React, { Component } from 'react';

/*
* Block is empty on init
* Block gets value and icon based on player who clicks it
* Class is used in lew of reference (ref) to bind individual block
*/
export default class BoardBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            icon: ''
        }
        this.handleClick = this.handleClick.bind(this)
    }

    
    // Button Functions
    handleClick(e) {
        // Checks for existing value in btn
        if(e.target.value !== '') {
            return
        }
        // Sets states based on player turn
        if(this.props.isPlayerOneTurn) {
            this.setState({icon: <img src={require(`../../assets/icon-${this.props.playerOne}.svg`)}  alt='Player Icon'/>})
            this.props.setBoardValue(this.props.index, this.props.playerOne)
            this.setState({value: this.props.playerOne})
        } else {
            this.setState({icon: <img src={require(`../../assets/icon-${this.props.playerTwo}.svg`)}  alt='Player Icon'/>})
            this.props.setBoardValue(this.props.index, this.props.playerTwo)
            this.setState({value: this.props.playerTwo})
        }
        // Checks for winner and changes turn
        this.props.check4Winner();
        this.props.setPlayerTurn();
    }

    render() {
    return (
        <button 
            className='block' value={ this.state.value }
            id={`input_${this.props.index}`} onClick={(e) => this.handleClick(e)}
            disabled={ this.props.winner && true }
        >
            { this.state.icon }
        </button>
    )}
}
