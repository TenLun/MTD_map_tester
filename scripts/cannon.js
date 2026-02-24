import { cannonsList,STATE,day,TOTALDAYS,monsterList,canvasHeight,canvasWidth } from "./gameArguments.js"
import { toDom } from "./utils/covertToDOM.js"
/**
 * 
 * @param {number} x //坐标
 * @param {number} y //坐标
 * @param {number} direction //方向 -90为正左
 * @param {number} size //大小
 * @param {number} damage //伤害
 */
export function createCannon(x,y,direction,size,damage){
    cannonsList.push(new Cannon(x,y,direction,size,damage))
}

export class Cannon{
    
    constructor(x,y,direction,size,damage) {
        //相对ctx坐标
        this.canvasX = x
        this.canvasY = y

        this.size = size || 10
        this.direction = direction
        this.damage = damage

        this.id = Math.ceil(Math.random()*10000000)
    }

    render(canvasCtx){
        canvasCtx.drawImage(toDom("resources/cannon/CircalBullet.png"), this.canvasX, this.canvasY, this.size, this.size)
    }
    
    
    event(){
        if (STATE == "pause" || day == TOTALDAYS.length) return;
        this.move(this.direction,this.size)
        for (const monsterObj of monsterList){//打到怪物
            if (((this.canvasX <= monsterObj.canvasX + monsterObj.size) && (this.canvasX >= monsterObj.canvasX - monsterObj.size)) &&
                ((this.canvasY <= monsterObj.canvasY + monsterObj.size) && (this.canvasY >= monsterObj.canvasY - monsterObj.size))){
                    monsterObj.hurt(this.damage);
                    this.destroy();
                    break;
            }
        }
        if (this.canvasX < 0 || this.canvasX > canvasHeight || this.canvasY < 0 || this.canvasY > canvasWidth){
            this.destroy()
        }
    }

    move(direction,length){
        this.canvasX += Math.cos((direction)*Math.PI/180)*length; 
        this.canvasY += Math.sin((direction)*Math.PI/180)*length; 
    }

    //销毁自己
    destroy(){
        for (var cannon in cannonsList) {
            if (cannonsList[cannon].id == this.id){
                cannonsList.splice(cannon,1)
            }
        }
    }
}
