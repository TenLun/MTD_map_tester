import { monsterDataDict } from "./gameDatas/gameResouces.js";
import "./gameDatas/monsters/square.js";

import { toDom } from "./utils/covertToDOM.js";
import { toGridSingle,toPosition } from "./utils/convetCoords.js";
import { CubicOut, Angle } from "./utils/animation.js";
import { STATE,TOTALDAYS,day,
    towerList,floorsList,monsterList,target, 
    SIZE} from "./gameArguments.js";
import { Tower } from "./tower.js";
/*
position
type

monsterDataDict['square'] = {
    "type":"square",
    "image":"resources/monsters/Square.png",
    "event":events
}
*/
//添加怪物
function add_monster(x,y,type,size){
    monsterList.push(new Monster(x,y,type,size))
}

export class Monster {
    constructor(x,y,type,size){
        //外观
        this.size = size
        this.direction = Math.ceil(Math.random()*360)

        this.id = Math.ceil(Math.random()*10000000)

        //对于ctx的像素位置 (原点左上) 真实坐标 px
        this.canvasX = x 
        this.canvasY = y 

        this.type = type

        this.image = monsterDataDict[this.type]["image"]
        //this.event = monsterDataDict[this.type]["event"]

        this.hp = this.size

        //动画部分
        this.animateX = this.canvasX //渲染位置
        this.animateY = this.canvasY
        this.i = [0,this.size]
        this.size = 0
    }

    render(canvasCtx){
        canvasCtx.save();
        canvasCtx.globalAlpha = 0.5;
        canvasCtx.translate(this.canvasX +this.size/2,this.canvasY+this.size/2)
        canvasCtx.rotate(this.direction*Math.PI/180);
        canvasCtx.translate(-this.canvasX -this.size/2, -this.canvasY-this.size/2)
        canvasCtx.drawImage(toDom(this.image), this.canvasX, this.canvasY, this.size, this.size)
        canvasCtx.restore();
        this.animate()
    }

    /**
     * 移动 0°为正下 -90°为正左
     * @param {*} direction 方向
     * @param {*} length 长度
     */
    move(direction,length){
        this.canvasX += Math.cos((direction)*Math.PI/180) * length; 
        this.canvasY += Math.sin((direction)*Math.PI/180) * length; 
    }
    
    /**
     * 寻路 todo
     * @param {Tower} target 塔对象（日光塔）
     * @param {*} current_x 
     * @param {*} current_y 
     */
    find_path(target,current_x,current_y){
        this.move(
            Angle([this.canvasX,this.canvasY],toPosition(floorsList,target.position)),
            this.size/100 );
    }

    //事件，被子弹击打，碰到塔/地板
    event(){
        if (STATE == "pause" || day == TOTALDAYS.length) return;
        //碰到塔
        for (const towerObj of towerList){
            if (!( (toGridSingle(this.canvasX+this.size-2,SIZE) == towerObj.x || toGridSingle(this.canvasX,SIZE) == towerObj.x) &&
                (toGridSingle(this.canvasY+this.size-2,SIZE) == towerObj.y || toGridSingle(this.canvasY,SIZE) == towerObj.y))) break;
            this.damage(towerObj)
            this.move(
                Angle([this.canvasX,this.canvasY],toPosition(floorsList,target[0].position)),
                -20);
        }
        this.find_path(target[0])
        
        if (this.hp <= 0) {
            this.destroy()
        }
    }

    //伤害塔
    damage(target){
        target.hurt(Math.ceil(this.size/30))
    }

    //自己受到伤害
    hurt(damage){
        this.hp -= damage
        createText(this.canvasX,this.canvasY,damage,"#ff0000",1.5,"number")
    }

    //位置大小更改
    animate(){
        if (this.i[0] < 1){
            this.size = this.i[1]*CubicOut(1,0,1,this.i[0])
            this.i[0] += 0.1
        }
        this.animateX += ( this.canvasX - this.animateX ) / 1000
        this.animateY += ( this.canvasX - this.animateY ) / 1000
    }

    destroy(){
        for (var monster in monsterList){
            if ( monsterList[monster].id == this.id ){
                monsterList.splice(monster,1)
                delete this
            }
        }
    }
}

export function spawn_monster(){
    for (var floor in floorsList){
        if (floorsList[floor].type == "spawner"){
            add_monster(floorsList[floor].canvasX,floorsList[floor].canvasY,'square', Math.ceil(Math.random()*30 +30))
        }
    }
}
