import { runEvents,eventsListening } from "./event.js";
import { renderAll } from "./render.js";
import { towerList, Tower } from "./tower.js";
import { floorsList,Ground } from "./map.js";
import { UIInit } from "./UI.js";

function Time(){
    if (STATE == "pause" || day == DAYS.length) return;
    tick += 1
    if (tick >= eval(DAYS[day].join("+")) ){
        day += 1
        tick = 0
    }
};

//日光塔格子坐标
var target = []

//目标坐标(相对于地图 即日光塔的坐标)
function get_target(){
    for (var tower in tower_data){
        if (tower_data[tower]["type"] == "sunnytower"){
            target.push(tower_data[tower]["position"])
        }
    }
}

//window.setInterval(runEvents, 10);

/**
 * 用以替换 container
 * @returns 
 */
export function getContainer() {
    return document.getElementById("map_container");
}

//游戏时间 100 tick = 1s
export var tick = 0 
export var day = 0

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
export function getMoney(){
    return money
}

export var crystal = level_data["crystal"] || 0
export function setCrystal(value){
    crystal = value
}
export var DAYS = level_data["days"] || 1 //数据内单位是tick

const floor_data = level_data["map"]
const tower_data = level_data["tower"]
const level_width = level_data["width"]
const level_height = level_data["height"]

function start() {

    floor_init(floor_data,floorsList)
    tower_init(tower_data,towerList)
    UIInit()
    get_target()

    eventsListening.push([renderAll, "render"])
    eventsListening.push([Time, "main_event"])

    MainLoop()
}

function MainLoop() {
    requestAnimationFrame(runEvents)
}



function tower_init(tower_data,tower_list){
    for (var tower in tower_data){
        var [tower_x,tower_y] = tower_data[tower]["position"]
        var tower_type = tower_data[tower]["type"]
        tower_list.push(new Tower(tower_x,tower_y,tower_type))
    }
}

//刷新地板 到 floorsList 里
function floor_init(floor_data,floor_list){
    for (var floor in floor_data){
        var [floor_x,floor_y] = floor_data[floor]["position"]
        var floor_type = floor_data[floor]["type"]
        
        floor_list.push(new Ground(floor_x,floor_y,floor_type))
    }
}

start()