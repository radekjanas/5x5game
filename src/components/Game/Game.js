import React, {Component} from 'react';
import InputRow from '../InputRow/InputRow';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            success: false,
            properLetters: [],
            emptyInputs: null,
            activeRow: 1
        }

        this.words = ["panel", "rower", "taśma"];
        this.chosenWord = this.words[Math.floor(Math.random() * this.words.length)];

        this.gameWon = this.gameWon.bind(this);
        this.setProperLetters = this.setProperLetters.bind(this);
        this.setFreeInputs = this.setFreeInputs.bind(this);
        this.activateRow = this.activateRow.bind(this);
    }

    componentDidMount() {
        document.querySelector('.one .first').focus();
        document.querySelector('.one').classList.add('active');
    }

    activateRow(rowNr) {
        this.setState({
            activeRow: rowNr
        })
    }

    gameWon() {
        this.setState({
            success: true
        });
        alert('wygraeś');
    }

    setFreeInputs(empty) {
        this.setState({
            emptyInputs: empty
        });
        return Promise.resolve(empty);
    }

    setProperLetters(lettersArray) {
        this.setState({
            properLetters: lettersArray
        })
    }

    render() {
        //console.log(this.state);
        return (
            <>
                <h1>{this.chosenWord}</h1>
                <InputRow activeRow={this.state.activeRow} activateRow={this.activateRow}  word={this.chosenWord} rowNumber="one" setFreeInputs={this.setFreeInputs} gameWon={this.gameWon} setProperLetters={this.setProperLetters} properLetters={this.state.properLetters} emptyInputs={this.state.emptyInputs} />
                {this.state.activeRow >= 2 && <InputRow activeRow={this.state.activeRow} activateRow={this.activateRow} word={this.chosenWord} rowNumber="two" setFreeInputs={this.setFreeInputs} gameWon={this.gameWon} setProperLetters={this.setProperLetters} properLetters={this.state.properLetters} emptyInputs={this.state.emptyInputs} />}
                {this.state.activeRow >= 3 && <InputRow activeRow={this.state.activeRow} activateRow={this.activateRow} word={this.chosenWord} rowNumber="three" setFreeInputs={this.setFreeInputs} gameWon={this.gameWon} setProperLetters={this.setProperLetters} properLetters={this.state.properLetters} emptyInputs={this.state.emptyInputs} />}
                {this.state.activeRow >= 4 && <InputRow activeRow={this.state.activeRow} activateRow={this.activateRow} word={this.chosenWord} rowNumber="four" setFreeInputs={this.setFreeInputs} gameWon={this.gameWon} setProperLetters={this.setProperLetters} properLetters={this.state.properLetters} emptyInputs={this.state.emptyInputs} />}
                {this.state.activeRow >= 5 && <InputRow activeRow={this.state.activeRow} activateRow={this.activateRow} word={this.chosenWord} rowNumber="five" setFreeInputs={this.setFreeInputs} gameWon={this.gameWon} setProperLetters={this.setProperLetters} properLetters={this.state.properLetters} emptyInputs={this.state.emptyInputs} />}
            </>
        );
    }
}

export default Game;