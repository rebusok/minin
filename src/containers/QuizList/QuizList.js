import React, {Component} from 'react';
import style from './QuizList.module.scss'
import {NavLink} from "react-router-dom";

import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizes} from "../../redux/store/actions/Quiz";


class QuizList extends Component {


    renderQuizes() {
        return this.props.quizes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

     componentDidMount() {
        this.props.fetchQuizes();

    }

    render() {
        return (
            <div className={style.QuizList}>
                <div>
                    <h1>
                        Список тестов
                    </h1>
                    {this.props.loading && this.props.quizes.length !== 0
                        ? <Loader/>
                        : <ul>
                            {this.renderQuizes()}
                        </ul>
                    }

                </div>
            </div>
        );
    }
}

const mapStateToProps =  (state)=>{
    return{
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizList);