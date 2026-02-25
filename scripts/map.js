import { toDom } from "./utils/covertToDOM.js";

import { floorDataDict } from "./gameDatas/floors/floorDict.js";
import "./gameDatas/floors/ground.js"
import { toPosition } from "./utils/convetCoords.js";

//整个大类型叫floor
/*
floorDict["hill"] = {
    "name":"hill",
    "image": "resources/floors/Hill.png"
}

"map":[
        {"type":"hill","position":[0,0]},
    ]
*/
/*
function click_map(){
    for (var floor in floorsList){
        floorsList[floor].onClick()
    }
}
eventsListening.push(click_map)
*/
export class Ground{
    
    constructor(position,type,size) {
        this.size = size
        this.width = this.size
        this.height = this.size

        //相对地图格子上的坐标
        this.position = [position[0],position[1]];  //在地图格子上的坐标
        this.x = this.position[0]
        this.y = this.position[1]

        //真实坐标 px (左上)
        this.canvasPosition = toPosition(this.position,this.size)
        this.canvasX = this.canvasPosition[0]
        this.canvasY = this.canvasPosition[1]

        this.type = type
        this.image =  floorDataDict[type]["image"]
    }

    /**
     * 渲染
     * @param {CanvasRenderingContext2D} canvasCtx 
     */
    render(canvasCtx){
        canvasCtx.drawImage(toDom(this.image), this.canvasX+1, this.canvasY+1, this.size-2, this.size-2) //画地面
    }
}
