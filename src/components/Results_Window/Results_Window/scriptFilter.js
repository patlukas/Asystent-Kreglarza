export const filterListOfResults = (listOfResults, filter) => {
    listOfResults = filter_gameTypes(listOfResults, filter.gameTypes)
    listOfResults = filter_where(listOfResults, filter.whereIndex)
    listOfResults = filter_enemy(listOfResults, filter.enemyIndex)
    listOfResults = filter_fullGame(listOfResults, filter.fullGame)
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

const filter_where = (listOfResults, filterWhere) => {
    if(filterWhere == 0) return listOfResults
    listOfResultsAfterFilter = []
    listOfResults.forEach(el => {
        if(el.where[0] == filterWhere) listOfResultsAfterFilter.push(el)
    })
    return listOfResultsAfterFilter
}

const filter_enemy = (listOfResults, filterEnemy) => {
    if(filterEnemy == 0) return listOfResults
    listOfResultsAfterFilter = []
    listOfResults.forEach(el => {
        if(el.leagueData.enemyTeam.length == 2 && el.leagueData.enemyTeam[0] == filterEnemy) {
            listOfResultsAfterFilter.push(el)
        }
    })
    return listOfResultsAfterFilter
}

const filter_fullGame = (listOfResults, filterFullGame) => {
    if(!filterFullGame) return listOfResults
    listOfResultsAfterFilter = []
    listOfResults.forEach(el => {
        if(el.lanes.numberOfThrowsInLane[0] == 15 
            && el.lanes.numberOfThrowsInLane[1] == 15 
            && el.lanes.numberOfLanes == 4) {
                listOfResultsAfterFilter.push(el)
        }
    })
    return listOfResultsAfterFilter
}
