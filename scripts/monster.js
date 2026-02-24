import { monsterDataDict } from "./gameDatas/gameResouces.js";
import "./gameDatas/monsters/square.js";

import { toDom } from "./utils/covertToDOM.js";
import { toPosition } from "./utils/convetCoords.js";
import { CubicOut, Angle, ifIn } from "./utils/mathFuncs.js";
import { STATE,TOTALDAYS,day,
    towerList,floorsList,monsterList,target, 
    SIZE} from "./gameArguments.js";
import { Tower } from "./tower.js";
import { createText } from "./text.js";
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

        //对于ctx的像素位置 (原点左上) 怪物目标坐标 px
        this.canvasX = x 
        this.canvasY = y 

        this.type = type

        this.image = monsterDataDict[this.type]["image"]
        this.events = monsterDataDict[this.type]["event"]

        this.hp = this.size

        //动画部分
        this.animateX = this.canvasX //渲染位置 真实坐标 px
        this.animateY = this.canvasY
        this.i = [0,this.size]
        this.size = 0
    }

    render(canvasCtx){
        canvasCtx.save();
        canvasCtx.globalAlpha = 0.5;
        canvasCtx.translate(this.canvasX + this.size/2, this.canvasY + this.size/2) //将网格原点移动至自己中心
        canvasCtx.rotate(this.direction*Math.PI/180); //朝向 this.direction
        canvasCtx.translate(-this.canvasX -this.size/2, -this.canvasY-this.size/2) //将网格原点移动回去
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
            Angle([this.canvasX,this.canvasY],toPosition(target.position, SIZE)),
            this.size/50 );
    }

    //事件，被子弹击打，碰到塔/地板
    event(){
        if (STATE == "pause" || day == TOTALDAYS.length) return;
        //碰到塔
        this.events()
        for (const towerObj of towerList){
            if (towerObj.state == "dead") continue;
            //怪物右边在塔左边的右边||怪物左边在塔右边的左边  下边碰上边||上碰下
            if ( !ifIn(this,towerObj) ) continue;
            // if (!(( this.canvasX + this.size >= towerObj.canvasX && this.canvasX <= towerObj.canvasX + towerObj.size) &&
            //     (   this.canvasY + this.size >= towerObj.canvasY && this.canvasY <= towerObj.canvasY + towerObj.size))) continue;
            this.damage(towerObj)
            this.move(
                Angle([this.canvasX,this.canvasY],toPosition(target[0].position, SIZE)),
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
        //this.animateX += ( this.canvasX - this.animateX ) / 10
        //this.animateY += ( this.canvasY - this.animateY ) / 10
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
            add_monster(floorsList[floor].canvasX,floorsList[floor].canvasY,'square', Math.ceil(30))
        }
    }
}
