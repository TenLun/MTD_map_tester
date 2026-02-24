import { toDom } from "./utils/covertToDOM.js";
import { getCurrentPosition,mouseDown } from "./utils/mouse.js";
import { currentGrid,setCurrentGrid,getTower } from "./utils/floorFuncs.js";

import { add_tower } from "./tower.js";
import { changeTowerInfo,chooseButtonList } from "./UI.js";

import { currentTower, SIZE, towerList , setCurrentTower} from "./gameArguments.js";
import { towerDataDict } from "./gameDatas/gameResouces.js";
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
        this.size = size || SIZE
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

        if (!(getCurrentPosition()[0] > this.canvasX && getCurrentPosition()[0] < this.canvasX+this.width &&
            getCurrentPosition()[1] > this.canvasY && getCurrentPosition()[1] < this.canvasY+ this.height)) return;

        canvasCtx.drawImage(toDom("resources/ButtonSelectLine3.png"), this.canvasX, this.canvasY, this.size, this.size)

        //预显
        if (currentTower) {
            canvasCtx.save();
            canvasCtx.globalAlpha = 0.5;
            canvasCtx.shadowColor = 'rgba(0,256,0,99)';
            //没有塔，地板可以放置
            if (getTower(towerList,this.x,this.y) || !(towerDataDict[currentTower]['floor'].includes(this.type))) {
                canvasCtx.shadowColor = 'rgba(256,0,0,99)';
            }
            
            canvasCtx.shadowOffsetY = 10**-10
            canvasCtx.drawImage(toDom("resources/towers/TowerBase2.png"), this.canvasX+3, this.canvasY+3, this.size-6, this.size-6)                
            canvasCtx.drawImage(toDom("resources/IconOutline2.png"), this.canvasX+8, this.canvasY+8, this.size-16, this.size-16)
            canvasCtx.drawImage(toDom(towerDataDict[currentTower]["image"]) , this.canvasX+14, this.canvasY+14, this.size-28, this.size-28)
            canvasCtx.restore();
        }
        
        //鼠标按下
        if (!mouseDown) return;
        canvasCtx.save()
        canvasCtx.fillStyle = '#ffff0077';
        canvasCtx.fillRect(this.canvasX, this.canvasY, this.size, this.size);
        canvasCtx.restore()
    }
    //地板被点击切换当前选中塔
    onClick(){
        if (! (getCurrentPosition()[0] > this.canvasX && getCurrentPosition()[0] < this.canvasX+this.width &&
        getCurrentPosition()[1] > this.canvasY && getCurrentPosition()[1] < this.canvasY+ this.height)) return;
        if (!mouseDown) return;
        setCurrentGrid([this.x,this.y])
        //没有塔，地板可以放置
        if (currentTower && !getTower(towerList,this.x,this.y) && towerDataDict[currentTower]['floor'].includes(this.type) ) {
            add_tower([this.x,this.y],currentTower)
            //刷新CD
            for (var ele in chooseButtonList){
                if (chooseButtonList[ele].tower == currentTower){
                    chooseButtonList[ele].delayCD = 0
                }
            }
            setCurrentTower("")
        }
        changeTowerInfo(currentGrid)
    };

    //调用事件
    event(){
        this.onClick()
    }
}


