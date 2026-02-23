import { SIZE,STATE,
    money, crystal, setMoney, setCrystal,
    TOTALDAYS,day,floorsList,towerList,towerDataDict } from "./gameArguments.js";
import { gradeColor } from "./UI.js";
import { toDom } from "./utils/covertToDOM.js";
import { currentGrid, getFloorType } from "./utils/floorFuncs.js";
import { createText } from "./text.js";

/**
 * 添加塔
 * @param {number[]} position [x,y]
 * @param {string} type 塔类型
 * @returns {void}
 */
export function add_tower(position,type){
    if (!towerDataDict[type]["floor"].includes(getFloorType(floorsList))) return; //不是自己的地板类型
    for (const towerObj of towerList){
        if (towerObj.position == position) return; //这个位置已经有了塔
    }
    towerList.push(new Tower(position,type))
    setMoney(money - towerDataDict[type]["parameters"][0]["Cost"])
    createText(position[0]*(SIZE+1), position[1]*(SIZE+1), type, "#ffffff", 2, "normal")
}


export class Tower{
    /**
     * 
     * @param {*} position [x,y]
     * @param {*} type 塔类型
     * @param {*} grade 塔等级
     */
    constructor(position,type,grade) {
        //基本参数
        this.size = SIZE
        this.position = [position[0],position[1]]
        this.x = this.position[0];//相对地图格子上的坐标
        this.y = this.position[1];
        this.type = type;               //类型
        this.currentGrade = grade || 0 //当前等级
        
        this.id = "tower-"+Math.ceil(Math.random()*10000000)

        this.canvasX = this.x*(this.size+1) //真实坐标 px (左上)
        this.canvasY = this.y*(this.size+1)

        this.width = this.size
        this.height = this.size

        this.animate = 0 //缩放动画
        this.image = towerDataDict[this.type]["image"]

        //参数
        this.upgradePara = towerDataDict[this.type]["parameters"]
        this.upgradeTree = towerDataDict[this.type]["upgradetree"]

        this.parameters = this.upgradePara[this.currentGrade] //参数
        this.hp = this.parameters["MaxHealth"] //血量
        this.state = "alive" //还有一种是死亡"dead"

        this.event = towerDataDict[this.type]["events"]

    }

    render(canvasCtx,animate=0){
        canvasCtx.save();
        canvasCtx.globalAlpha = 0.5;
        canvasCtx.shadowColor = gradeColor[this.currentGrade];
        canvasCtx.shadowOffsetY = 10**-10
        canvasCtx.drawImage(toDom("resources/towers/TowerBase2.png"), this.canvasX+3, this.canvasY+3, SIZE-6, SIZE-6)
        
        canvasCtx.restore();
        canvasCtx.drawImage(toDom("resources/IconOutline2.png"), this.canvasX+10, this.canvasY+10, SIZE-20, SIZE-20)
        canvasCtx.drawImage(toDom(this.image) , this.canvasX+14, this.canvasY+14, SIZE-28, SIZE-28)

        this.onselect(canvasCtx)
    }

    onselect(canvasCtx){
        if (currentGrid[0] == this.x && currentGrid[1] == this.y){
            //画圆
            canvasCtx.save();
            canvasCtx.beginPath();
            canvasCtx.arc(this.canvasX+SIZE/2, this.canvasY+SIZE/2, this.parameters["AttackRange"], 0 ,2*Math.PI);
            canvasCtx.fillStyle="#ffffff3a"
            canvasCtx.globalAlpha = 0.5;
            canvasCtx.fill()
            canvasCtx.restore();
        }
    }

    sell(){}

    //升级
    upgrade(upgrade_type){
        this.parameters = this.upgradePara[upgrade_type]
        this.hp = this.parameters["MaxHealth"]
        setMoney( money - this.upgradePara[upgrade_type]["Cost"]["money"] )
        setCrystal( crystal - this.upgradePara[upgrade_type]["Cost"]["crystal"])
        this.currentGrade = upgrade_type

        createText(this.canvasX,this.canvasY,"upgrade","#00ff00",2,"normal")
    }

    degrade(){}

    hurt(damage){
        this.hp -= damage
        createText(this.canvasX,this.canvasY,damage,"#ff0000",1,"number")
    }

    delete(){}

    // 每一个攻击时间里的事件
    events(){
        if (STATE == "pause" || day == TOTALDAYS.length) return;
        this.event(this)
    }
}

