import { addTowerData } from "./towerDict.js";
function events(tower){
    money += tower.parameters['Gold']
    createText(tower.canvasX, tower.canvasY, tower.parameters['Gold']+"G","#ffff00",1.5,"production")
    crystal += tower.parameters['Crystal']
    createText(tower.canvasX, tower.canvasY, tower.parameters['Crystal']+"C","#ff00ff",1.5,"production")
}

//升级技能树(当前等级可以升哪个等级)
var upgradeTree = {
    "0":"1",
    "1":"2",
}
//属性
var parameters = {
    "0":{
        'MaxHealth' : 1000,
        'AttackTime' : 15,
        "Gold":40,
        "Crystal":2
    },
    "1":{
        'Cost' : {"money":20,"crystal":0},
        'MaxHealth' : 2000,
        'AttackTime' : 15,
        "Gold":50,
        "Crystal":4
    }
}
addTowerData("sunnytower", {
    "name":"sunnytower",
    "events":events,
    "parameters":parameters,
    "upgradetree":upgradeTree,
    "floor":"floor", //可以被放置的地板类型
    "image":"resources/towers/SunnyTower.png"
})
