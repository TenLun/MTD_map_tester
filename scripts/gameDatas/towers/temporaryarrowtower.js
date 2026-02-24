import { monsterList,tick } from "../../gameArguments.js";
import { createCannon } from "../../cannon.js"
import { Angle } from "../../utils/mathFuncs.js"

var attackTime = tick;

function events(tower){
    if ( (tick - attackTime)/60 < towerObj.parameters["AttackTime"]) return;

    for (const monsterObj of monsterList) {
        if (Math.pow(monsterObj.canvasX - (tower.canvasX+tower.size/2),2)+
            Math.pow(monsterObj.canvasY - (tower.canvasY+tower.size/2),2) <= Math.pow(tower.parameters['AttackRange'],2)){
            createCannon(
                (tower.canvasX+tower.size/2),(tower.canvasY+tower.size/2),
                Angle((tower.canvasX+tower.size/2), (tower.canvasY+tower.size/2), monsterObj.canvasX , monsterObj.canvasY  ),
                10,
                tower.parameters['AttackPower']
            )
            tower.hurt(2)
            break;
        }
    }
    attackTime = tick;//重置计时器
    
}
//升级技能树(当前等级可以升哪个等级)
var upgradeTree = {
}
//属性
var parameters = {
    "0":{
        'Cost':20,
        'MaxHealth' : 50,
        'AttackTime' : 1,
        'AttackPower': 5,
        'AttackRange': 250,
        'BulletNumber':1
    },
}
const TOWERDATA ={
    "type":"temporaryarrowtower",
    "events":events,
    "parameters":parameters,
    "upgradetree":upgradeTree,
    "floor":["ground","gold"], //可以被放置的地板类型
    "image":"resources/towers/TemporaryArrowTower.png"
}
export default TOWERDATA
