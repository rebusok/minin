import React, {Component} from 'react';
import s from './Layout.module.scss';
import MenuToggle from '../../components/navigation/componentMenuToggle/MenuToggle';
import Drover  from '../../components/navigation/drover/Drover'


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


export default Layout;