import React, {Component} from 'react';
import s from './Layout.module.scss';
import MenuToggle from '../../components/navigation/componentMenuToggle/MenuToggle';
import Drover  from '../../components/navigation/drover/Drover'
import {connect} from "react-redux";


class Layout extends Component {
    state = {
        menu: false
    }

    toggleMenuHandler =  () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }
    render(){
        return (
            <div className={s.Layout}>

                <Drover
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
                    isAuthen={this.props.isAuthen}
                    />

                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />


                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthen: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout) ;