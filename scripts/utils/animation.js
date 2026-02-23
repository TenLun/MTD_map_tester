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

//数组中符合条件的元素
function deleteArray(obj,cond){
    for (element in obj){

    }
}