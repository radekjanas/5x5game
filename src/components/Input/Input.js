import React from 'react';

function Input(props) {
    return (
        <input className={props.className} type="text" maxLength="1" onChange={props.onChange} />
    );
}

export default Input;