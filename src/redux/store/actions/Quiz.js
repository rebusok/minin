import axios from '../../../axios/axios-quiz'
import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCES,
    FETCH_QUIZ_SUCCES,
    QUIZ_SET_STATE,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_RENTRY} from './actionType';
export  const fetchQuizes = () => {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('quizes.json')
            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест № ${index + 1}`
                })
            })
           dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}
export const fetchQuizById = (quizId) => {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`quizes/${quizId}.json`)
            const quiz = response.data;
            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}
export const quizSetState = (answerState, results) => {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}
export const QuizNextQuestion = (questionNumber) => {
    return {
        type: QUIZ_NEXT_QUESTION,
        questionNumber
    }
}
export const quizAnswerClick = (answerId) => {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }
        const question = state.quiz[state.activeQuistion]
        const results = state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(quizSetState({[answerId]: 'success'}, results))

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                } else {

                    dispatch(QuizNextQuestion(state.activeQuistion + 1))
                }


                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({[answerId]: 'error'}, results))
            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                } else {
                    dispatch(QuizNextQuestion(state.activeQuistion + 1))
                }


                window.clearTimeout(timeout)
            }, 1000)
        }
    }
}
export const rentryQuiz = ()=> {
    return {
        type: QUIZ_RENTRY
    }
}

export const isQuizFinished = (state) => {
    return state.activeQuistion + 1 === state.quiz.length
}
export const fetchQuizesStart = () => {
    return {
        type:FETCH_QUIZES_START
    }
}
export const fetchQuizesSuccess = (quizes) => {
    return {
        type:FETCH_QUIZES_SUCCES,
        quizes
    }
}
export const fetchQuizesError = (e) => {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}
export const fetchQuizSuccess = (quiz) => {
    return {
        type: FETCH_QUIZ_SUCCES,
        quiz
    }
}
export const finishQuiz = () => {
    return {
        type:FINISH_QUIZ
    }
}
