import React from 'react';
import s from './BackDrop.module.scss';



const BackDrop = (props) => {
    return (
        <div className={s.BackDrop} onClick={props.onClick}></div>
    )
}


export default BackDrop;