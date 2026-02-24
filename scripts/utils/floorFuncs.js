//全局的一些参数

import { Tower } from "../tower.js";

//目前选中的地图格子
export let currentGrid = [];
/**
 * 改变当前选择的格子
 * @param {*} value 
 */
export function setCurrentGrid(value){
    currentGrid = value
}
export function getCurrentGrid(){
    return currentGrid
}


/**
 * 遍历floorlist 返回当前floor类型
 * @param {*} value 
 * @returns 
 */
export function getFloorType(floorsList){
    for (const floorObj of floorsList){
        if (floorObj.x == currentGrid[0] && floorObj.y == currentGrid[1]){
            return floorObj.type
        } 
    }
}

/**
 * 根据坐标获取格子上的塔
 * @param {Tower[]} towerList 遍历的塔列表
 * @param {number} x 
 * @param {number} y 
 * @returns {Tower}
 */
export function getTower(towerList,x,y){
    for (const towerObj of towerList){
        if (towerObj.x == x && towerObj.y == y){
            return towerObj
        }  
    }
    return false
}

