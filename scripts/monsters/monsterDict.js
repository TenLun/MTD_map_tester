/**
 * 这里是塔数据保存
 */
export var monsterDataDict={}

/**
 * 用于添加塔数据
 * @param {*} key 
 * @param {*} value 
 */
export function addMonsterData(key,value){
    monsterDataDict[key]=value
}