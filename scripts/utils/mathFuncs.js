import { Cannon } from "../cannon.js";
import { Monster } from "../monster.js";
import { Tower } from "../tower.js";

/** 动画曲线
 * @param {number} d 动画总时长
 * @param {number} b 初始位置
 * @param {number} c 移动距离
 * @param {number} t 动画运行时间
 * @returns {number} 当前动画
 */
export function CubicOut(d,b,c,t){
    return c*((t=t/d-1)*t*t + 1) + b
}

/**
 * 0°为正右 -90°为正下 p1面向p2的角度
 * @param {number[]} startPoint 初始位置
 * @param {number[]} endPoint 结束位置
 * @returns {number} theta p1面向p2的角度
 */

export function Angle(startPoint,endPoint){
    var angle = Math.atan2((endPoint[1] - startPoint[1]),(endPoint[0] - startPoint[0]));
    var theta = angle*(180/Math.PI);
    return theta
}

/**
 * 判断元素是否接触到了另一个元素
 * @param {Tower | Cannon | Monster} outerObj 
 * @param {Tower | Cannon | Monster} innerObj 
 * @returns {boolean}
 */
export function ifIn(outerObj,innerObj){
    //怪物右边在塔左边的右边||怪物左边在塔右边的左边  下边碰上边||上碰下
    return ( outerObj.canvasX + outerObj.size >= innerObj.canvasX && outerObj.canvasX <= innerObj.canvasX + innerObj.size) &&
           ( outerObj.canvasY + outerObj.size >= innerObj.canvasY && outerObj.canvasY <= innerObj.canvasY + innerObj.size)
}

/**
 * 获得元素间距离的平方
 * @param {Tower | Cannon | Monster} outerObj 
 * @param {Tower | Cannon | Monster} innerObj 
 * @returns {boolean}
 */
export function distancePow(outerObj,innerObj){
    //勾股定理
    return Math.pow( outerObj.canvasX + outerObj.size / 2 - ( innerObj.canvasX + innerObj.size / 2 ), 2 ) +
           Math.pow( outerObj.canvasY + outerObj.size / 2 - ( innerObj.canvasY + innerObj.size / 2 ), 2 )
}

//数组中符合条件的元素
function deleteArray(obj,cond){
    for (element in obj){

    }
}