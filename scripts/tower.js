import { SIZE } from "./arguments.js";
import { towerDataDict } from "./towers/towerDict.js"
import { STATE, money, crystal, setMoney, setCrystal } from "./main.js";
import { gradeColor } from "./UI.js";
import { toDom,currentGrid,getFloorType } from "./utils.js";
import { createText } from "./text.js";
import "./towers/arrowtower.js"
import "./towers/goldmine.js"
import "./towers/multiplearrowtower.js"
import "./towers/sunnytower.js"
import "./towers/temporaryarrowtower.js"

//目前存在的tower对象
export var towerList = [];

//添加塔
export function add_tower(x,y,type){

    if (!towerDataDict[type]["floor"].includes(getFloorType())) return;
    for (var tower in towerList){
        if (towerList[tower].x == x && towerList[tower].y == y) return;
    }

    towerList.push(new Tower(x,y,type))

    setMoney(money - towerDataDict[type]["parameters"][0]["Cost"])

    createText(x*(SIZE+1), y*(SIZE+1), type, "#ffffff", 2, "normal")
}

export class Tower{
    
    constructor(x,y,type,grade) {
        this.size = SIZE
        //相对地图格子上的坐标
        this.x = x
        this.y = y

        this.id = "tower-"+Math.ceil(Math.random()*10000000)

        //类型
        this.type = type 

        //真实坐标 px (左上)
        this.canvasX = this.x*(this.size+1)
        this.canvasY = this.y*(this.size+1)

        this.width = this.size
        this.height = this.size

        //缩放动画
        this.animate = 0

        this.attacktime = 0
    
        this.image = towerDataDict[this.type]["image"]

        //参数
        this.currentGrade = grade || 0 //当前等级
        
        this.upgradePara= towerDataDict[this.type]["parameters"]
        this.upgradeTree = towerDataDict[this.type]["upgradetree"]

        this.parameters = this.upgradePara[this.currentGrade] //参数
        this.hp = this.parameters["MaxHealth"] //血量

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
        if (STATE == "pause" || day == DAYS.length) return;
        if (this.attacktime >= this.parameters["AttackTime"]){
            this.event(this)
            this.attacktime = 0
        }else{
            this.attacktime += 0.01

        }
        
    }
}

