
import React from 'react';
import s from './FinishedQuiz.module.scss';
import Button from '../Button/button';
import {Link} from "react-router-dom";


const FinishedQuiz = (props) => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success'){
            total++
        }
        return total
    }, 0)
    console.log(props.quiz.length)
    return (
        <div className={s.FinishedQuiz}>
            <ul>

                {props.quiz.map((quizItem, ind) => {
                   
                    const sls = [
                        "fa",
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        s[props.results[quizItem.id]]
                    ]

                    return (
                        <li key={ind}>
                            <strong>{ind +1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={sls.join(" ")}/>
                        </li>
                    )
                })}

                
            </ul>

            <p>Правильно {successCount} из  {props.quiz.length}</p>
            <div>
                <Button onClick={props.onRentry}
                        disabled={false}
                        type={'primary'}>Повторить</Button>
                <Link to={'/'}>
                    <Button
                        disabled={false}
                        type={'success'}>Перейти в список тестов</Button>
                </Link>

            </div>
        </div>
    )
}


export default FinishedQuiz;