import React, {Component} from 'react';
import style from './Auth.module.scss'
import Button from "../../components/Button/button";
import Input from "../../components/UI/Input/Input";

class Auth extends Component {
    loginHandler = () => {

    }
    registHandler = () => {

    }
    submitHandler = (e) => {
        e.preventDefault()
    }
    render() {
        return (
            <div className={style.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={style.AuthForm}>
                        <Input
                            label={'Email'}
                        />
                        <Input
                            label={'Пароль'}
                        />
                        <Button
                            type='success'
                            onClick={this.loginHandler}
                        >
                            Войти
                        </Button>
                        <Button
                            type='primary'
                            onClick={this.registHandler}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Auth;