//全局的一些参数
container = document.getElementById("map_container");
//将图片转换成dom
function toDom(src){
    var ImageDom = new Image();
    ImageDom.src = src;
    return ImageDom;
}

//将图片转换成dom(带颜色)
function imgToDom(src,width,height,color){
    var wrapper = document.createElement("div");
    wrapper.style.display = "inline-block";
    wrapper.style.overflow = "hidden";
    wrapper.style.width = width+"px"
    wrapper.style.height = height+"px"

    var ImageDom = new Image();
    ImageDom.src = src;
    ImageDom.width = width;
    ImageDom.height = height;

    ImageDom.style.transform = "translateX(-100%)";
    ImageDom.style.filter = "drop-shadow("+ width +"px 0 " + color +")"; 

    wrapper.appendChild(ImageDom);

    return wrapper;
}

//鼠标的一些参数 (在画布上的坐标)
mouseX = 0
mouseY = 0
function getMousePos (event) {
    mouseX = event.clientX - Number(container.style.left.slice(0,-2))
    mouseY = event.clientY - Number(container.style.top.slice(0,-2))
}
window.addEventListener('mousemove',getMousePos,false);

function getCurrentPosition(){
    return [mouseX,mouseY]
}

mouseDown = 0;
document.body.onmousedown = function() { 
    mouseDown = 1;
}
document.body.onmouseup = function() {
    mouseDown = 0;
}

//目前选中的地图格子
currentGrid = [0,0]
function getFloorType(){
    for (floor in floorsList){
        if (floorsList[floor].x == currentGrid[0] && floorsList[floor].y == currentGrid[1]){
            return floorsList[floor].type
        } 
    }
}

//格子上的塔
function getTower(x,y){
    for (tower in towerList){
        if (towerList[tower].x == x && towerList[tower].y == y){
            return towerList[tower]
        }  
    }
    return false
}

/** 动画曲线
 * @param {number} d 动画总时长
 * @param {number} b 初始位置
 * @param {number} c 移动距离
 * @param {number} t 动画运行时间
 * @returns {number} 当前动画
 */
function CubicOut(d,b,c,t){
    return c*((t=t/d-1)*t*t + 1) + b
}

//0°为正右 -90°为正下 p1面向p2的角度
function Angle(point1x,point1y,point2x,point2y){
    var angle = Math.atan2((point2y-point1y),(point2x-point1x));
    var theta = angle*(180/Math.PI);
    return theta
}

//将canvas坐标传化为地图格子坐标
function toGrid(x,y){
    for (floor in floorsList){
        if (floorsList[floor].canvasX <= x && floorsList[floor].canvasX+floorsList[floor].size >= x &&
            floorsList[floor].canvasY <= y && floorsList[floor].canvasY+floorsList[floor].size >= y){
            return [floorsList[floor].x,floorsList[floor].y]
        } 
    }
    return false
}

//将地图格子坐标传化为canvas坐标
function toPosition(x,y){
    for (floor in floorsList){
        if (floorsList[floor].x == x && floorsList[floor].y == y){
            return [floorsList[floor].canvasX,floorsList[floor].canvasY]
        } 
    }
    return false
}

//数组中符合条件的元素
function deleteArray(obj,cond){
    for (element in obj){

    }
}