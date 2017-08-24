import CommandsReducer from './reducer-commands';

export default function (state = CommandsReducer()[0], action) {
    switch (action.type) {
        case 'COMMAND_SELECTED':
            return action.payload;
            break;
    }
    return state;
}
