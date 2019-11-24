import React from 'react';

function Input(props) {
    return (
        <input className={props.className} type="text" maxLength="1" onChange={props.onChange} onKeyDown={props.onKeyDown} />
    );
}

export default Input;