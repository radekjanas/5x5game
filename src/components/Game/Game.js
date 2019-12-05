import React, {Component} from 'react';
import InputRow from '../InputRow/InputRow';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            victory: false,
            properLetters: [],
            activeRow: 1
        }

        this.words = ["panel", "rower", "taśma"];
        this.chosenWord = this.words[Math.floor(Math.random() * this.words.length)];

        this.victory = this.victory.bind(this);
        this.setProperLetters = this.setProperLetters.bind(this);
        this.activateRow = this.activateRow.bind(this);
    }

    activateRow(rowNr) {
        this.setState({
            activeRow: rowNr
        });
    }

    victory() {
        this.setState({
            victory: true
        });
        alert('You win');
    }

    setProperLetters(lettersArray) {
        this.setState({
            properLetters: lettersArray
        });
    }

    render() {
        //console.log(this.state);
        return (
            <>
                <h1>{this.chosenWord}</h1>
                <InputRow activeRow={this.state.activeRow} activateRow={this.activateRow}  word={this.chosenWord} rowNumber="one" victory={this.victory} setProperLetters={this.setProperLetters} properLetters={this.state.properLetters} emptyInputs={this.state.emptyInputs} />
                {this.state.activeRow >= 2 && <InputRow activeRow={this.state.activeRow} activateRow={this.activateRow} word={this.chosenWord} rowNumber="two" victory={this.victory} setProperLetters={this.setProperLetters} properLetters={this.state.properLetters} emptyInputs={this.state.emptyInputs} />}
                {this.state.activeRow >= 3 && <InputRow activeRow={this.state.activeRow} activateRow={this.activateRow} word={this.chosenWord} rowNumber="three" victory={this.victory} setProperLetters={this.setProperLetters} properLetters={this.state.properLetters} emptyInputs={this.state.emptyInputs} />}
                {this.state.activeRow >= 4 && <InputRow activeRow={this.state.activeRow} activateRow={this.activateRow} word={this.chosenWord} rowNumber="four" victory={this.victory} setProperLetters={this.setProperLetters} properLetters={this.state.properLetters} emptyInputs={this.state.emptyInputs} />}
                {this.state.activeRow >= 5 && <InputRow activeRow={this.state.activeRow} activateRow={this.activateRow} word={this.chosenWord} rowNumber="five" victory={this.victory} setProperLetters={this.setProperLetters} properLetters={this.state.properLetters} emptyInputs={this.state.emptyInputs} />}
            </>
        );
    }
}

export default Game;