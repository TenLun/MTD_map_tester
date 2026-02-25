import { toDom } from "./utils/covertToDOM.js";
import { getCurrentPosition,mouseDown } from "./utils/mouse.js";
import { currentGrid,setCurrentGrid,getTower, getFloorType } from "./utils/floorFuncs.js";

import { add_tower } from "./tower.js";
import { changeTowerInfo,chooseButtonList } from "./UI.js";

import { currentTower, SIZE, towerList , setCurrentTower, floorsList} from "./gameArguments.js";
import { towerDataDict } from "./gameDatas/gameResouces.js";
import { toGrid, toPosition } from "./utils/convetCoords.js";

export class SelectBar {
    constructor(size){
        this.size = size || SIZE
        this.width = this.size
        this.height = this.size
    }

    render(canvasCtx){
        var currentMousePosGrid = toGrid(getCurrentPosition(),this.size)
        var currentMousePos = toPosition(currentMousePosGrid,this.size)
        canvasCtx.drawImage(toDom("resources/ButtonSelectLine3.png"), currentMousePos[0], currentMousePos[1], this.size, this.size)

        //预显
        if (currentTower) {
            canvasCtx.save();
            canvasCtx.globalAlpha = 0.5;
            canvasCtx.shadowColor = 'rgba(0,256,0,99)';
            //没有塔，地板可以放置
            if (getTower(towerList,currentMousePosGrid[0],currentMousePosGrid[1]) || 
                !(towerDataDict[currentTower]['floor'].includes(getFloorType(floorsList,currentMousePosGrid)))) {
                canvasCtx.shadowColor = 'rgba(256,0,0,99)';
            }
            
            canvasCtx.shadowOffsetY = 10**-10
            canvasCtx.drawImage(toDom("resources/towers/TowerBase2.png"),     currentMousePos[0]+3,  currentMousePos[1]+3, this.size-6, this.size-6)                
            canvasCtx.drawImage(toDom("resources/IconOutline2.png"),          currentMousePos[0]+8,    currentMousePos[1]+8, this.size-16, this.size-16)
            canvasCtx.drawImage(toDom(towerDataDict[currentTower]["image"]) , currentMousePos[0]+14, currentMousePos[1]+14, this.size-28, this.size-28)
            canvasCtx.restore();
            //画圆
            if (towerDataDict[currentTower]["parameters"]["0"]["AttackRange"] == undefined) return;
            canvasCtx.save();
            canvasCtx.beginPath();
            canvasCtx.arc(currentMousePos[0]+this.size/2, currentMousePos[1]+this.size/2, towerDataDict[currentTower]["parameters"]["0"]["AttackRange"], 0 ,2*Math.PI);
            canvasCtx.fillStyle="#ffffff3a"
            canvasCtx.globalAlpha = 0.5;
            canvasCtx.fill()
            canvasCtx.restore();
        }
        
        //鼠标按下
        if (!mouseDown) return;
        canvasCtx.save()
        canvasCtx.fillStyle = '#ffff0077';
        canvasCtx.fillRect(currentMousePos[0], currentMousePos[1], this.size, this.size);
        canvasCtx.restore()
    }
    //地板被点击切换当前选中塔
    onClick(gridX,gridY){
        if (!mouseDown) return;

        setCurrentGrid([gridX,gridY])
        //没有塔，地板可以放置
        if (currentTower && !getTower(towerList,gridX,gridY) && towerDataDict[currentTower]['floor'].includes(getFloorType(floorsList,[gridX,gridY])) ) {
            add_tower([gridX,gridY],currentTower,this.size)
            //刷新CD
            for (const chooseBtn of chooseButtonList){
                if (chooseBtn.towerType != currentTower) continue;
                chooseBtn.CDtimer = 0
            }
            setCurrentTower("")
        }
        changeTowerInfo(currentGrid)
    };

    //调用事件
    event(){
        var [gridX,gridY]= toGrid(getCurrentPosition(),this.size)
        this.onClick(gridX,gridY)
    }
}
