import { towerList } from "./tower.js"
import { monsterList } from "./monster.js"
import { cannonsList } from "./cannon.js";
import { getContainer } from "./main.js";
import { OFFSET } from "./arguments.js";
import { floorsList } from "./map.js";

const container = getContainer() //画布父元素dom

const mainCanvas = document.getElementById("main_canvas"); //最终渲染的canvas
const mainCtx = mainCanvas.getContext('2d');

const cacheCanvas = document.createElement('canvas'); // 新建一个 canvas 作为缓存 canvas
const cacheCtx = cacheCanvas.getContext("2d");

const canvasWidth = cacheCanvas.width = mainCanvas.width = 1448;
const canvasHeight = cacheCanvas.height = mainCanvas.height = 750;
//全部渲染
export function renderAll() {
    container.style.left = OFFSET[0] + "px"
    container.style.top = OFFSET[1] + "px"
    render_map() //地图块在最底下
    render_tower() //塔的图层占中
    render_monster()
    render_cannon()
    //render_text() //最上面是文字
    mainCtx.drawImage(cacheCanvas, 0, 0)
}

function render_monster(){
    for (var monster in monsterList){
        monsterList[monster].render(cacheCtx)
    }
}

//渲染每一个塔
function render_tower(){
    for (var tower in towerList){
        towerList[tower].render(cacheCtx)
    }
}

//渲染子弹
function render_cannon(){
    for (var cannon in cannonsList){
        cannonsList[cannon].render()
    }
}

//事件监听
function render_map(){
    cacheCtx.save()
    cacheCtx.fillStyle = "#414141"
    cacheCtx.fillRect(0, 0, canvasWidth, canvasHeight);
    for (var floor in floorsList){
        floorsList[floor].render(cacheCtx)
    }
}

//移动
window.onload=()=>{
    container.onmousedown = function(event) {
        if (event.button != 2) return 
        let shiftX = event.clientX - OFFSET[0];
        let shiftY = event.clientY - OFFSET[1];

        moveAt(event.pageX, event.pageY);
    
        // 移动现在位于坐标 (pageX, pageY) 上的
        // 将初始的偏移考虑在内
        function moveAt(pageX, pageY) {
            OFFSET[0] = pageX - shiftX;
            OFFSET[1] = pageY - shiftY;
        }
    
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }
    
        // 在 mousemove 事件上移动
        document.addEventListener('mousemove', onMouseMove);
    
        // 放下，并移除不需要的处理程序
        container.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            container.onmouseup = null;
        };
        event.preventDefault()
};}

document.addEventListener("contextmenu", (event) => { event.preventDefault(); });