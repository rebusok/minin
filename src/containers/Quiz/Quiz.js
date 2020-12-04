import React, {Component} from 'react';
import s from './Quiz.module.scss';
import ActiveQuiz from '../../components/active-quiz/active-quiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
class Quiz extends Component {

    state = {
        results: {},
        isFinished: false,
        activeQuistion: 0,
        answerState: null,
        quiz: [
            {
                question: 'Какого цвета слон?',
                rightAnswerId: 3,
                id: 1,
                answers: [
                    {text: 'Черный', id:1},
                    {text: 'Синий', id:2},
                    {text: 'Серый', id:3},
                    {text: 'Зеленый', id:4}
                ]
            },
            {
                question: 'Какого цвета небо',
                rightAnswerId: 2,
                id: 2,
                answers: [
                    {text: 'Черный', id:1},
                    {text: 'Синий', id:2},
                    {text: 'Серый', id:3},
                    {text: 'Зеленый', id:4}
                ]
            }
        ],

    }
    

    onAsnwerClickHandler = (anserId) => {

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key] === 'success'){
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuistion]
        const results = this.state.results;
        
        if(question.rightAnswerId === anserId){
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState:{[anserId]: 'success'},
                results
            })
            
            const timeout = window.setTimeout(() => {
                if(this.isQuizFinished()){
                    this.setState({
                        isFinished: true
                    })
                }else{
                    this.setState({
                        activeQuistion: this.state.activeQuistion + 1,
                        answerState: null
                    })
                }


                window.clearTimeout(timeout)
            }, 1000)
            
        }else {
            results[question.id] = 'error'
            this.setState({
                answerState:{[anserId]: 'error'},
                results
            })
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
    componentDidMount() {
        console.log('Quiz id = ', this.props.match.params.id)
    }

    render(){
        return (
            <div className={s.Quiz}>
                
                <div className={s.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished
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