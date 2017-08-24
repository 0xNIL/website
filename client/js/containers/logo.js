import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectCommand} from '../actions/index'
import CommandsReducer from '../reducers/reducer-commands';

class Logo extends Component {

    render() {
        return (
            <a className="navbar-brand"
               onClick={() => this.props.selectCommand(CommandsReducer()[0])}
            >
            </a>
        );
    }

}

function mapStateToProps(state) {
    return {
        commands: state.commands
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({selectCommand}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Logo);
