export const onPrepareResultObject = (resultObject, key, value, initialResultObject, listWhere, listEnemy, 
                                        homePlace, trainingPlace, listOfGameTypes) => {
    if(key == "clear") return initialResultObject;
    else if(key == "comment") {
        if(resultObject.comment != value) {
            resultObject.comment = value;
            return resultObject
        }
    }
    else if(key == "gameType") {
        if(resultObject.gameType.id != value.id) {
            resultObject.gameType.id = value.id;
            resultObject.gameType.name = value.name;
            if(resultObject.date == -1) resultObject.date = getTodayDate();
            if(resultObject.where.length == 0 && defaultPlaceIsTrainingPlace(listOfGameTypes, value.id)) {
                resultObject.where = trainingPlace
            }
            return resultObject
        }
    }
    else if (key == "date") {
        if(resultObject.date != value) {
            resultObject.date = value;
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
    return undefined
}

const getTodayDate = () => {
    const date = new Date();
    var dateSting = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
    var dateToday = new Date(dateSting);
    return dateToday.getTime() / (24*3600*1000);
}

const getObjectWithChooseIndex = (listObject, index) => {
    for(obj of listObject) {
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