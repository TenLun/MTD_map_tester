/**
 * 没有import放心导入，变量指针是一样的
 * 这个文件存放的是游戏实时的公共数据
 */

import { Cannon } from "./cannon.js"
import { Ground } from "./map.js"
import { Monster } from "./monster.js"
import { Tower } from "./tower.js"

//地图格子大小(包括边界) 以后变为放大倍率
export const SIZE = 60
export const OFFSET = [70, 30] //地图偏移量 [x,y] px
export const canvasWidth = 1448; //地图大小
export const canvasHeight = 750;

//怪物目标（日光塔）格子坐标（们）
export var target = []
//目标坐标(相对于地图 即日光塔的坐标)
export function setTarget(tower_data){
    for (const towerObj of tower_data){
        if (towerObj.type == "sunnytower"){
            target.push(towerObj)
        }
    }
}

//游戏时间兼全局计时器 1 tick = 1 帧(frame) 
export var tick = 0 
export function setTick(value){
    tick = value
}

//目前天数
export var day = 0
export function setDay(value){
    day = value
}

/**游戏状态 @type {"pause" | "start" | "2x" } */
export var STATE = "pause" 
/**游戏状态设置
 * @param {"pause" | "start" | "2x"} value
 */
export function setState(value){
    STATE = value
}

//地图数据
export var money = level_data["money"] || 0
export function setMoney(value){
    money = value
}

export var crystal = level_data["crystal"] || 0
export function setCrystal(value){
    crystal = value
}
export const TOTALDAYS = level_data["total_days"] || 1 //数据内单位是tick
export const TOWERSLOTS = level_data["tower_slots"] || 3

/** @type {Monster[]} 目前存在的monster对象 */
export var monsterList = [];
/** @type {Tower[]} 目前存在的tower对象 */
export var towerList = []; 
/** @type {Ground[]} 目前存在的map floor ground对象 */
export var floorsList = [];
/** @type {Cannon[]} 目前存在的子弹对象 */
export var cannonsList = [];

/** @type {Tower.type | ""} 当前选择的塔类型 */
export var currentTower = ""
/** 当前选择的塔类型 */
export function setCurrentTower(value){
    currentTower = value
}



// export function getGameArguments(){
//     return {
//         "state":STATE,
//         "day":day,
//         "TOTALDAYS":TOTALDAYS,
//         "money":[money,setMoney],
//         "crystal":[crystal,setCrystal],
//         "monsterList":monsterList,
//         "towerList":towerList,
//         "cannonList":cannonsList,
//         "floorList":floorsList,
//     }
// }

//import("./towers/towerDictPlugin.js")