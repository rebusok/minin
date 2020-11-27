import React, {Component} from 'react';
import s from './Drover.module.scss';
import BackDrop from '../../UI/BackDrop/BackDrop';
const links = [
    1, 2, 3
]

class Drover extends Component {


    renderLinks() {
        return links.map((link, inx) => {
            return (
                <li key={inx}>
                    <a> Link {link}</a>
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