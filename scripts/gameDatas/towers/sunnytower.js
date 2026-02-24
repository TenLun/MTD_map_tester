import { setMoney,money,crystal,setCrystal,tick } from "/scripts/gameArguments.js";
import { createText } from "../../text.js";

var attackTime = tick;

function events(towerObj){
    if ( (tick - attackTime)/60 < towerObj.parameters["AttackTime"]) return;

    setMoney(money + towerObj.parameters['Gold']);
    createText(towerObj.canvasX, towerObj.canvasY, towerObj.parameters['Gold']+"G","#ffff00",1.5,"production");
    setCrystal(crystal + towerObj.parameters['Crystal']);
    createText(towerObj.canvasX, towerObj.canvasY, towerObj.parameters['Crystal']+"C","#ff00ff",1.5,"production");

    attackTime = tick;//重置计时器
}

//升级技能树(当前等级可以升哪个等级)
var upgradeTree = {
    "0":"1",
    "1":"2",
}
//属性
var parameters = {
    "0":{
        'MaxHealth' : 100,
        'AttackTime' : 5, //是的原作就是这样写的
        "Gold":40,
        "Crystal":2
    },
    "1":{
        'Cost' : {"money":20,"crystal":0},
        'MaxHealth' : 200,
        'AttackTime' : 3,
        "Gold":50,
        "Crystal":4
    },
    "2":{
        'Cost' : {"money":20,"crystal":4},
        'MaxHealth' : 250,
        'AttackTime' : 3,
        "Gold":60,
        "Crystal":5
    }
}
const TOWERDATA = {
    "type":"sunnytower",
    "events":events,
    "parameters":parameters,
    "upgradetree":upgradeTree,
    "floor":["floor","brokenground"], //可以被放置的地板类型
    "image":"/resources/towers/SunnyTower.png"
};
export default TOWERDATA
