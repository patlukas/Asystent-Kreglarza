
export const onSelectWindow = function(idWindow) {
    return {type: 'SELECT_WINDOW', payload: {idWindow}}
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
export const onSaveEditResult = function(resultAfterEdit) {
    return {type: 'SAVE_EDIT_RESULT', payload: {resultAfterEdit}}
}
export const onDeleteResult = function(idDeleteResult) {
    return {type: 'DELETE_RESULT', payload: {idDeleteResult}}
}
export const onSetHomePlace = function(homePlace) {
    return {type: 'SET_HOME_PLACE', payload: {homePlace}}
}
export const onSetTrainingPlace = function(trainingPlace) {
    return {type: 'SET_TRAINING_PLACE', payload: {trainingPlace}}
}
export const onLoadSettings = function(settings) {
    return {type: 'LOAD_SETTINGS', payload: {settings}}
}
export const onSetSortValue = function(sortValue) {
    return {type: 'SET_SORT_VALUE', payload: {sortValue}}
}
export const onLoadResultsFromBackup = function(listOfResults) {
    return {type: 'LOAD_RESULTS_FROM_BACKUP', payload: {listOfResults}}
}
export const onSetFilter = function(filter) {
    return {type: 'SET_FILTER', payload: {filter}}
}