import { addTowerData } from "./towerDict.js";
function events(tower) {
    for (monster in monsterList) {
        if (Math.pow(monsterList[monster].x + monsterList[monster].size / 2 - (tower.canvasX + tower.size / 2), 2) +
            Math.pow(monsterList[monster].y + monsterList[monster].size / 2 - (tower.canvasY + tower.size / 2), 2) <= Math.pow(tower.parameters['AttackRange'], 2)) {
            var direction = Angle((tower.canvasX + tower.size / 2), (tower.canvasY + tower.size / 2), monsterList[monster].x, monsterList[monster].y)
            for (i_ in Array(tower.parameters['BulletNumber']).fill(1)) {
                createCannon((tower.canvasX + tower.size / 2), (tower.canvasY + tower.size / 2),
                    (direction - 10 * tower.parameters['BulletNumber'] / 2 + 10 * i_), 10, tower.parameters['AttackPower'])
            }
        }
        return;
    }
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
}

addTowerData("multiplearrowtower", {
    "name": "multiplearrowtower",
    "events": events,
    "parameters": parameters,
    "upgradetree": upgradeTree,
    "floor": ["ground","gold"], //可以被放置的地板类型
    "image": "resources/towers/MultipleArrowTower.png"
})