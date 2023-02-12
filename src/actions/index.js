
export const onSelectWindow = function(idWindow) {
    return {type: 'SELECT_WINDOW', payload: {idWindow}}
}

export const onChangeTheme = function() {
    return {type: 'CHANGE_THEME'}
}

export const onEditCreateResult = function(resultItem) {
    return {type: 'EDIT_CREATE_RESULT', payload: {resultItem}}
}

export const onCreateNewResult = function(resultItem) {
    return {type: 'CREATE_NEW_RESULT', payload: {resultItem}}
}

export const onSetTheme = function(theme) {
    return {type: 'SET_THEME', payload: {theme}}
}

export const onSetListOfResults = function(listOfResults) {
    return {type: 'SET_LIST_RESULTS', payload: {listOfResults}}
}

export const onSetCreateResult = function(createResult) {
    return {type: 'SET_CREATE_RESULT', payload: {createResult}}
}