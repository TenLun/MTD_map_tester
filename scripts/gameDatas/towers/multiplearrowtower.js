import { monsterList,tick } from "../../gameArguments.js";
import { createCannon } from "../../cannon.js"
import { Angle } from "../../utils/animation.js"

var attackTime = tick;

function events(tower) {
    if ( (tick - attackTime)/60 < towerObj.parameters["AttackTime"]) return;

    for (const monsterObj of monsterList) {
        if (Math.pow(monsterObj.x + monsterObj.size / 2 - (tower.canvasX + tower.size / 2), 2) +
            Math.pow(monsterObj.y + monsterObj.size / 2 - (tower.canvasY + tower.size / 2), 2) <= Math.pow(tower.parameters['AttackRange'], 2)) {
            var direction = Angle((tower.canvasX + tower.size / 2), (tower.canvasY + tower.size / 2), monsterObj.x, monsterObj.y)
            for (i_ in Array(tower.parameters['BulletNumber']).fill(1)) {
                createCannon((tower.canvasX + tower.size / 2), (tower.canvasY + tower.size / 2),
                    (direction - 10 * tower.parameters['BulletNumber'] / 2 + 10 * i_), 10, tower.parameters['AttackPower'])
            }
        }
        break;
    }
    attackTime = tick;//重置计时器
}
//升级技能树(当前等级可以升哪个等级)
var upgradeTree = {
    "0": "1",
    "1": "2",
}

//属性
var parameters = {
    "delay": 100, //CD 单位10ms
    "0": {
        'Cost': 200,
        'AttackPower': 15,
        'AttackRange': 450,
        'AttackTime': 1.8,
        'MaxHealth': 100,
        'BulletNumber': 3
    },
    "1": {
        'Cost': { "money": 20, "crystal": 1 },
        'AttackPower': 15,
        'AttackRange': 450,
        'AttackTime': 1.8,
        'MaxHealth': 100,
        'BulletNumber': 5
    },
};

const TOWERDATA = {
    "type": "multiplearrowtower",
    "events": events,
    "parameters": parameters,
    "upgradetree": upgradeTree,
    "floor": ["ground","gold"], //可以被放置的地板类型
    "image": "resources/towers/MultipleArrowTower.png"
}
export default TOWERDATA