import { MAP_CONTAINER } from "./utils/getElements.js";
import { OFFSET,
    floorsList,cannonsList,monsterList,towerList } from "./gameArguments.js";

const mainCanvas = document.getElementById("main_canvas"); //最终渲染的canvas
const mainCtx = mainCanvas.getContext('2d');

const cacheCanvas = document.createElement('canvas'); // 新建一个 canvas 作为缓存 canvas
const cacheCtx = cacheCanvas.getContext("2d");

const canvasWidth = cacheCanvas.width = mainCanvas.width = 1448;
const canvasHeight = cacheCanvas.height = mainCanvas.height = 750;
//全部渲染
export function renderAll() {
    MAP_CONTAINER.style.left = OFFSET[0] + "px"
    MAP_CONTAINER.style.top = OFFSET[1] + "px"
    render_map(floorsList) //地图块在最底下
    render_tower(towerList) //塔的图层占中
    render_monster(monsterList)
    render_cannon(cannonsList)
    //render_text() //最上面是文字
    mainCtx.drawImage(cacheCanvas, 0, 0)
}

function render_monster(monster_list){
    for (const monsterObj of monster_list){
        monsterObj.render(cacheCtx)
    }
}

//渲染每一个塔
function render_tower(tower_list){
    for (const towerObj of tower_list){
        towerObj.render(cacheCtx)
    }
}

//渲染子弹
function render_cannon(cannons_list){
    for (const cannonObj of cannons_list){
        cannonObj.render()
    }
}

//事件监听
function render_map(floors_list){
    cacheCtx.save();
    cacheCtx.fillStyle = "#414141";
    cacheCtx.fillRect(0, 0, canvasWidth, canvasHeight);
    for (const floorObj of floors_list){
        floorObj.render(cacheCtx)
    }
}
