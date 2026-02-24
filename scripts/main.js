import { setTarget,towerList,floorsList } from "./gameArguments.js";
import { setTowerDataInit,TowerPlugins,setMonsterDataInit,MonsterPlugins } from "./gameDatas/DictPlugin.js";
import { runEvents } from "./event.js";
import { Tower } from "./tower.js";
import { Ground } from "./map.js";
import { UIInit } from "./UI.js";
import { renderAll } from "./render.js";

const floor_data = level_data["map"]
const tower_data = level_data["tower"]
const level_width = level_data["width"]
const level_height = level_data["height"]

//开始
async function start() {
    //加载扩展
    await setTowerDataInit(TowerPlugins)
    await setMonsterDataInit(MonsterPlugins) 
    // //添加关卡已有元素
    floor_init(floor_data,floorsList);
    tower_init(tower_data,towerList);
    setTarget(tower_data);
    UIInit()
    MainLoop()
}

//主游戏循环
function MainLoop() {
    runEvents();
    renderAll();
    requestAnimationFrame(MainLoop);
}

function tower_init(tower_data,tower_list){
    for (const towerArg of tower_data){
        var towerPos = towerArg["position"]
        var towerType = towerArg["type"]
        tower_list.push(new Tower(towerPos,towerType))
    }
}

//刷新地板 到 floorsList 里
function floor_init(floor_data,floor_list){
    for (const floorArg of floor_data){
        var floorPos = floorArg["position"]
        var floor_type = floorArg["type"]
        floor_list.push(new Ground(floorPos,floor_type))
    }
}

start()