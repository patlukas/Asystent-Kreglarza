export const sortListOfResults = (listOfResults, sortValue) => {
    switch(sortValue) {
        case "date_gain": return listOfResults.sort((a, b) => sortByDate(a, b, true))
        case "date_cost": return listOfResults.sort((a, b) => sortByDate(a, b, false))
        case "sum_gain": return listOfResults.sort((a, b) => sortBySum(a, b, true))
        case "sum_cost": return listOfResults.sort((a, b) => sortBySum(a, b, false))
        case "pelne_gain": return listOfResults.sort((a, b) => sortByPelne(a, b, true))
        case "pelne_cost": return listOfResults.sort((a, b) => sortByPelne(a, b, false))
        case "zbierane_gain": return listOfResults.sort((a, b) => sortByZbierane(a, b, true))
        case "zbierane_cost": return listOfResults.sort((a, b) => sortByZbierane(a, b, false))
        case "id_gain": return listOfResults.sort((a, b) => sortById(a, b, true))
        case "id_cost": return listOfResults.sort((a, b) => sortById(a, b, false))
    }
    return listOfResults
}

const sortByDate = (a, b, gain) => {
    const sign = gain ? -1 : 1
    if(a.date != b.date) return sign * (a.date - b.date)
    return sign * (a.id - b.id)
}
const sortBySum = (a, b, gain) => {
    const val1 = a.results.suma[0]
    const val2 = b.results.suma[0]
    const sign = gain ? -1 : 1
    if(val1 != val2) return sign * (val1 - val2)
    return sortByZbierane(a, b, gain)
}
const sortByZbierane = (a, b, gain) => {
    const val1 = a.results.zbierane[0]
    const val2 = b.results.zbierane[0]
    const sign = gain ? -1 : 1
    if(val1 != val2) return sign * (val1 - val2)
    return sortByDziury(a, b, !gain)
}
const sortByDziury = (a, b, gain) => {
    const val1 = a.results.dziury[0]
    const val2 = b.results.dziury[0]
    const sign = gain ? -1 : 1
    if(val1 != val2) return sign * (val1 - val2)
    return sortByDate(a, b, !gain)
}
const sortByPelne = (a, b, gain) => {
    const val1 = a.results.pelne[0]
    const val2 = b.results.pelne[0]
    const sign = gain ? -1 : 1
    if(val1 != val2) return sign * (val1 - val2)
    return sortByDziury(a, b, !gain)
}
const sortById = (a, b, gain) => {
    const sign = gain ? -1 : 1
    return sign * (a.id - b.id)
}