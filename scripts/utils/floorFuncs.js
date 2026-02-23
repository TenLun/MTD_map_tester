//全局的一些参数
//目前选中的地图格子
export let currentGrid = [0,0];
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
    for (var floor in floorsList){
        if (floorsList[floor].x == currentGrid[0] && floorsList[floor].y == currentGrid[1]){
            return floorsList[floor].type
        } 
    }
}

//格子上的塔
export function getTower(towerList,x,y){
    for (var tower in towerList){
        if (towerList[tower].x == x && towerList[tower].y == y){
            return towerList[tower]
        }  
    }
    return false
}

