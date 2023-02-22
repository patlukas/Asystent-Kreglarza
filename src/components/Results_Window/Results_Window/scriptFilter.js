export const filterListOfResults = (listOfResults, filter) => {
    listOfResults = filter_gameTypes(listOfResults, filter.gameTypes)
    return listOfResults
}

const filter_gameTypes = (listOfResults, filterGameTypes) => {
    let allowedId = []
    filterGameTypes.forEach((el) => {
        if(el.value) allowedId.push(...el.listId)
    })
    listOfResultsAfterFilter = []
    listOfResults.forEach(el => {
        if(allowedId.includes(el.gameType.id)) listOfResultsAfterFilter.push(el)
    })
    return listOfResultsAfterFilter
}
