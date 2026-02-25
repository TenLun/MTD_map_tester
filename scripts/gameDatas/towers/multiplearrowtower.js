import { monsterList } from "../../gameArguments.js";
import { createCannon } from "../../cannon.js"
import { Angle,distancePow } from "../../utils/mathFuncs.js"

function events(towerObj) {
    for (const monsterObj of monsterList) {
        if ( distancePow(monsterObj,towerObj) > Math.pow(towerObj.parameters['AttackRange'],2) ) continue;

        var direction = Angle(
            [ towerObj.canvasX   + towerObj.size / 2, towerObj.canvasY   + towerObj.size / 2], 
            [ monsterObj.canvasX + monsterObj.size/2, monsterObj.canvasY + monsterObj.size/2])
        
        for (const i_ in Array(towerObj.parameters['BulletNumber']).fill(1)) {
            createCannon((towerObj.canvasX + towerObj.size / 2), (towerObj.canvasY + towerObj.size / 2),
                (direction - 10 * towerObj.parameters['BulletNumber'] / 2 + 10 * i_), 10, towerObj.parameters['AttackPower'])
        }
        break;
    }
}
//升级技能树(当前等级可以升哪个等级)
var upgradeTree = {
    "0": "1",
    "1": ["multiCannon","expandRange"],
}

//属性
var parameters = {
    "0": {
        'Cost': {"money":200,"crystal":0},
        'AttackPower': 15,
        'AttackRange': 150,
        'AttackTime': 1.8,
        'MaxHealth': 100,
        'BulletNumber': 3
    },
    "1": {
        'Cost': { "money": 20, "crystal": 1 },
        'AttackPower': 15,
        'AttackRange': 200,
        'AttackTime': 1.8,
        'MaxHealth': 100,
        'BulletNumber': 3
    },
    "multiCannon":{
        'Cost': { "money": 20, "crystal": 2 },
        'AttackPower': 15,
        'AttackRange': 200,
        'AttackTime': 1.8,
        'MaxHealth': 100,
        'BulletNumber': 5
    },
    "expandRange":{
        'Cost': { "money": 20, "crystal": 2 },
        'AttackPower': 15,
        'AttackRange': 250,
        'AttackTime': 1.8,
        'MaxHealth': 100,
        'BulletNumber': 3
    },
};

const TOWERDATA = {
    "type": "multiplearrowtower",
    "events": events,
    "parameters": parameters,
    "upgradetree": upgradeTree,
    "floor": ["ground","gold"], //可以被放置的地板类型
    "image": "resources/towers/MultipleArrowTower.png",
    "delay": 100, //CD 单位10ms
}
export default TOWERDATA