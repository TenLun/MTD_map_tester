//整个大类型叫floor
/*
floorDict["hill"] = {
    "name":"hill",
    "image": "resources/floors/Hill.png"
}

"map":[
        {"type":"hill","position":[0,0]},
    ]
*/

floorDict={}

floorsList = [];

//刷新地板 到 floorsList 里
function floor_init(){
    for (var floor in floor_data){
        var [floor_x,floor_y] = floor_data[floor]["position"]
        var floor_type = floor_data[floor]["type"]
        
        floorsList.push(new Ground(floor_x,floor_y,floor_type))
    }
}

//事件监听
function render_map(){
    ctx.save()
    ctx.fillStyle = "#414141"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    for (var floor in floorsList){
        floorsList[floor].render()
    }
}

/*
function click_map(){
    for (var floor in floorsList){
        floorsList[floor].onClick()
    }
}
eventsListening.push(click_map)
*/


class Ground{
    
    constructor(x,y,type) {
        
        //相对地图格子上的坐标
        this.x = x
        this.y = y
        this.size = size
        this.width = size
        this.height = size

        //真实坐标 px (左上)
        this.canvasX = this.x*(size+1)
        this.canvasY = this.y*(size+1)
        this.type = type
        this.image =  floorDict[type]["image"]

    }

    //不仅是渲染 还有渲染时调用事件
    render(){
        ctx.drawImage(toDom(this.image), this.canvasX, this.canvasY, size, size)
        this.onHover()
    }

    onHover(){
        if (getCurrentPosition()[0] > this.canvasX && getCurrentPosition()[0] < this.canvasX+this.width &&
        getCurrentPosition()[1] > this.canvasY && getCurrentPosition()[1] < this.canvasY+ this.height){

            ctx.drawImage(toDom("resources/ButtonSelectLine3.png"), this.canvasX, this.canvasY, size, size)

            //预显
            if (currentTower) {
                ctx.save();
                ctx.globalAlpha = 0.5;
                ctx.shadowColor = 'rgba(0,256,0,99)';
                //没有塔，地板可以放置
                if (getTower(this.x,this.y) || !(towerDict[currentTower]['floor'].includes(this.type))) {
                    ctx.shadowColor = 'rgba(256,0,0,99)';
                }
                
                ctx.shadowOffsetY = 10**-10
                ctx.drawImage(toDom("resources/towers/TowerBase2.png"), this.canvasX+3, this.canvasY+3, size-6, size-6)                
                ctx.drawImage(toDom("resources/IconOutline2.png"), this.canvasX+8, this.canvasY+8, size-16, size-16)
                ctx.drawImage(toDom(towerDict[currentTower]["image"]) , this.canvasX+14, this.canvasY+14, size-28, size-28)
                ctx.restore();
            }
            if (mouseDown) {
                this.onClick()
                ctx.save()
                ctx.fillStyle = '#ffff0077';
                ctx.fillRect(this.canvasX, this.canvasY, size, size);
                ctx.restore()
            }
        }
    }

    //地板被点击切换当前选中塔
    onClick(){
        currentGrid = [this.x,this.y]
        //没有塔，地板可以放置
        if (currentTower && !getTower(this.x,this.y) && towerDict[currentTower]['floor'].includes(this.type) ) {
            add_tower(this.x,this.y,currentTower)
            //刷新CD
            for (var ele in chooseButtonList){
                if (chooseButtonList[ele].tower == currentTower){
                    chooseButtonList[ele].delayCD = 0
                }
            }
            currentTower = ""
        }
        changeTowerInfo(currentGrid)
        
    }
}


tempCanvas = document.getElementById("main_canvas"); //最终渲染的canvas


//移动
tempCanvas.onmousedown = function(event) {
    if (event.button != 2) return 
    let shiftX = event.clientX - offset[0];
    let shiftY = event.clientY - offset[1];

    moveAt(event.pageX, event.pageY);
  
    // 移动现在位于坐标 (pageX, pageY) 上的
    // 将初始的偏移考虑在内
    function moveAt(pageX, pageY) {
        offset[0] = pageX - shiftX;
        offset[1] = pageY - shiftY;
    }
  
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }
  
    // 在 mousemove 事件上移动
    document.addEventListener('mousemove', onMouseMove);
  
    // 放下，并移除不需要的处理程序
    tempCanvas.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        tempCanvas.onmouseup = null;
    };
    event.preventDefault()
};

document.addEventListener("contextmenu", (event) => { event.preventDefault(); });