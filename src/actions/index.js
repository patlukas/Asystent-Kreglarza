
export const onSelectWindow = function(idWindow) {
    return {
        type: 'SELECT_WINDOW',
        payload: {idWindow}
    }
}

export const onChangeTheme = function() {
    return {
        type: 'CHANGE_THEME'
    }
}