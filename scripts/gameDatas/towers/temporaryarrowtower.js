import { monsterList } from "../../gameArguments.js";
import { createCannon } from "../../cannon.js"
import { Angle,distancePow } from "../../utils/mathFuncs.js"


function events(towerObj){
    for (const monsterObj of monsterList) {
        if ( distancePow(monsterObj,towerObj) > Math.pow(towerObj.parameters['AttackRange'],2) ) {
            console.log(distancePow(monsterObj,towerObj))
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
        towerObj.hurt(2)
        break;
    }
}
//升级技能树(当前等级可以升哪个等级)
var upgradeTree = {
}
//属性
var parameters = {
    
    "0":{
        'Cost':{money:10,crystal:0},
        'MaxHealth' : 50,
        'AttackTime' : 1,
        'AttackPower': 5,
        'AttackRange': 250,
        'BulletNumber':1
    },
}
const TOWERDATA ={
    type:"temporaryarrowtower",
    "events":events,
    parameters:parameters,
    upgradetree:upgradeTree,
    floor:["ground","gold"], //可以被放置的地板类型
    image:"resources/towers/TemporaryArrowTower.png",
    delay:0,
}
export default TOWERDATA
