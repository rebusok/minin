import React, {Component} from 'react';
import s from './Drover.module.scss';
import BackDrop from '../../UI/BackDrop/BackDrop';
import {NavLink} from "react-router-dom";



class Drover extends Component {
    clickHandler = () => {
        this.props.onClose();
    }

    renderLinks(links) {
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
        const links = [
            {to: '/', label: 'Список', exact:true},


        ]
        if(this.props.isAuthen){
            links.push({to: '/quiz-creator', label: 'Создать тест', exact:false})
            links.push({to: '/logout', label: 'Выйти', exact:false})
        } else {
            links.push({to: '/auth', label: 'Авторизация', exact:false},)
        }
        return(
            <React.Fragment >
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop onClick={this.props.onClose}/> : null}                
            </React.Fragment>
        )
    }
}

export default Drover;