export const onPrepareResultObject = (resultObject, key, value, listWhere, listEnemy, 
                                        homePlace, trainingPlace, listOfGameTypes) => {
    if(key == "comment") {
        if(resultObject.comment != value) {
            resultObject.comment = value;
            return resultObject
        }
    }
    else if(key == "gameType") {
        if(resultObject.gameType.id != value.id) {
            resultObject.gameType.id = value.id;
            resultObject.gameType.name = value.name;
            resultObject.lanes.numberOfThrowsInLane = value.numberOfThrowsInLane
            resultObject.gameType.isLeague = value.isLeague
            if(resultObject.date == -1) {
                resultObject.date = getTodayDate();
                resultObject.season = getSeason(resultObject.date)
            }
            if(resultObject.where.length == 0 && defaultPlaceIsTrainingPlace(listOfGameTypes, value.id)) {
                resultObject.where = trainingPlace
            }
            resultObject = changeGameType_checkLanes(resultObject, listOfGameTypes)
            return resultObject
        }
    }
    else if (key == "date") {
        if(resultObject.date != value) {
            resultObject.date = value;
            resultObject.season = getSeason(value)
            return resultObject
        }
    }
    else if(key == "teamPoints") {
        if(resultObject.leagueData.team.teamPoints.toString() != value.toString()) {
            resultObject.leagueData.team.teamPoints = value;
            return resultObject
        }
    }
    else if(key == "setPoints") {
        if(resultObject.leagueData.team.setPoints.toString() != value.toString()) {
            resultObject.leagueData.team.setPoints = value;
            return resultObject
        }
    }
    else if(key == "inHome") {
        if(resultObject.leagueData.inHome != value) {
            resultObject.leagueData.inHome = value;
            if(value == 1) {
                if(resultObject.where.length == 0 && defaultPlaceIsHomePlace(listOfGameTypes, resultObject.gameType.id)) {
                    resultObject.where = homePlace
                }
            }
            else if(value == 0) {
                if(resultObject.where.length == 2 && resultObject.leagueData.enemyTeam.length == 0) {
                    resultObject.leagueData.enemyTeam = getObjectWithChooseIndex(listEnemy, resultObject.where[0])
                }
                else if(resultObject.where.length == 0 && resultObject.leagueData.enemyTeam.length == 2) {
                    resultObject.where = getObjectWithChooseIndex(listWhere, resultObject.leagueData.enemyTeam[0])
                }
            }
            return resultObject
        }
    }
    else if(key == "teamSum") {
        if(resultObject.leagueData.team.sum != value) {
            resultObject.leagueData.team.sum = value;
            return resultObject
        }
    }
    else if(key == "where") {
        if(resultObject.where.toString() != value.toString()) {
            resultObject.where = value;
            if(resultObject.leagueData.inHome == 0 && value.length == 2 && resultObject.leagueData.enemyTeam.length == 0) {
                resultObject.leagueData.enemyTeam = getObjectWithChooseIndex(listEnemy, value[0])
            }
            return resultObject
        }
    }
    else if(key == "enemyTeam") {
        if(resultObject.leagueData.enemyTeam.toString() != value.toString()) {
            resultObject.leagueData.enemyTeam = value;
            if(resultObject.leagueData.inHome == 0 && resultObject.where.length == 0 && value.length == 2) {
                resultObject.where = getObjectWithChooseIndex(listWhere, value[0])
            }
            return resultObject
        }
    }
    else if(key == "lanes") {
        if(resultObject.gameType.keyHowManyLanes != value.key ||
            resultObject.lanes.numberOfLanes != value.numberOfLanes ||
            resultObject.lanes.numberOfLanesInForm != value.numberOfLanesInForm ||
            resultObject.leagueData.player.canWinDuel != value.canWinDuel) {

            resultObject.gameType.keyHowManyLanes = value.key
            resultObject.lanes.numberOfLanes = value.numberOfLanes
            resultObject.lanes.numberOfLanesInForm = value.numberOfLanesInForm
            resultObject.leagueData.player.canWinDuel = value.canWinDuel

            while(resultObject.results.suma.length < value.numberOfLanesInForm + 1) {
                resultObject.leagueData.player.setPoints.push(null)
                resultObject.results.suma.push(null)
                resultObject.results.pelne.push(null)
                resultObject.results.zbierane.push(null)
                resultObject.results.dziury.push(0)
            }
            if(value.numberOfLanesInForm > 0) {
                resultObject.results.pelne[0] = getSumLanesResults(resultObject.results.pelne, value.numberOfLanes)
                resultObject.results.zbierane[0] = getSumLanesResults(resultObject.results.zbierane, value.numberOfLanes)
                resultObject.results.dziury[0] = getSumLanesResults(resultObject.results.dziury, value.numberOfLanes)
                resultObject.results.suma[0] = getSumLanesResults(resultObject.results.suma, value.numberOfLanes)
                resultObject.leagueData.player.setPoints[0] = getSumLanesResults(resultObject.leagueData.player.setPoints, value.numberOfLanes)
            }
            return resultObject
        }
    }
    else if(key == "duel") {
        if(resultObject.leagueData.player.teamPoints != value) {
            resultObject.leagueData.player.teamPoints = value
            if(resultObject.leagueData.player.setPoints[0] === null) {
                const val = value ? 1 : 0
                for(let i=1; i<resultObject.lanes.numberOfLanesInForm+1; i++) {
                    resultObject.leagueData.player.setPoints[i] = val
                }
                resultObject.leagueData.player.setPoints[0] = val * resultObject.lanes.numberOfLanesInForm
            }
            return resultObject
        }
    }
    else if(key == "results") {
        for(let i=0; i<value.length; i++) {
            resultObject.results.pelne[i] = value[i][0]
            resultObject.results.zbierane[i] = value[i][1]
            resultObject.results.dziury[i] = value[i][2]
            resultObject.results.suma[i] = value[i][3]
            resultObject.leagueData.player.setPoints[i] = value[i][4]
        }
        return resultObject
    }
    return undefined
}

