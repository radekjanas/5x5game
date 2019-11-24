import React, {Component} from 'react';
import InputRow from '../InputRow/InputRow';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            success: false,
            properLetters: []
        }

        this.words = ["panel", "rower", "taśma"];
        this.chosenWord = this.words[Math.floor(Math.random() * this.words.length)];

        this.gameWon = this.gameWon.bind(this);
        this.getProperLetters = this.getProperLetters.bind(this);
    }

    componentDidMount() {
        document.querySelector('.one .first').focus();
        document.querySelector('.one').classList.add('active');
    }

    gameWon() {
        this.setState({
            success: true
        })
    }

    getProperLetters(lettersArray) {
        this.setState({
            properLetters: lettersArray
        })
    }

    render() {
        return (
            <>
                <h1>{this.chosenWord}</h1>
                <InputRow word={this.chosenWord} rowNumber="one" gameWon={this.gameWon} getProperLetters={this.getProperLetters} properLetters={this.state.properLetters} />
                <InputRow word={this.chosenWord} rowNumber="two" gameWon={this.gameWon} getProperLetters={this.getProperLetters} properLetters={this.state.properLetters} />
                <InputRow word={this.chosenWord} rowNumber="three" gameWon={this.gameWon} getProperLetters={this.getProperLetters} properLetters={this.state.properLetters} />
                <InputRow word={this.chosenWord} rowNumber="four" gameWon={this.gameWon} getProperLetters={this.getProperLetters} properLetters={this.state.properLetters} />
                <InputRow word={this.chosenWord} rowNumber="five" gameWon={this.gameWon} getProperLetters={this.getProperLetters} properLetters={this.state.properLetters} />
            </>
        );
    }
}

export default Game;