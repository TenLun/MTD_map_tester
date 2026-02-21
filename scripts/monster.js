/*
position
type

monsterDataDict['square'] = {
    "type":"square",
    "image":"resources/monsters/Square.png",
    "event":events
}
*/
import { floorsList } from "./map.js";
import { monsterDataDict } from "./monsters/monsterDict.js";
import "./monsters/square.js"
import { CubicOut, toDom } from "./utils.js";

export var monsterList = [];



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

    //移动 0°为正下 -90°为正左
    move(direction,length){
        this.x += Math.cos((direction)*Math.PI/180)*length; 
        this.y += Math.sin((direction)*Math.PI/180)*length; 
    }
    
    //寻路算法
    find_path(current_x,current_y,target_x,target_y){
        this.move(
            Angle(this.x,this.y,toPosition(target[0][0],target[0][1])[0] + 15, toPosition(target[0][0],target[0][1])[1] + 15),
            this.size/100
        )
    }

    //事件，被子弹击打，碰到塔/地板
    event(){
        if (STATE == "pause" || day == DAYS.length) return;
        for (var tower in towerList){
            if ( (toGrid(this.x+this.size-2,this.y)[0] == towerList[tower].x || toGrid(this.x,this.y)[0] == towerList[tower].x) &&
            (toGrid(this.x,this.y+this.size-2)[1] == towerList[tower].y || toGrid(this.x,this.y)[1] == towerList[tower].y)){
                this.damage(towerList[tower])
                this.move(
                    Angle(this.x,this.y,toPosition(target[0][0],target[0][1])[0] + 15, toPosition(target[0][0],target[0][1])[1] + 15),
                    -2*this.size
                )
            }
        }
        this.find_path()
        
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
