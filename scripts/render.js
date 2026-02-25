import { MAP_CONTAINER } from "./utils/getElements.js";
import { OFFSET,
    floorsList,cannonsList,monsterList,towerList,canvasWidth,canvasHeight } from "./gameArguments.js";

import { mainCanvas,cacheCanvas } from "./utils/getElements.js";

export var renderObjects = [];

const mainCtx = mainCanvas.getContext('2d');
export const cacheCtx = cacheCanvas.getContext("2d");

cacheCanvas.width  = mainCanvas.width  = canvasWidth;
cacheCanvas.height = mainCanvas.height = canvasHeight;

function render_map(floors_list){
    cacheCtx.save();
    cacheCtx.fillStyle = "#414141";
    cacheCtx.fillRect(0, 0, canvasWidth, canvasHeight); //绘制背景
    for (const floorObj of floors_list){
        floorObj.render(cacheCtx)
    }
}
renderObjects.push(()=>{ render_map(floorsList) })

//渲染每一个塔
function render_tower(tower_list){
    for (const towerObj of tower_list){
        towerObj.render(cacheCtx)
    }
}
renderObjects.push(()=>{render_tower(towerList) })

function render_monster(monster_list){
    for (const monsterObj of monster_list){
        monsterObj.render(cacheCtx)
    }
}
renderObjects.push(()=>{render_monster(monsterList)})

//渲染子弹
function render_cannon(cannons_list){
    for (const cannonObj of cannons_list){
        cannonObj.render(cacheCtx)
    }
}
renderObjects.push(()=>{render_cannon(cannonsList)})

//全部渲染
function renderAll(){
    if (renderObjects == 0) return;
    for (const renderObj of renderObjects) {
        renderObj()
    }
}

export function runRender() {
    cacheCtx.clearRect(0, 0, canvasWidth, canvasHeight);

    MAP_CONTAINER.style.left = OFFSET[0] + "px"
    MAP_CONTAINER.style.top = OFFSET[1] + "px"
    
    renderAll()


    //地图块在最底下
    //塔的图层占中
    //render_text() //deprecate 换成dom了 最上面是文字
    mainCtx.drawImage(cacheCanvas, 0, 0)
}