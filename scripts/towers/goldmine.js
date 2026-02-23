import { addTowerData } from "./towerDict.js";

function events(tower){
    money += tower.parameters['Gold']
    createText(tower.canvasX, tower.canvasY, tower.parameters['Gold']+"G", "#ffff00",1.5,"production")
}
//升级技能树(当前等级可以升哪个等级)
var upgradeTree = {
    "0":"1",
    "1":"2",
}
//属性
var parameters = {
    "delay":200,
    "0":{
        "Cost" : 50,
        'AttackTime' : 5,
        'Gold' : 20,
        'MaxHealth' : 200
    },
    "1":{
        'Cost' : {"money":20,"crystal":0},
        'AttackTime' : 4,
        'Gold' : 20,
        'MaxHealth' : 200
    },
    "2":{
        'Cost' : {"money":20,"crystal":1},
        'AttackTime' : 3,
        'Gold' : 30,
        'MaxHealth' : 200
    }
}
addTowerData("goldmine", {
    "name":"goldmine",
    "events":events,
    "parameters":parameters,
    "upgradetree":upgradeTree,
    "floor":"gold", //可以被放置的地板类型
    "image":"resources/towers/GoldMine.png"
})
