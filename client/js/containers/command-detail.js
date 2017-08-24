import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginAs from './login-as';
import Home from './home';

class CommandDetails extends Component {

    render() {

        switch (this.props.command.container) {
            case 'home':
                return <Home />
            case 'login-as':
                return <LoginAs />
        }
    }
}

function mapStateToProps(state) {
    return {
        command: state.activeCommand
    };
}

export default connect(mapStateToProps)(CommandDetails);
