
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

export const onEditCreateResult = function(resultItem) {
    return {
        type: 'EDIT_CREATE_RESULT',
        payload: {resultItem}
    }
}

export const onCreateNewResult = function(resultItem) {
    return {
        type: 'CREATE_NEW_RESULT',
        payload: {resultItem}
    }
}