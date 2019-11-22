import React, {Component} from 'react';
import InputRow from '../InputRow/InputRow';

class Game extends Component {
    constructor(props) {
        super(props);

        this.words = ["panel", "rower", "taśma"];
        this.chosenWord = this.words[Math.floor(Math.random() * this.words.length)];
    }

    render() {
        return (
            <>
                <h1>{this.chosenWord}</h1>
                <InputRow word={this.chosenWord} rowNumber="one" />
                <InputRow word={this.chosenWord} rowNumber="two" />
                <InputRow word={this.chosenWord} rowNumber="three" />
                <InputRow word={this.chosenWord} rowNumber="four" />
                <InputRow word={this.chosenWord} rowNumber="five" />
            </>
        );
    }
}

export default Game;