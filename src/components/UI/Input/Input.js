import React from 'react';
import style from './Input.module.scss'


const isInvalid = ({valid, touched, shouldValidate}) => {
    return !valid && shouldValidate && touched
}


const Input = (props) => {

    const inputType = props.type || 'text'
    const cls = [
        style.Input
    ]
    const htmlFor = `${inputType} ${Math.random()}`
    if(isInvalid(props)){
        cls.push(style.invalid)
    }
    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'Введите верное значение'}</span>
                    : null
            }

        </div>
    );
};

export default Input;