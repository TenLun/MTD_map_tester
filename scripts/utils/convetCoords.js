/**
 * 将canvas坐标传化为地图格子坐标
 * @param {*} canvasPos [canvasx,canvasy]
 * @param {*} size 地图格子大小
 * @returns 
 */
export function toGrid(canvasPos,size){
    // for (const floorObj of floorsList){
    //     if (floorObj.canvasX <= x && floorObj.canvasX+floorObj.width >= x &&
    //         floorObj.canvasY <= y && floorObj.canvasY+floorObj.height >= y){
    //         return [floorObj.x,floorObj.y]
    //     } 
    // };
    var x = Math.floor(canvasPos[0] / size)
    var y = Math.floor(canvasPos[1] / size)
    return [x,y]
};

/**
 * 单独转化坐标
 * @param {*} canvasPos [canvasx,canvasy]
 * @param {*} size 地图格子大小
 * @returns 
 */
export function toGridSingle(canvasPos,size){
    var siglePos = Math.floor(canvasPos / size)
    return siglePos
}
/**
 * 将地图格子坐标传化为canvas坐标
 * @param {Floor[]} floorsList 遍历的floorlist列表
 * @param {number[]} position 地图格子
 * @returns {number[]} 地图格子中心在canvas上的坐标
 */
export function toPosition(floorsList,position){
    for (const floorObj of floorsList){
        if (floorObj.position.toString() == position.toString()){ //我真服js这比较
            return [floorObj.canvasX + floorObj.width/2, floorObj.canvasY + floorObj.height/2]
        } 
    };
    return false
};