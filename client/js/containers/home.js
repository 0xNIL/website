import React, {Component} from 'react';
import {connect} from 'react-redux';

class Home extends Component {
    render() {

        return (
            <div><h3>Select a command from the menu, please.</h3></div>
        );
    }
}

function mapStateToProps(state) {
    return {
        command: state.activeCommand
    };
}

export default connect(mapStateToProps)(Home);
