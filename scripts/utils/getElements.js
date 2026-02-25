import { OFFSET } from "../gameArguments.js";

export const MAP_CONTAINER = document.getElementById("map_container");
export const mainCanvas = document.getElementById("main_canvas"); //最终渲染的canvas
export const cacheCanvas = document.createElement('canvas'); // 新建一个 canvas 作为缓存 canvas

//移动
window.onload=()=>{
    MAP_CONTAINER.onmousedown = function(event) {
        if (event.button != 1) return 
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
        MAP_CONTAINER.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            MAP_CONTAINER.onmouseup = null;
        };
        event.preventDefault()
};}

//阻止默认事件
document.addEventListener("contextmenu", (event) => { event.preventDefault(); });

export function getMany(mapObject,value){
    
}