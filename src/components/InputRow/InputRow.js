import React, {Component} from 'react';
import Input from '../Input/Input';

class InputRow extends Component {
    constructor(props) {
        super(props);
           
        this.state = {
            word: [],
            targetWord: this.props.word,
            progress: []
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
    }

    componentDidMount() {
        document.querySelector('.one .first').focus();
    }

    keyUpHandler(e) {
        return e.target.keyCode;
    }

    changeHandler(e) {
        console.log('dziaa');
        const letter = e.target.value;
        const newWord = this.state.word;

        if (e.keyCode === 8) {
            console.log('dziaa')
            if (e.target.value === '') {
                e.target.previousElementSibling.value = '';
                e.target.previousElementSibling.focus();
            } else {
                e.target.value = '';
                e.target.previousElementSibling.focus();
            }
        } else {
            if (e.target.classList.contains('first')) {
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

            this.setState({
                word: newWord
            });

            if (e.target.nextElementSibling !== null) {
                e.target.nextElementSibling.focus();
            } else {
                const letterArray = [...this.state.targetWord];
                const properLetters = [];
                //console.log(letterArray);

                const allInputs = document.querySelectorAll(`.${this.props.rowNumber} input`);
                //console.log(`allInputs: ${letterArray.toString()}`);
                for (let i = 0; i < allInputs.length; i++) {
                    if (allInputs[i].value === letterArray[i]) {
                        allInputs[i].classList.add('proper');
                        letterArray[i] = '';

                        const properValue = [allInputs[i].className.split(' ')[0], allInputs[i].value];
                        properLetters.push(properValue);

                        this.setState({
                            progress: properLetters
                        });
                    }
                }
                
                const wrongInputs = document.querySelectorAll(`.${this.props.rowNumber} input:not(.proper)`);
                //console.log(wrongInputs);
                //console.log(`wrongInputs: ${letterArray.toString()}`);
                for (let i = 0; i < wrongInputs.length; i++) {
                    if (!letterArray.includes(wrongInputs[i].value)) {
                        wrongInputs[i].classList.add('wrong');
                        //letterArray.splice(letterArray.indexOf(wrongInputs[i].value), 1);
                    }
                }
                //console.log(letterArray);

                const misplacedInputs = document.querySelectorAll(`.${this.props.rowNumber} input:not(.proper):not(.wrong)`);
                //console.log(`misplacedInputs: ${letterArray.toString()}`);
                for (let i = 0; i < misplacedInputs.length; i++) {
                    if (letterArray.includes(misplacedInputs[i].value)) {
                        misplacedInputs[i].classList.add('misplaced');
                        letterArray.splice(letterArray.indexOf(misplacedInputs[i].value), 1);
                    }
                }

                const that = this;
                
                properLetters.forEach(function(el) {
                    //console.log('to jest that: ', that);
                    
                    const properElement = document.querySelector(`.${that.props.rowNumber}`).nextElementSibling.querySelector(`.${el[0]}`);
                    //console.log('proper element: ',properElement)
                    properElement.classList.add('proper');
                    properElement.value = el[1];
                });

                if (document.querySelector(`.${this.props.rowNumber}`).nextElementSibling) {
                    const nextRowInputs = document.querySelector(`.${this.props.rowNumber}`).nextElementSibling.querySelectorAll('input')
                    for (let i = 0; i < nextRowInputs.length; i++) {

                    }
                    //document.querySelector(`.${this.props.rowNumber}`).nextElementSibling.querySelector('.first').focus();
                }
                //const misplacedInputs = document.querySelectorAll(`.${this.props.rowNumber} input:not(.proper)`);  
                //console.log(misplacedInputs);
            }
        }
    }

    render() {
        console.log(this.state);
        return (
            <div className={this.props.rowNumber}>
                <Input className="first" onChange={this.changeHandler} />
                <Input className="second" onChange={this.changeHandler} />
                <Input className="third" onChange={this.changeHandler} />
                <Input className="fourth" onChange={this.changeHandler} />
                <Input className="fifth" onChange={this.changeHandler} />
            </div>
        );
    }
}

export default InputRow;