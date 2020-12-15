import React, {Component} from 'react';
import s from './Quiz.module.scss';
import ActiveQuiz from '../../components/active-quiz/active-quiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {

    state = {
        results: {},
        isFinished: false,
        activeQuistion: 0,
        answerState: null,
        quiz: [],
        loading: true

    }


    onAsnwerClickHandler = (anserId) => {

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuistion]
        const results = this.state.results;

        if (question.rightAnswerId === anserId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[anserId]: 'success'},
                results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuistion: this.state.activeQuistion + 1,
                        answerState: null
                    })
                }


                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[anserId]: 'error'},

                results
            })
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuistion: this.state.activeQuistion + 1,
                        answerState: null
                    })
                }


                window.clearTimeout(timeout)
            }, 1000)
        }

    }

    isQuizFinished() {
        return this.state.activeQuistion + 1 === this.state.quiz.length
    }

    rentryHandler = () => {
        this.setState({
            activeQuistion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`quizes/${this.props.match.params.id}.json`)
            const quiz = response.data;
            this.setState({
                quiz,
                loading: false
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={s.Quiz}>

                <div className={s.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.loading
                            ? <Loader/>

                            : this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRentry={this.rentryHandler}
                            />
                            : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuistion].answers}
                                question={this.state.quiz[this.state.activeQuistion].question}
                                onAnserClick={this.onAsnwerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuistion + 1}
                                state={this.state.answerState}
                            />

                    }

                </div>
            </div>
        )
    }
}


export default Quiz;