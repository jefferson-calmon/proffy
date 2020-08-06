import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputItem extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    label: string;
}

const Input: React.FC<InputItem> = ({label, name, ...rest}) => {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>

            <input type='text' id={name} {...rest} />
        </div>
    )
}

export default Input;