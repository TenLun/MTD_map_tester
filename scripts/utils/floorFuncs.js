//全局的一些参数

import { Ground } from "../map.js";
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

/**
 *  返回
 * @param {Ground[]} floorsList 遍历floorlist
 * @param {number[]} position 
 * @returns {Ground.type} 当前floor类型
 */
export function getFloorType(floorsList,position){
    for (const floorObj of floorsList){
        if (floorObj.position.toString() !== position.toString() ) continue;
        return floorObj.type
    }
    return false;
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

