import {combineReducers} from 'redux';
import CommandsReducer from './reducer-commands';
import ActiveCommandReducer from './reducer-active-command';

const allReducers = combineReducers({
    commands: CommandsReducer,
    activeCommand: ActiveCommandReducer
});

export default allReducers
