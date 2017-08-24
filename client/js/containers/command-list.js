import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectCommand} from '../actions/index'

class CommandList extends Component {

    renderList() {
        return this.props.commands.map((command) => {
            if (command.id === 1) {
                return null;
            }
            return (
                <li
                    key={command.id}
                    onClick={() => this.props.selectCommand(command)}
                >
                    {command.name}
                </li>
            );
        });
    }

    render() {
        return (
            <ul className="dropdown-menu">
                {this.renderList()}
            </ul>
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

export default connect(mapStateToProps, matchDispatchToProps)(CommandList);
