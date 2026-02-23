export var cannonDict={}

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

class Cannon{
    
    constructor(x,y,direction,size,damage) {
        //相对ctx坐标
        this.x = x
        this.y = y

        this.size = size || 10
        this.direction = direction
        this.damage = damage

        this.id = Math.ceil(Math.random()*10000000)
    }

    render(){
        ctx.drawImage(toDom("resources/cannon/CircalBullet.png"), this.x, this.y, this.size, this.size)
    }
    
    //打到怪物
    event(){
        if (STATE == "pause" || day == DAYS.length) return;
        this.move(this.direction,this.size)
        for (monster in monsterList){
            if (((this.x <= monsterList[monster].x+(monsterList[monster].size/2)) && (this.x >= monsterList[monster].x-(monsterList[monster].size/2))) &&
                ((this.y <= monsterList[monster].y+(monsterList[monster].size/2)) && (this.y >= monsterList[monster].y-(monsterList[monster].size/2)))){
                    monsterList[monster].hurt(this.damage);
                    this.destroy();
                    break;
            }
        }
        if (this.x < 0 || this.x > canvasHeight || this.y < 0 || this.y > canvasWidth){
            this.destroy()
        }
    }

    move(direction,length){
        this.x += Math.cos((direction)*Math.PI/180)*length; 
        this.y += Math.sin((direction)*Math.PI/180)*length; 
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
