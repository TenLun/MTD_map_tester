/**
 * 没有import放心导入，变量指针是一样的
 * 这个文件存放的是游戏的公共数据
 */

//地图格子大小 以后变为放大倍率
export const SIZE = 60
export const OFFSET = [70, 30] //地图偏移量 [x,y] px

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

// 游戏状态 "pause" "start" "2x"
export var STATE = "pause" 
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

export var monsterList = [];
export var towerList = []; //目前存在的tower对象
export var floorsList = [];
export var cannonsList = [];

export var towerDataDict = {} //这里是塔数据保存
export function addTowerData(key,value){
    towerDataDict[key]=value
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

import("./towers/towerDictPlugin.js")