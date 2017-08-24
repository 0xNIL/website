export const selectCommand = (command) => {
    console.log("You clicked on command: ", command.name);
    return {
        type: 'COMMAND_SELECTED',
        payload: command
    }
};
