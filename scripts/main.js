//全部渲染
function renderAll() {
    container.style.left = offset[0] + "px"
    container.style.top = offset[1] + "px"
    render_map() //地图块在最底下
    render_tower() //塔的图层占中
    render_monster()
    render_cannon()
    //render_text() //最上面是文字
    tempCtx.drawImage(c, 0, 0)
}

function Time(){
    if (STATE == "pause" || day == DAYS.length) return;
    tick += 1
    if (tick >= eval(DAYS[day].join("+")) ){
        day += 1
        tick = 0
    }
}

//执行添加的事件
function runEvents() {
    if (eventsListening == 0) return;
    for (events in eventsListening) {
        eventsListening[events][0]()
    }
}
window.setInterval(runEvents, 10)

// [function,id]
eventsListening = []

function start() {
    tempCanvas = document.getElementById("main_canvas"); //最终渲染的canvas
    tempCtx = tempCanvas.getContext('2d');

    c = document.createElement('canvas'); // 新建一个 canvas 作为缓存 canvas
    canvasWidth = c.width = tempCanvas.width = 1448;
    canvasHeight = c.height = tempCanvas.height = 750;
    ctx = c.getContext("2d");

    container = document.getElementById("map_container");

    //地图格子大小 以后变为放大倍率
    size = 60
    offset = [70, 30] //地图偏移量 [x,y] px

    //游戏时间 100 tick = 1s
    tick = 0 
    day = 0

    // 游戏状态 "pause" "start" "2x"
    STATE = "pause" 

    //地图数据
    money = level_data["money"] || 0
    crystal = level_data["crystal"] || 0
    DAYS = level_data["days"] || 1 //数据内单位是tick

    floor_data = level_data["map"]
    tower_data = level_data["tower"]
    level_width = level_data["width"]
    level_height = level_data["height"]

    floor_init()
    tower_init()
    UIInit()
    get_target()

    eventsListening.push([renderAll, "render"])
    eventsListening.push([Time, "main_event"])
}

function MainLoop() {
    
}