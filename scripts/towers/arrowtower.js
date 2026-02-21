import { addTowerData } from "./towerDict.js";
//普通箭塔
function events(tower){
    for (monster in monsterList) {
        if (Math.pow(monsterList[monster].x-(tower.canvasX+tower.size/2),2)+
            Math.pow(monsterList[monster].y-(tower.canvasY+tower.size/2),2) <= Math.pow(tower.parameters['AttackRange'],2)){
            createCannon(
                (tower.canvasX+tower.size/2),(tower.canvasY+tower.size/2),
                Angle((tower.canvasX+tower.size/2), (tower.canvasY+tower.size/2), monsterList[monster].x, monsterList[monster].y),
                10,
                tower.parameters['AttackPower']
            )
            return;
        }
    }
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
        'Cost' : 100,
        'AttackPower' : 5,
        'AttackRange' : 250,
        'AttackTime' : 1,
        'MaxHealth' : 100
    },
    "1":{
        'Cost' : {"money":20,"crystal":0},
        'AttackPower' : 10,
        'AttackRange' : 270,
        'AttackTime' : 0.5,
        'MaxHealth' : 200
    },
    "2":{
        'Cost' : {"money":20,"crystal":1},
        'AttackPower' : 12,
        'AttackRange' : 300,
        'AttackTime' : 0.5,
        'MaxHealth' : 250
    }
}

addTowerData("arrowtower", {
    "name":"arrowtower",
    "events":events,
    "parameters":parameters,
    "upgradetree":upgradeTree,
    "floor":["ground","gold"], //可以被放置的地板类型
    "image":"resources/towers/ArrowTower.png"
})