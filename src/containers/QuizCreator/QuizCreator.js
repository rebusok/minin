import React, {Component} from 'react';
import style from './QuizCreator.module.scss'
import Button from "../../components/Button/button";
import {createControl, validate, validateForm} from '../../form/formFraim';
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";

import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../redux/store/actions/Create";

const createOptionControl = (num) => {
    return createControl({
        label: `Вариант ${num}`,
        errorMes: 'Значение не может быть пустым',
        id: num
    }, {required: true})
}
const createFormControls = () => {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMes: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

class QuizCreator extends Component {

    state = {
        rightAnswerId: 3,
        isFormValid: false,
        formControls: createFormControls()
    }

    submitHandler = (e) => {
        e.preventDefault()
    }
    addQuestionHandler = () => {

        const {question, option1, option2, option3, option4} = this.state.formControls
        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }
        this.props.createQuizQuestion(questionItem)

        this.setState({
            rightAnswerId: 3,
            isFormValid: false,
            formControls: createFormControls()
        })
    }
    createQuestionHandler =  (e) => {
        e.preventDefault()

        this.setState({
            rightAnswerId: 3,
            isFormValid: false,
            formControls: createFormControls()
        })
        this.props.finishCreateQuiz()


    }
    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = value
        control.touched = true
        control.valid = validate(control.value, control.validation)
        formControls[controlName] = control


        this.setState({
            formControls, isFormValid: validateForm(formControls)
        })
    }

    renderInputs() {

        return Object.keys(this.state.formControls).map((controlName, inx) => {
            const control = this.state.formControls[controlName]
            return (
                <React.Fragment key={controlName + inx}>
                    <Input

                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        errorMes={control.errorMes}
                        shouldValidate={!!control.validation}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    {inx === 0 ? <hr/> : null}
                </React.Fragment>
            )
        })
    }

    selectChangeHandler = (e) => {
        this.setState({
            rightAnswerId: +e.target.value
        })
    }

    render() {
        const select = <Select
            label={'Выберите правильный ответ'}
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
        return (
            <div className={style.QuizCreator}>
                <div>
                    <h1>Создания Теста</h1>
                    <form onSubmit={this.submitHandler}>

                        {this.renderInputs()}
                        {select}
                        <Button
                            type={'primary'}
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >Добавить вопрос
                        </Button>
                        <Button
                            type={'success'}
                            onClick={this.createQuestionHandler}
                            disabled={this.props.quiz.length === 0}
                        >Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        quiz: state.create.quiz
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);