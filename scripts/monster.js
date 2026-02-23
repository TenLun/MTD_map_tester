import { monsterDataDict } from "./monsters/monsterDict.js";
import "./monsters/square.js";

import { toDom } from "./utils/covertToDOM.js";
import { toGrid,toPosition } from "./utils/convetCoords.js";
import { CubicOut, Angle } from "./utils/animation.js";
import { STATE,TOTALDAYS,day,
    towerList,floorsList,monsterList,target } from "./gameArguments.js";
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

        //对于ctx的像素位置 (左上)
        //真实坐标 px
        this.x = x 
        this.y = y 

        this.type = type

        this.image = monsterDataDict[this.type]["image"]

        this.hp = this.size

        //动画部分
        this.i = [0,this.size]
        this.size = 0

        var that = this
        this.Interval = setInterval( function(){that.animate()} , 50)
    }

    render(canvasCtx){
        canvasCtx.save();
        canvasCtx.globalAlpha = 0.5;
        canvasCtx.translate(this.x +this.size/2,this.y+this.size/2)
        canvasCtx.rotate(this.direction*Math.PI/180);
        canvasCtx.translate(-this.x -this.size/2, -this.y-this.size/2)
        canvasCtx.drawImage(toDom(this.image), this.x, this.y, this.size, this.size)
        canvasCtx.restore();
    }

    /**
     * 移动 0°为正下 -90°为正左
     * @param {*} direction 方向
     * @param {*} length 
     */
    move(direction,length){
        console.log('1')
        this.x += Math.cos((direction)*Math.PI/180)*length; 
        this.y += Math.sin((direction)*Math.PI/180)*length; 
    }
    
    //寻路算法
    find_path(target,current_x,current_y){
        this.move(
            Angle([this.x,this.y],[target.x,target.y]),
            this.size/100 );
    }

    //事件，被子弹击打，碰到塔/地板
    event(){
        if (STATE == "pause" || day == TOTALDAYS.length) return;
        for (const towerObj of towerList){
            if ( (toGrid(floorsList, this.x+this.size-2,this.y)[0] == towerObj.x || toGrid(floorsList, this.x,this.y)[0] == towerObj.x) &&
            (toGrid(floorsList, this.x,this.y+this.size-2)[1] == towerObj.y || toGrid(floorsList, this.x,this.y)[1] == towerObj.y)){
                this.damage(towerObj)
                this.move(
                    Angle(this.x,this.y,toPosition(target[0][0],target[0][1])[0] + 15, toPosition(target[0][0],target[0][1])[1] + 15),
                    -2*this.size
                )
            }
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
        createText(this.x,this.y,damage,"#ff0000",1.5,"number")
    }

    animate(){
        if (this.i[0] < 1){
            this.size = this.i[1]*CubicOut(1,0,1,this.i[0])
            this.i[0] += 0.1
        }else{
            clearInterval(this.Interval)
        }
    }

    destroy(){
        for (var monster in monsterList){
            if ( monsterList[monster].id == this.id ){
                monsterList.splice(monster,1)
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
