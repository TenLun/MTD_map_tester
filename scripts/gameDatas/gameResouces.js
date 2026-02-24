/**
 * 这个文件用于存放所有的静态资源键值对对应
 * 在main start中加载并阻塞
 */

export var towerDataDict = {} //这里是塔数据保存
export function addTowerData(key,value){
    towerDataDict[key]=value
}

export var monsterDataDict={}
/**
 * 用于添加数据
 */
export function addMonsterData(key,value){
    monsterDataDict[key]=value
}

//参数的值
export const imageUI = {
    "pause": ['resources/UI/icon_common_24.png', "#000000"],
    "start": ['resources/UI/icon_arrow_14.png', "#000000"],

    "AttackPower": ['resources/UI/AttackPower.png', '#ffff00'],
    "AttackRange": ['resources/UI/AttackRange.png', '#00ff00'],
    "AttackTime": ['resources/UI/AttackTime.png', '#00ffff'],
    "BulletNumber": ['resources/UI/BulletNumber.png', 'yellow'],
    "MaxHealth": ['resources/UI/MaxHealth.png', '#ff0000'],
    "Gold": ['resources/UI/MoneyProduction.png', '#ffff00'],
    "Crystal": ['resources/UI/RockProduction.png', '#ff00ff'],
}
// 等级颜色
export const gradeColor = {
    "0": 'rgb(0,0,0)',
    "1": 'rgb(0,255,0)',
    "2": 'rgb(0, 61, 255)',
    "3": 'rgb(255,0,255)'
}

// 等级图标
export const gradeImage = {
    "1": 'resources/UI/BaseUpgrade.png',
    "2": 'resources/UI/PromoteUpgrade.png',
    "choose1": '',
}