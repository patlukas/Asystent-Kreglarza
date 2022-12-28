const data = [
    {index: 1, where: "w Gostyniu", enemy: "z Gostyniem"},
    {index: 15, where: "w Śremie", enemy: undefined},
    {index: -1, where: "", enemy: ""}
]

let initialState = {listWhere: [], listEnemy: []}

for(el of data) {
    if(el.where !== undefined) initialState.listWhere.push([el.index, el.where])
    if(el.enemy !== undefined) initialState.listEnemy.push([el.index, el.enemy])
}

const whereAndEnemy = function (state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default whereAndEnemy;