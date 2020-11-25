import React from 'react';
import s from './AnswersList.module.scss';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = (props) => {


    return (
        <ul className={s.AnswersList}>
            {
                props.answers.map((answer, inx) => {
                    return(
                        <AnswerItem
                            answer={answer}
                            key={inx}
                            onAnserClick={props.onAnserClick}
                            state={props.state ? props.state[answer.id] : null}
                         />
                    ) 
                })
            }
        </ul>
    )
}


export default AnswersList;