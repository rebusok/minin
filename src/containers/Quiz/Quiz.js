import React, {Component} from 'react';
import s from './Quiz.module.scss';
import ActiveQuiz from '../../components/active-quiz/active-quiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, rentryQuiz} from "../../redux/store/actions/Quiz";

class Quiz extends Component {

     componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }
    componentWillUnmount() {
         this.props.rentryQuiz()
    }

    render() {
        return (
            <div className={s.Quiz}>

                <div className={s.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.props.loading || !this.props.quiz
                            ? <Loader/>

                            : this.props.isFinished
                            ? <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRentry={this.props.rentryQuiz}
                            />
                            : <ActiveQuiz
                                answers={this.props.quiz[this.props.activeQuistion].answers}
                                question={this.props.quiz[this.props.activeQuistion].question}
                                onAnserClick={this.props.quizAnswerClick}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuistion + 1}
                                state={this.props.answerState}
                            />

                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuistion: state.quiz.activeQuistion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        rentryQuiz: () => dispatch(rentryQuiz())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz);