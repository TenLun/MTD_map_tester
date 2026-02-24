/**
 * 将canvas坐标传化为地图格子坐标
 * @param {number[]} canvasPos [canvasx,canvasy]
 * @param {number} size 地图格子大小
 * @returns {number[]} 地图坐标
 */
export function toGrid(canvasPos,size){

    var x = Math.floor(canvasPos[0] / size)
    var y = Math.floor(canvasPos[1] / size)
    return [x,y]
};
/**
 * 将地图格子坐标传化为canvas坐标
 * @param {number[]} gridPos 
 * @param {number} size 地图格子大小
 * @returns {number[]} 地图格子左上角在canvas上的坐标
 */
export function toPosition(gridPos,size){
    var canvasX = gridPos[0]*size
    var canvasY = gridPos[1]*size
    return [canvasX,canvasY]
}

// export function toPosition(floorsList,position){
//     for (const floorObj of floorsList){
//         if (floorObj.position.toString() == position.toString()){ //我真服js这比较
//             return [floorObj.canvasX + floorObj.width/2, floorObj.canvasY + floorObj.height/2]
//         } 
//     };

//     return false
// };    

// for (const floorObj of floorsList){
//     if (floorObj.canvasX <= x && floorObj.canvasX+floorObj.width >= x &&
//         floorObj.canvasY <= y && floorObj.canvasY+floorObj.height >= y){
//         return [floorObj.x,floorObj.y]
//     } 
// };