const getTodayDate = () => {
    const date = new Date();
    var dateSting = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
    var dateToday = new Date(dateSting);
    return dateToday.getTime() / (24*3600*1000);
}

const getObjectWithChooseIndex = (listObject, index) => {
    for(let obj of listObject) {
        if(obj[0] === index) return obj
    }
    return []
}

const defaultPlaceIsHomePlace = (listOfGameTypes, idGameType) => {
    for(let gameType of listOfGameTypes) {
        if(gameType.id == idGameType) return gameType.defaultPlace.homePlace
    }
    return false
}

const defaultPlaceIsTrainingPlace = (listOfGameTypes, idGameType) => {
    for(let gameType of listOfGameTypes) {
        if(gameType.id == idGameType) return gameType.defaultPlace.trainingPlace
    }
    return false
}

const changeGameType_checkLanes = (resultObject, listOfGameTypes) => {
    for(let gameType of listOfGameTypes) {
        if(gameType.id == resultObject.gameType.id) {
            for(let lanes of gameType.howManyLanes.options) {
                if(lanes.key == resultObject.gameType.keyHowManyLanes) {
                    if(resultObject.lanes.numberOfLanes == lanes.numberOfLanes &&
                        resultObject.lanes.numberOfLanesInForm == lanes.numberOfLanesInForm &&
                        resultObject.leagueData.player.canWinDuel == lanes.canWinDuel) {
                            return resultObject
                        }
                }
            }
        }
    }
    resultObject.gameType.keyHowManyLanes = -1
    resultObject.lanes.numberOfLanes = -1
    resultObject.lanes.numberOfLanesInForm = -1
    resultObject.leagueData.player.canWinDuel = false
    return resultObject
}

const getSumLanesResults = (listResult, length) => {
    let sum = null
    for(let i=1; i<= length; i++) {
        if(listResult[i] !== null) {
            sum = ((sum === null) ? 0 : sum) + listResult[i]
        }
    }
    return sum
}

const getSeason = (dateInt) => {
    var date = new Date(dateInt * 1000 * 3600 * 24);
    let yearLeft = date.getFullYear()
    if(date.getMonth() <= 6) yearLeft -= 1
    return String(yearLeft) + "/" + String(yearLeft+1)
}