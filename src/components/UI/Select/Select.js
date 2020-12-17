import React from 'react';
import style from './Select.module.scss'


const Select = (props) => {
    const htmlfor = `${props.label} -- ${Math.random()}`

    return (
        <div className={style.Select}>
            <label htmlFor={htmlfor}>{props.label}</label>
            <select
                id={htmlfor}
                value={props.value}
                onChange={props.onChange}>
                { props.options.map((optin, inx) => {
                    return (
                        <option
                            key={optin.value + inx}
                            value={optin.value}>
                            {optin.text}
                        </option>
                    )
                })}
            </select>
        </div>
    );
};

export default Select;