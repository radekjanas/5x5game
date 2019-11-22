import React, {Component} from 'react';
import InputRow from '../InputRow/InputRow';

class Game extends Component {
    constructor(props) {
        super(props);
        this.words = ["panel", "rower", "taśma"];
    }

    render() {
        const chosenWord = this.words[Math.floor(Math.random() * this.words.length)];

        return (
            <>
                <h1>{chosenWord}</h1>
                <InputRow word={chosenWord} />
            </>
        );
    }
}

export default Game;