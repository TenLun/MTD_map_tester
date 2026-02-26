/**
 * 这个文件用于存放所有的静态资源键值对对应
 * 在main start中加载并阻塞
 */
/**
 * 与 Parameters 的键名对应
 * {"0":"1","1":"2",}
 * @typedef UpgradeTree
 */
/**
 * @typedef Cost
 * @property {number} money
 * @property {number} crystal
 */
/**
 * 上面面列举必须项
 * @typedef towerParameters
 * @property {Cost} Cost  花费的资源
 * @property {number} AttackTime 不是攻击，而是事件轮询的间隔
 * @property {number} MaxHealth 最大生命
 */

/**
 * {"delay":200,
 *   "0":{
 *       'Cost' : 100,
 *       'AttackPower' : 5,
 *      'AttackRange' : 250,
 *      'AttackTime' : 1,
 *       'MaxHealth' : 100
 *   },
 *   "1":{etc...}}
 * @typedef Parameters
 * @property {towerParameters} listparams
 */
/**
 * @typedef {Object} towerData
 * @property {string} type 塔类型
 * @property {function} events 每一次渲染触发的事件
 * @property {Parameters} parameters
 * @property {UpgradeTree} upgradetree 升级树
 * @property {string[]} floor 可以被放置的地板类型
 * @property {string} image 图像地址
 * @property {number} delay 被放置后产生的CD
 */

/**
 * @typedef {Object} towerDataDict
 * @property {towerData} $towertype
 */

/**这里是塔数据保存 @type {towerDataDict} */
export var towerDataDict = {} 
export function addTowerData(key,value){
    towerDataDict[key]=value
}

export var monsterDataDict={}
export function addMonsterData(key,value){
    monsterDataDict[key]=value
}

export var cannonDict={}

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
    "multiCannon": 'rgb(0, 0, 255)',
    "expandRange": 'rgb(0, 0, 255)',
    "2": 'rgb(0, 0, 255)',
    "3": 'rgb(255,0,255)'
}

// 等级图标，不同的等级可以公用的
//以后还会在这里添加等级说明
export const gradeImage = {
    "1": 'resources/UI/BaseUpgrade.png',
    "2": 'resources/UI/PromoteUpgrade.png',
    "multiCannon": '/resources/UI/Repack1.png',
    "expandRange": '/resources/UI/Repack2.png',
}