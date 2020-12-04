import React, {Component} from 'react';
import style from './QuizList.module.scss'
import {NavLink} from "react-router-dom";


class QuizList extends Component {
    renderQuizes(){
        return [1, 2, 3].map((quiz, inx) => {
            return (
                <li key={inx}>
                    <NavLink to={'/quiz/' + quiz}>
                        Тест {quiz}
                    </NavLink>
                </li>
            )
        })
    }
    render() {
        return (
            <div className={style.QuizList}>
                <div>
                    <h1>
                        Список тестов
                    </h1>
                    <ul>
                        {this.renderQuizes()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default QuizList;