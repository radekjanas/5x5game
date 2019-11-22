import React, {Component} from 'react';
import Input from '../Input/Input';

class InputRow extends Component {
    constructor(props) {
        super(props);                                        
        this.state = {
            word: [],
            targetWord: this.props.word
        };

        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(e) {
        const letter = e.target.value;
        const newWord = this.state.word;
        
        if (e.target.value === '') {
            e.target.previousElementSibling.focus();
        } else {
            if (e.target.classList.contains('first')) {
                newWord[0] = letter
            } else if (e.target.classList.contains('second')) {
                newWord[1] = letter
            } else if (e.target.classList.contains('third')) {
                newWord[2] = letter
            } else if (e.target.classList.contains('fourth')) {
                newWord[3] = letter
            } else if (e.target.classList.contains('fifth')) {
                newWord[4] = letter
            }

            this.setState({
                word: newWord                        
            })

            if (e.target.nextElementSibling !== null) {
                e.target.nextElementSibling.focus();
            }                    
        }
    }

    render() {
        console.log(this.state);
        return (
            <>
                <Input className="first" onChange={this.changeHandler} />
                <Input className="second" onChange={this.changeHandler} />
                <Input className="third" onChange={this.changeHandler} />
                <Input className="fourth" onChange={this.changeHandler} />
                <Input className="fifth" onChange={this.changeHandler} />
            </>
        );
    }
} 

export default InputRow;