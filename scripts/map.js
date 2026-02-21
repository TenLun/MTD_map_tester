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
import { add_tower } from "./tower.js";
import { towerDataDict } from "./towers/towerDict.js";
import { currentTower,changeTowerInfo,chooseButtonList, setCurrentTower } from "./UI.js";
import { toDom,getCurrentPosition,
    mouseDown,currentGrid,setCurrentGrid,getTower} from "./utils.js";
import { SIZE } from "./arguments.js";
import { floorDataDict } from "./floors/floorDict.js";
import "./floors/ground.js"

export var floorsList = [];

/*
function click_map(){
    for (var floor in floorsList){
        floorsList[floor].onClick()
    }
}
eventsListening.push(click_map)
*/
export class Ground{
    
    constructor(x,y,type) {
        
        //相对地图格子上的坐标
        this.x = x
        this.y = y
        this.size = SIZE
        this.width = SIZE
        this.height = SIZE

        //真实坐标 px (左上)
        this.canvasX = this.x*(this.size+1)
        this.canvasY = this.y*(this.size+1)
        this.type = type
        this.image =  floorDataDict[type]["image"]

    }

    //不仅是渲染 还有渲染时调用事件
    render(canvasCtx){
        canvasCtx.drawImage(toDom(this.image), this.canvasX, this.canvasY, this.size, this.size)
        this.onHover(canvasCtx)
    }

    onHover(canvasCtx){
        if (getCurrentPosition()[0] > this.canvasX && getCurrentPosition()[0] < this.canvasX+this.width &&
        getCurrentPosition()[1] > this.canvasY && getCurrentPosition()[1] < this.canvasY+ this.height){

            canvasCtx.drawImage(toDom("resources/ButtonSelectLine3.png"), this.canvasX, this.canvasY, this.size, this.size)

            //预显
            if (currentTower) {
                canvasCtx.save();
                canvasCtx.globalAlpha = 0.5;
                canvasCtx.shadowColor = 'rgba(0,256,0,99)';
                //没有塔，地板可以放置
                if (getTower(this.x,this.y) || !(towerDataDict[currentTower]['floor'].includes(this.type))) {
                    canvasCtx.shadowColor = 'rgba(256,0,0,99)';
                }
                
                canvasCtx.shadowOffsetY = 10**-10
                canvasCtx.drawImage(toDom("resources/towers/TowerBase2.png"), this.canvasX+3, this.canvasY+3, SIZE-6, SIZE-6)                
                canvasCtx.drawImage(toDom("resources/IconOutline2.png"), this.canvasX+8, this.canvasY+8, SIZE-16, SIZE-16)
                canvasCtx.drawImage(toDom(towerDataDict[currentTower]["image"]) , this.canvasX+14, this.canvasY+14, SIZE-28, SIZE-28)
                canvasCtx.restore();
            }
            if (mouseDown) {
                this.onClick()
                canvasCtx.save()
                canvasCtx.fillStyle = '#ffff0077';
                canvasCtx.fillRect(this.canvasX, this.canvasY, SIZE, SIZE);
                canvasCtx.restore()
            }
        }
    }

    //地板被点击切换当前选中塔
    onClick(){
        setCurrentGrid([this.x,this.y])
        //没有塔，地板可以放置
        if (currentTower && !getTower(this.x,this.y) && towerDataDict[currentTower]['floor'].includes(this.type) ) {
            add_tower(this.x,this.y,currentTower)
            //刷新CD
            for (var ele in chooseButtonList){
                if (chooseButtonList[ele].tower == currentTower){
                    chooseButtonList[ele].delayCD = 0
                }
            }
            setCurrentTower("")
        }
        changeTowerInfo(currentGrid)
        
    }
}


