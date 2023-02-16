export const onCheckResultIsComplete = (result, listOfGameTypes) => {
    const {gameType, date, leagueData, lanes, where, results} = result
    const {numberOfLanesInForm} = lanes
    const {team, inHome, enemyTeam, player} = leagueData
    const objGameType = getGameTypeObject(listOfGameTypes, gameType.id)
    if(gameType.id == -1) return [false, 'Nie wybrano: "Rodzaj gry"']
    if(date == -1) return [false, 'Nie wybrano daty']
    if(objGameType === false) return [false, 'Wybrany "Rodzaj gry" nie istnieje']
    if(gameType.isLeague) {
        if(team.teamPoints.length != 2 || team.teamPoints[0] + team.teamPoints[1] != objGameType.details.sumTeamPoints) return [false, 'Nie wybrano: "Punkty drużynowe"']
        if(team.setPoints.length != 2 || team.setPoints[0] + team.setPoints[1] != objGameType.details.sumSetPoints) return [false, 'Nie wybrano: "Punkty setowe"']
        if(inHome == -1) return [false, 'Nie wybrano: "Mecz odbył się"']
        if(team.sum == -1) return [false, 'Nie uzupełniono: "Suma drużyny"']
    }
    if(where.length != 2) return [false, 'Nie wybrano: "Gdzie"']
    if(where[0] == -1 && where[1] === "") return [false, 'Nie uzupełniono: "Nazwa miejsca"']
    if(gameType.isLeague) {
        if(enemyTeam.length != 2) return [false, 'Nie wybrano: "Z kim"']
        if(enemyTeam[0] == -1 && enemyTeam[1] === "") return [false, 'Nie uzupełniono: "Nazwa rywala"']
    }
    if(gameType.keyHowManyLanes == -1) return [false, 'Nie wybrano: "Ile torów"']
    if(player.canWinDuel && player.teamPoints == -1) return [false, 'Nie wybrano: "Wynik pojedynku"']
    
    for(let i=1; i<=numberOfLanesInForm; i++) {
        if(results.pelne[i] === null) return [false, 'Nie uzupełniono "Pełne" na torze numer '+i]
        if(results.zbierane[i] === null) return [false, 'Nie uzupełniono "Zbierane" na torze numer '+i]
        if(results.dziury[i] === null) return [false, 'Nie uzupełniono "Dziury" na torze numer '+i]
        if(results.suma[i] === null) return [false, 'Nie uzupełniono "Suma" na torze numer '+i]
        if(gameType.isLeague && player.setPoints[i] === null) return [false, 'Nie uzupełniono "PS" na torze numer '+i]
    }
    if(results.pelne[0] === null) return [false, 'Nie uzupełniono "Pełne" w końcowym wyniku']
    if(results.zbierane[0] === null) return [false, 'Nie uzupełniono "Zbierane" w końcowym wyniku']
    if(results.dziury[0] === null) return [false, 'Nie uzupełniono "Dziury" w końcowym wyniku']
    if(results.suma[0] === null) return [false, 'Nie uzupełniono "Suma" w końcowym wyniku']
    if(gameType.isLeague && player.setPoints[0] === null) return [false, 'Nie uzupełniono "PS" w końcowym wyniku']
    return [true, ""]
}

export const onPrepareResultsToSave = (result) => {
    const length = result.lanes.numberOfLanesInForm
    if(!result.gameType.isLeague) {
        result.leagueData.team = {sum: -1, teamPoints: [], setPoints: []}
        result.leagueData.enemyTeam = []
        result.leagueData.inHome = -1
        let setPoints = []
        for(let i=0; i<= result.lanes.numberOfLanesInForm; i++) setPoints.push(null)
        result.leagueData.player.setPoints = setPoints 
    }
    if(!result.leagueData.player.canWinDuel) result.leagueData.player.teamPoints = -1
    result.results.pelne = changeSizeArray(result.results.pelne, length+1)
    result.results.zbierane = changeSizeArray(result.results.zbierane, length+1)
    result.results.dziury = changeSizeArray(result.results.dziury, length+1)
    result.results.suma = changeSizeArray(result.results.suma, length+1)
    result.leagueData.player.setPoints = changeSizeArray(result.leagueData.player.setPoints, length+1)
    return result
}

const getGameTypeObject = (listOfGameTypes, id) => {
    for(const element of listOfGameTypes) {
        if(element.id == id) return element;
    }
    return false;
}

const changeSizeArray = (oldArray, newSize) => {
    let newArray = []
    for(let i=0; i<newSize; i++) newArray.push(oldArray[i])
    return newArray
}