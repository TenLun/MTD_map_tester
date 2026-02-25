import { createCannon } from "../../cannon.js";
import { Angle, distancePow } from "../../utils/mathFuncs.js";
import { monsterList, tick } from "../../gameArguments.js";
import { Tower } from "../../tower.js";

/**
 * 每一次渲染触发的事件
 * @param {Tower} towerObj 
 * @returns 
 */
function events(towerObj){
    for (const monsterObj of monsterList) {
        if ( distancePow(monsterObj,towerObj) > Math.pow(towerObj.parameters['AttackRange'],2) ) {
            continue;
        }
        createCannon(
            (towerObj.canvasX+towerObj.size/2),(towerObj.canvasY+towerObj.size/2),
            Angle(
                [(towerObj.canvasX+towerObj.size/2), (towerObj.canvasY+towerObj.size/2)],
                [monsterObj.canvasX, monsterObj.canvasY]),
            10,
            towerObj.parameters['AttackPower']
        )
        break;
    }
}

//升级技能树(当前等级可以升哪个等级)
var upgradeTree = {
    "0":"1",
    "1":"2",
}

//属性
var parameters = {
    "0":{
        'Cost' : {"money":20,"crystal":0},
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

const TOWERDATA = {
    "type":"arrowtower",
    "events":events,
    "parameters":parameters,
    "upgradetree":upgradeTree,
    "floor":["ground","gold"], //可以被放置的地板类型
    "image":"/resources/towers/ArrowTower.png",
    "delay":200,
}

export default TOWERDATA;