import React from 'react';
import s from './active-quiz.module.scss';
import AnswersList from './AnswersList/AnswersList';


const ActiveQuiz = (props) => {
    return (
        <div className={s.ActiveQuiz}>
            <p className={s.Question}>
                <span>
                    <strong>{props.answerNumber}. </strong>
                    {props.question}
                </span>
                <small>{props.answerNumber} из {props.quizLength}</small>
            </p>

            <AnswersList
                answers={props.answers}
                onAnserClick={props.onAnserClick}
                state={props.state}
            />
        </div>
    )
}

export default ActiveQuiz;