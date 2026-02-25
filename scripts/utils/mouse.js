import { mainCanvas, MAP_CONTAINER } from "./getElements.js"

//鼠标的一些参数 (在画布上的坐标)
var mouseX = 0
var mouseY = 0

function setMousePos(event) {
    mouseX = event.clientX - Number(MAP_CONTAINER.style.left.slice(0,-2))
    mouseY = event.clientY - Number(MAP_CONTAINER.style.top.slice(0,-2))
}
window.addEventListener('mousemove',setMousePos,false);

/**
 * 得到鼠标在canvas上的坐标
 * @returns [鼠标X坐标，鼠标y坐标]
 */
export function getCurrentPosition(){
    return [mouseX,mouseY]
}

/*鼠标是否按下 */
export var mouseDown = 0;
mainCanvas.onmousedown = function() { 
    mouseDown = 1;
}
mainCanvas.onmouseup = function() {
    mouseDown = 0;
}