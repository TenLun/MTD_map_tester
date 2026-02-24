/**
 * 这个文件是用来动态加载模组的
 * 只能加载默认导出
 */
import { addMonsterData, addTowerData } from "./gameResouces.js"

export var TowerPlugins = ["./towers/arrowtower.js","./towers/goldmine.js",
    "./towers/multiplearrowtower.js","./towers/sunnytower.js","./towers/temporaryarrowtower.js","./towers/wall.js"]

export var MonsterPlugins = ["./monsters/square.js"]

/**
 * 动态导入所有模块
 * @param {string[]} TowerPlugins 
 */
export async function setTowerDataInit(TowerPlugins){
    const importPromises = TowerPlugins.map(path => import(path));
    const modules = await Promise.all(importPromises);
    modules.forEach((module,index)=>{
        addTowerData(module.default["type"],module.default)
    })
}

export async function setMonsterDataInit(MonsterPlugins){
    const importPromises = MonsterPlugins.map(path => import(path));
    const modules = await Promise.all(importPromises);
    modules.forEach((module,index)=>{
        addMonsterData(module.default["type"],module.default)
    })
}