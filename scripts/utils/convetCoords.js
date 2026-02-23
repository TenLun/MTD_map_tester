//将canvas坐标传化为地图格子坐标
export function toGrid(floorsList,x,y){
    for (var floor in floorsList){
        if (floorsList[floor].canvasX <= x && floorsList[floor].canvasX+floorsList[floor].size >= x &&
            floorsList[floor].canvasY <= y && floorsList[floor].canvasY+floorsList[floor].size >= y){
            return [floorsList[floor].x,floorsList[floor].y]
        } 
    };
    return false
};

//将地图格子坐标传化为canvas坐标
export function toPosition(floorsList,x,y){
    for (var floor in floorsList){
        if (floorsList[floor].x == x && floorsList[floor].y == y){
            return [floorsList[floor].canvasX,floorsList[floor].canvasY]
        } 
    };
    return false
};