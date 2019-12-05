import React, {Component} from 'react';
import Input from '../Input/Input';

class InputRow extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            word: [],
            emptyInputs: null,
            letterCounter: 0
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
    }

    componentDidMount() {
        if (this.props.properLetters.length !== 0) {
            this.props.properLetters.forEach(function(el) {        // Loop the array with proper letters in order to add them to this row
                const properElement = this._row.querySelector(`.${el[0]}`);
                properElement.classList.add('proper');
                properElement.value = el[1];
            }.bind(this));
        }

        const emptyInputs = this._row.querySelectorAll('input:not(.proper)');

        this.setState({
            emptyInputs: emptyInputs
        }, () => {
            if (this.state.emptyInputs !== 0) {
                this.state.emptyInputs[this.state.emptyInputs.length - 1].classList.add('final');
                //this.state.emptyInputs[0].removeAttribute('disabled');
                this.state.emptyInputs[0].focus();
            }
        });
    }

    keyDownHandler(e) {
        if (e.keyCode === 8 && this.state.letterCounter > 0) {
            const toDelete = this.state.emptyInputs[this.state.letterCounter - 1];
            toDelete.value = '';
            this.state.emptyInputs[this.state.letterCounter - 1].focus();

            this.setState({     // decrement letterCounter
                letterCounter: this.state.letterCounter - 1
            });
        }
    }

    changeHandler(e) {
        const letter = e.target.value;      // Letter passed to input
        const newWord = this.state.word;    // After event onChange get from state actual typed-letters array

        if (e.target.classList.contains('first')) {     // Changing letters in actual word array
            newWord[0] = letter
        } else if (e.target.classList.contains('second')) {
            newWord[1] = letter
        } else if (e.target.classList.contains('third')) {
            newWord[2] = letter
        } else if (e.target.classList.contains('fourth')) {
            newWord[3] = letter
        } else if (e.target.classList.contains('fifth')) {
            newWord[4] = letter
        }

        e.persist();
        this.setState({     // Updating typed word array with new letter after onChange (that's why newWord = this.state.word -> few lines above)
            word: newWord,
            letterCounter: this.state.letterCounter + 1
        }, () => {

            if (!e.target.classList.contains('final')) {     // If this is not last input in row, skip to next
                this.state.emptyInputs[this.state.letterCounter].focus();
            } else {        // If it's last input in row - check word (the purpose is to get an array with proper letters in order to pass it to next row)
                const lettersToFind = [...this.props.word];   // This array contains letters which need to be found
                const properLetters = [];       // Array of arrays - each has pair of input class and value

                const allInputs = this._row.querySelectorAll('input');      // Get all inputs in actual row
                for (let i = 0; i < allInputs.length; i++) {
                    if (allInputs[i].value === lettersToFind[i]) {        //If letter value and position is the same as in target word:
                        allInputs[i].classList.add('proper');       // Input gets class "proper"
                        lettersToFind[i] = '';        // Deleting proper letter from the array with destructured target word (we don't need to seek it anymore). If we don't remove it then second letter in target word is a and we type a in first and second input then letter in first input will be marked as misplaced despite the a set to second input is on right place and we don't seek it anymore

                        const properValue = [allInputs[i].className.split(' ')[0], allInputs[i].value];     // Adding new proper-letter-array and passing it to properLetters array
                        properLetters.push(properValue);

                        this.props.setProperLetters(properLetters);     // Passing proper letters to parent component in order to pass it to next row
                    }
                }

                // Setting component state to "win" when we have 5 proper letters
                if (properLetters.length === 5) {
                    this.props.victory();
                } else {    // "No win" - checking other letters and jumping to next row
                
                    const wrongInputs = this._row.querySelectorAll('input:not(.proper)');
                    for (let i = 0; i < wrongInputs.length; i++) {      // Marking letters in row that are not present in target word
                        if (!lettersToFind.includes(wrongInputs[i].value)) {
                            wrongInputs[i].classList.add('wrong');
                        }
                    }

                    const misplacedInputs = this._row.querySelectorAll('input:not(.proper):not(.wrong)');
                    for (let i = 0; i < misplacedInputs.length; i++) {      // Marking letters in row that are present in target word but are placed in wrong position
                        if (lettersToFind.includes(misplacedInputs[i].value)) {
                            misplacedInputs[i].classList.add('misplaced');
                            lettersToFind.splice(lettersToFind.indexOf(misplacedInputs[i].value), 1);       // Deleting letter from the array with destructured target word (though it is in wrong position, it is found and we don't need to seek it anymore
                        }
                    }

                    const activeRow = this.props.activeRow + 1
                    this.props.activateRow(activeRow);
                }
            }
        });
    }

    render() {
        //console.log(this.state.letterCounter);
        return (
            <div className={this.props.rowNumber} ref={el => this._row = el}>
                <Input className="first" onChange={this.changeHandler} onKeyDown={this.keyDownHandler} />
                <Input className="second" onChange={this.changeHandler} onKeyDown={this.keyDownHandler} />
                <Input className="third" onChange={this.changeHandler} onKeyDown={this.keyDownHandler} />
                <Input className="fourth" onChange={this.changeHandler} onKeyDown={this.keyDownHandler} />
                <Input className="fifth" onChange={this.changeHandler} onKeyDown={this.keyDownHandler} />
            </div>
        );
    }
}

export default InputRow;