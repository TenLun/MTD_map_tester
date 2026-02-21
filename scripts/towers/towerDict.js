/**
 * 这里是塔数据保存
 */
export var towerDataDict={}

/**
 * 用于添加塔数据
 * @param {*} key 
 * @param {*} value 
 */
export function addTowerData(key,value){
    towerDataDict[key]=value
}