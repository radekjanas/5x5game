import React, {Component} from 'react';
import Input from '../Input/Input';

class InputRow extends Component {
    constructor(props) {
        super(props);
           
        this.state = {
            word: [],
            emptyInputs: null
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
    }

    componentDidMount() {
        this._row.querySelector('.fifth').classList.add('final');
    }

    shouldComponentUpdate(nextProps) {
        // If previous sibling of this row is also row and last input is not empty (word has been entered) then update component
        if (this._row.classList.contains('active') && this.props.properLetters !== nextProps.properLetters) {
            console.log(`${this._row.className} will update`);
            return true;
        } else {
            return false;
        }
    }

    componentDidUpdate() {
        console.log(`${this._row.className} updated`)
        // If component got letters from previous row
        if (this.props.properLetters.length !== 0) {
            this.props.properLetters.forEach(function(el) {        // Loop the array with proper letters in order to add them to this row
                const properElement = this._row.querySelector(`.${el[0]}`);
                properElement.classList.add('proper');
                properElement.value = el[1];
            }.bind(this));

            // Add .final class to last input (last input which doesn't have .proper class)
            if (this._row.querySelectorAll('input:not(.proper)').length !== 0) {
                this._row.querySelectorAll('input:not(.proper)')[this._row.querySelectorAll('input:not(.proper)').length - 1].classList.add('final');
            }
        }

        // Get empty inputs
        const empty = this._row.querySelectorAll('input:not(.proper)');
        console.log(empty);
        this.setState({
            emptyInputs: empty
        });

        console.log(this.state);

        //this.state.emptyInputs[0].focus();      // Focus on first free input
    }

    keyDownHandler(e) {
        if (e.keyCode === 8) {
            e.target.previousElementSibling.value = '';
            e.target.previousElementSibling.focus();
        }
    }

    changeHandler(e) {
        const letter = e.target.value;      // Letter passed to input
        const newWord = this.state.word;    // After evert onChange get from state actual typed-letters array

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

        this.setState({     // Updating typed word array with new letter after onChange (that's why newWord = this.state.word -> few lines above)
            word: newWord
        });

        if (!e.target.classList.contains('final')) {     // If this is not last input in row, skip to next
            e.target.nextElementSibling.focus();
        } else {        // If it's last input in row - check word (the purpose is to get an array with proper letters in order to pass it to next row)
            const letterArray = [...this.props.word];
            const properLetters = [];       // Array of arrays - each has pair of input class and value

            const allInputs = this._row.querySelectorAll('input');      // Get all inputs in actual row
            for (let i = 0; i < allInputs.length; i++) {
                if (allInputs[i].value === letterArray[i]) {        //If letter value and position is the same as in target word:
                    allInputs[i].classList.add('proper');       // Input gets class "proper"
                    letterArray[i] = '';        // Deleting proper letter from the array with destructured target word (we don't need to seek it anymore)

                    const properValue = [allInputs[i].className.split(' ')[0], allInputs[i].value];     // Adding new proper-letter-array and passing it to properLetters array
                    properLetters.push(properValue);

                    this.props.getProperLetters(properLetters);     // Passing proper letters to parent component in order to pass it to next row
                }
            }

            // Setting component state to "win"
            if (this.state.word.join('') === this.props.word) {
                this.props.gameWon();
            } else {    // "No win" - checking other letters and jumping to next row
            
                const wrongInputs = this._row.querySelectorAll('input:not(.proper)');
                for (let i = 0; i < wrongInputs.length; i++) {      // Marking letters in row that are not present in target word
                    if (!letterArray.includes(wrongInputs[i].value)) {
                        wrongInputs[i].classList.add('wrong');
                    }
                }

                const misplacedInputs = this._row.querySelectorAll('input:not(.proper):not(.wrong)');
                for (let i = 0; i < misplacedInputs.length; i++) {      // Marking letters in row that are present in target word but are placed in wrong position
                    if (letterArray.includes(misplacedInputs[i].value)) {
                        misplacedInputs[i].classList.add('misplaced');
                        letterArray.splice(letterArray.indexOf(misplacedInputs[i].value), 1);       // Deleting letter from the array with destructured target word (though it is in wrong position, it is found and we don't need to seek it anymore
                    }
                }

                this._row.classList.remove('active');       // This row loses its active class
                this._row.nextElementSibling.classList.add('active');       // Next row gains active class
            }
        }
    }

    render() {
        //console.log(this.state);
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