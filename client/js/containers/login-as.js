import React, {Component} from 'react';
import {connect} from 'react-redux';

class LoginAs extends Component {
    render() {

        if (!this.props.command) {
            return null;
        }

        return (
            <div>
                <h2>{this.props.command.name}</h2>
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">@</span>
                    <input type="text" className="form-control" placeholder="nsid" aria-describedby="basic-addon1"/>
                    <span className="input-group-btn">
                        <button className="btn btn-success" type="button">Go!</button>
                    </span>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        command: state.activeCommand
    };
}

export default connect(mapStateToProps)(LoginAs);
