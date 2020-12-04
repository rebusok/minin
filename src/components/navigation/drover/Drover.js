import React, {Component} from 'react';
import s from './Drover.module.scss';
import BackDrop from '../../UI/BackDrop/BackDrop';
import {NavLink} from "react-router-dom";

const links = [
    {to: '/', label: 'Список', exact:true},
    {to: '/auth', label: 'Авторизация', exact:false},
    {to: '/quiz-creator', label: 'Создать тест', exact:false}
]

class Drover extends Component {
    clickHandler = () => {
        this.props.onClose();
    }

    renderLinks() {
        return links.map((link, inx) => {
            return (
                <li key={inx}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={s.active}
                        onClick={this.clickHandler}> {link.label}</NavLink>
                </li>
            )
        })
    }
    render(){

        const cls = [
            s.Drover
        ]
        if (!this.props.isOpen){
            cls.push(s.close)
        }
        
        return(
            <React.Fragment >
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop onClick={this.props.onClose}/> : null}                
            </React.Fragment>
        )
    }
}

export default Drover;