import React, {Component} from 'react';
import style from './Auth.module.scss'
import Button from "../../components/Button/button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js';
import {connect} from "react-redux";
import {auth} from "../../redux/store/actions/auth";
class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'emil',
                label: 'Email',
                errorMes: 'Введите корректный Email',
                validFalse: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMes: 'Введите корректный Пароль',
                validFalse: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler =  () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
    }
    registHandler =  () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
    }

    submitHandler = (e) => {
        e.preventDefault()
    }
    validedControl(value, validation) {
        if(!validation){
            return true
        }
        let isValid = true
        if(validation.required){
            isValid = value.trim() !== '' && isValid
        }
        if(validation.email){
            isValid = is.email(value) && isValid
        }
        if(validation.minLength){
            isValid  = value.length >= validation.minLength && isValid
        }
        return isValid
    }
    onChangeHandler = (e, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.value = e.target.value
        control.touched = true
        control.valid = this.validedControl(control.value, control.validation)
        formControls[controlName]= control

        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })
        this.setState({
            formControls, isFormValid
        })
    }
    renderInputs(){
       return Object.keys(this.state.formControls).map((controlName, inx) => {
           const control  = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + inx}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMes={control.errorMes}
                    shouldValidate={!!control.validation}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })

    }
    render() {
        return (
            <div className={style.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={style.AuthForm}>
                        {this.renderInputs()}
                        <Button
                            type='success'
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>
                        <Button
                            type='primary'
                            onClick={this.registHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}
export default connect(null, mapDispatchToProps)(Auth) ;