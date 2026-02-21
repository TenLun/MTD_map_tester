
towerDict={}

//目前存在的tower对象
towerList = [];


function tower_init(){
    for (var tower in tower_data){
        var [tower_x,tower_y] = tower_data[tower]["position"]
        var tower_type = tower_data[tower]["type"]
        towerList.push(new Tower(tower_x,tower_y,tower_type))
    }
}

//添加塔
function add_tower(x,y,type){

    if (!towerDict[type]["floor"].includes(getFloorType())) return;
    for (var tower in towerList){
        if (towerList[tower].x == x && towerList[tower].y == y) return;
    }

    towerList.push(new Tower(x,y,type))

    money -=  towerDict[type]["parameters"][0]["Cost"]

    createText(x*(size+1), y*(size+1), type, "#ffffff", 2, "normal")
    render_tower()
}

//渲染每一个塔
function render_tower(){
    for (var tower in towerList){
        towerList[tower].render()
    }
}

function tower_events(){
    for (var tower in towerList){
        towerList[tower].events()
    }
}
eventsListening.push([tower_events,"tower"])

class Tower{
    
    constructor(x,y,type,grade) {
        //相对地图格子上的坐标
        this.x = x
        this.y = y

        this.id = "tower-"+Math.ceil(Math.random()*10000000)

        //类型
        this.type = type 

        //真实坐标 px (左上)
        this.canvasX = this.x*(size+1)
        this.canvasY = this.y*(size+1)

        this.size = size
        this.width = this.size
        this.height = this.size

        //缩放动画
        this.animate = 0

        this.attacktime = 0
    
        this.image = towerDict[this.type]["image"]

        //参数
        this.currentGrade = grade || 0 //当前等级
        
        this.upgradePara= towerDict[this.type]["parameters"]
        this.upgradeTree = towerDict[this.type]["upgradetree"]

        this.parameters = this.upgradePara[this.currentGrade] //参数
        this.hp = this.parameters["MaxHealth"] //血量

        this.event = towerDict[this.type]["events"]

    }

    render(animate){
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.shadowColor = gradeColor[this.currentGrade];
        ctx.shadowOffsetY = 10**-10
        ctx.drawImage(toDom("resources/towers/TowerBase2.png"), this.canvasX+3, this.canvasY+3, size-6, size-6)
        
        ctx.restore();
        ctx.drawImage(toDom("resources/IconOutline2.png"), this.canvasX+10, this.canvasY+10, size-20, size-20)
        ctx.drawImage(toDom(this.image) , this.canvasX+14, this.canvasY+14, size-28, size-28)

        this.onselect()
    }

    onselect(){
        if (currentGrid[0] == this.x && currentGrid[1] == this.y){
            //画圆
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.canvasX+size/2, this.canvasY+size/2, this.parameters["AttackRange"], 0 ,2*Math.PI);
            ctx.fillStyle="#ffffff3a"
            ctx.globalAlpha = 0.5;
            ctx.fill()
            ctx.restore();
        }
    }

    sell(){}

    //升级
    upgrade(upgrade_type){
        this.parameters = this.upgradePara[upgrade_type]
        this.hp = this.parameters["MaxHealth"]
        money -= this.upgradePara[upgrade_type]["Cost"]["money"]
        crystal -= this.upgradePara[upgrade_type]["Cost"]["crystal"]
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

