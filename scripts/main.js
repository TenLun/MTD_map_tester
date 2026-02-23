import { setTarget,towerList,floorsList } from "./gameArguments.js";
import { runEvents } from "./event.js";
import { Tower } from "./tower.js";
import { Ground } from "./map.js";
import { UIInit } from "./UI.js";
import { renderAll } from "./render.js";

const floor_data = level_data["map"]
const tower_data = level_data["tower"]
const level_width = level_data["width"]
const level_height = level_data["height"]

function start() {
    floor_init(floor_data,floorsList);
    tower_init(tower_data,towerList);
    setTarget(tower_data);
    UIInit()
    MainLoop()
}

function MainLoop() {
    runEvents();
    renderAll();
    requestAnimationFrame(MainLoop);
}

function tower_init(tower_data,tower_list){
    for (const towerArg of tower_data){
        var [tower_x,tower_y] = towerArg["position"]
        var tower_type = towerArg["type"]
        tower_list.push(new Tower(tower_x,tower_y,tower_type))
    }
}

//刷新地板 到 floorsList 里
function floor_init(floor_data,floor_list){
    for (const floorArg of floor_data){
        var [floor_x,floor_y] = floorArg["position"]
        var floor_type = floorArg["type"]
        floor_list.push(new Ground(floor_x,floor_y,floor_type))
    }
}

start()