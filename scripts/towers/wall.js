import { addTowerData } from "../gameArguments.js";

function events(tower){
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
        'MaxHealth' : 200
    },
    "1":{
        'Cost' : {"money":20,"crystal":0},
        'MaxHealth' : 300
    },
    "2":{
        'Cost' : {"money":20,"crystal":1},
        'MaxHealth' : 300
    }
}
addTowerData("wall", {
    "name":"goldmine",
    "events":events,
    "parameters":parameters,
    "upgradetree":upgradeTree,
    "floor":"brokenground", //可以被放置的地板类型
    "image":"resources/towers/Wall.png"
})
