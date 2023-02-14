const data = [
    {index: 1, where: "w Brzesku", enemy: "z Brzeskiem"},
    {index: 2, where: "w Gdańsku", enemy: "z Gdańskiem"},
    {index: 3, where: "w Gostyniu", enemy: "z Gostyniem"},
    {index: 4, where: "w Lesznie", enemy: "z Lesznem"},
    {index: 5, where: "w Lubinie", enemy: undefined},
    {index: 6, where: "w Łaziskach Górnych", enemy: "z Łaziskami Górnymi"},
    {index: 7, where: "w Pleszewie", enemy: undefined},
    {index: 8, where: "w Poznaniu", enemy: "z Poznaniem"},
    {index: 9, where: "w Pucku", enemy: "z Puckiem"},
    {index: 10, where: "w Sierakowie", enemy: "z Sierakowem"},
    {index: 11, where: "w Świebodzicach", enemy: undefined},
    {index: 12, where: "w Tarnowie Podgórnym", enemy: "z Tarnowem Podgórnym"},
    {index: 13, where: "w Tomaszowie Mazowieckim", enemy: "z Tomaszowem Mazowieckim"},
    {index: 14, where: "w Tucholi", enemy: "z Tucholą"},
    {index: 15, where: "we Wronkach", enemy: "z Wronkami"},
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