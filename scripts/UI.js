//这里也使用DOM
import { getTower,currentGrid } from "./utils/floorFuncs.js"
import { toDom,imgToDom } from "./utils/covertToDOM.js"
import { eventsListening } from "./event.js"
import { towerList,setState,
    TOTALDAYS,tick,day,money,crystal, 
    STATE} from "./gameArguments.js"
import { towerDataDict } from "./towers/towerDict.js"
import { spawn_monster } from "./monster.js"


//参数的值
const imageUI = {
    "pause": ['resources/UI/icon_common_24.png', "#000000"],
    "start": ['resources/UI/icon_arrow_14.png', "#000000"],

    "AttackPower": ['resources/UI/AttackPower.png', '#ffff00'],
    "AttackRange": ['resources/UI/AttackRange.png', '#00ff00'],
    "AttackTime": ['resources/UI/AttackTime.png', '#00ffff'],
    "BulletNumber": ['resources/UI/BulletNumber.png', 'yellow'],
    "MaxHealth": ['resources/UI/MaxHealth.png', '#ff0000'],
    "Gold": ['resources/UI/MoneyProduction.png', '#ffff00'],
    "Crystal": ['resources/UI/RockProduction.png', '#ff00ff'],
}
// 等级颜色
export const gradeColor = {
    "0": 'rgb(0,0,0)',
    "1": 'rgb(0,255,0)',
    "2": 'rgb(0, 61, 255)',
    "3": 'rgb(255,0,255)'
}

// 等级图标
const gradeImage = {
    "1": 'resources/UI/BaseUpgrade.png',
    "2": 'resources/UI/PromoteUpgrade.png',
    "choose1": '',
}

//选择的塔
var towersChoose = ["arrowtower", "goldmine", "multiplearrowtower", "temporaryarrowtower"]
//当前选择的塔
export var currentTower = ""
export function setCurrentTower(value){
    currentTower = value
}

export var chooseButtonList = []
export var upgradeButtonList = []

//当前选中塔改变
export function changeTowerInfo(grid) {

    //如果不是塔
    var tower = getTower(towerList, grid[0], grid[1])
    if (tower.type == undefined) return;

    if (tower.currentGrade == 3 && upgradeButtonList.length < 3) {
        //?
    } else if (upgradeButtonList.length == 0) {
        if (tower.upgradeTree[tower.currentGrade] == undefined) return;
        upgradeButtonList.push(new UpgradeBtn(grid, tower.upgradeTree[tower.currentGrade]))
    }
}

function changeChooseTower() {

}

//塔类选择
class Button {
    constructor(number, tower, size) {
        this.number = number
        this.tower = tower
        this.size = size

        this.id = Math.ceil(Math.random() * 10000000)
        this.Init()
    }

    Init() {
        this.chooseButton = document.createElement("div")
        this.chooseButton.style.userSelect = 'none';
        this.chooseButton.style.backgroundColor = "#414141";
        this.chooseButton.style.borderRadius = "5px";
        this.chooseButton.style.padding = "1px";
        this.chooseButton.style.width = this.size + "px";
        this.chooseButton.style.height = this.size + "px";
        this.chooseButton.style.position = 'absolute';
        this.chooseButton.style.display = 'flex';
        this.chooseButton.style.flexDirection = 'column';
        this.chooseButton.style.pointerEvents = "auto";
        this.chooseButton.style.top = 70 + 65 * this.number + "px";
        this.chooseButton.style.left = "10px";

        this.image = toDom(towerDataDict[this.tower]["image"]);
        this.image.style.margin = "auto";
        this.image.style.width = this.size / 2 + "px";
        this.image.style.height = this.size / 2 + "px";
        this.image.style.pointerEvents = "none";

        this.costText = document.createElement("div")
        this.costText.innerHTML = towerDataDict[this.tower]["parameters"][0]["Cost"];
        this.costText.style.margin = 'auto';
        this.costText.style.color = 'rgb(0,255,0)';
        this.costText.style.pointerEvents = "none";

        this.mask = document.createElement("div")
        this.mask.style.cssText = "position:absolute; opacity:0.2; background-color:white;width:100%"

        this.chooseButton.appendChild(this.image);
        this.chooseButton.appendChild(this.costText);
        this.chooseButton.appendChild(this.mask);
        document.getElementById("ui_container").appendChild(this.chooseButton);

        this.delayCD = towerDataDict[this.tower]["parameters"]["delay"]

        this.IfOnHover = 0
        var that = this;

        eventsListening.push([function () { that.animate() }, "chooseBtn-" + this.id]);

        this.chooseButton.addEventListener("click", function () {
            that.onClick()
        });
        this.chooseButton.addEventListener("mouseenter", function () {
            that.onHover()
        });
        this.chooseButton.addEventListener("mouseleave", function () {
            that.onOut()
        });

    };

    animate() {
        if (money < towerDataDict[this.tower]["parameters"][0]["Cost"]) {
            if (currentTower == this.tower) currentTower = ""
            this.costText.style.color = 'rgb(255,0,0)';
        } else {
            this.costText.style.color = 'rgb(0,255,0)';
        }
        this.mask.style.height = (towerDataDict[this.tower]["parameters"]["delay"] - this.delayCD) / towerDataDict[this.tower]["parameters"]["delay"] * 100 + "%"
        this.mask.style.top = this.delayCD / towerDataDict[this.tower]["parameters"]["delay"] * 100 + "%"
        if (this.delayCD < towerDataDict[this.tower]["parameters"]["delay"]) {
            if (currentTower == this.tower) currentTower = ""
            this.delayCD += 1
        }
    }

    onClick() {
        if (currentTower == this.tower) {
            currentTower = ""
        } else {
            currentTower = this.tower
        }
    }

    onHover() {
        this.chooseImg = toDom("/resources/IconOutLine2.png")
        this.chooseImg.style.position = 'absolute';
        this.chooseImg.style.width = "60px"
        this.chooseImg.style.height = "60px"
        this.chooseImg.style.top = "1px"
        this.chooseButton.appendChild(this.chooseImg)
    }
    onOut() {
        this.chooseButton.removeChild(this.chooseImg)
    }
}

//开始游戏
class BeginBtn {
    constructor() {
        this.Init()
    }
    Init() {
        this.startButton = document.createElement("div");
        this.startButton.style.cssText = 'text-align:center;\
                                        user-select:none;\
                                        background-color:#131313;\
                                        border-radius:5px;\
                                        padding:10px;\
                                        width:150px;\
                                        height:70px;\
                                        position:fixed;\
                                        left:0px; bottom:0px; color:white'
        this.startButton.innerHTML = "开始游戏"

        document.getElementById("ui_container").appendChild(this.startButton)

        var that = this
        this.startButton.addEventListener("click", function () {
            that.onClick()
        })
    }

    onClick() {
        spawn_monster()
    }
}

// 升级按钮
class UpgradeBtn {
    constructor(grid, upgradeType) {
        this.id = "upgradeBtn-" + Math.ceil(Math.random() * 10000000)
        this.grid = grid
        this.upgradeType = upgradeType || 1

        this.tower = getTower(towerList,this.grid[0], this.grid[1])

        this.Init()
    }
    Init() {

        //主体
        this.upgradeButton = document.createElement("div");
        this.upgradeButton.style.textAlign = "center"
        this.upgradeButton.style.userSelect = 'none';
        this.upgradeButton.style.backgroundColor = "#131313"
        this.upgradeButton.style.borderRadius = "5px"
        this.upgradeButton.style.padding = "10px"
        this.upgradeButton.style.width = "70px"
        this.upgradeButton.style.height = "70px"
        this.upgradeButton.style.position = 'fixed';
        this.upgradeButton.style.left = '50vw';
        this.upgradeButton.style.bottom = '30px';
        //图片
        this.upgradeImage = toDom(gradeImage[this.upgradeType])
        this.upgradeImage.width = 55
        this.upgradeImage.height = 55
        this.upgradeImage.style.pointerEvents = "none";
        //文字
        this.upgradeMoney = document.createElement("a");
        this.upgradeMoney.innerHTML = this.tower.upgradePara[this.upgradeType]["Cost"]["money"];
        this.upgradeMoney.style.pointerEvents = "none";

        this.upgradeCrystal = document.createElement("a");
        this.upgradeCrystal.innerHTML = "+" + this.tower.upgradePara[this.upgradeType]["Cost"]["crystal"] + "C";
        this.upgradeCrystal.style.pointerEvents = "none";

        this.upgradeButton.appendChild(this.upgradeImage)
        this.upgradeButton.appendChild(this.upgradeMoney)
        this.upgradeButton.appendChild(this.upgradeCrystal)
        document.getElementById("ui_container").appendChild(this.upgradeButton)

        var that = this

        this.upgradeButton.addEventListener("click", function () {
            that.onClick()
        })
        this.IfAddClickEvent = 1;

        eventsListening.push([function () { that.onChange(currentGrid) }, this.id])
        eventsListening.push([function () { that.animate() }, this.id])
    }

    onChange(grid) {
        if (this.grid[0] == grid[0] && this.grid[1] == grid[1]) return;
        this.delete()
    }

    // 判断是否符合条件
    animate() {
        if (money < this.tower.upgradePara[this.upgradeType]["Cost"]["money"] || crystal < this.tower.upgradePara[this.upgradeType]["Cost"]["crystal"]) {
            this.IfAddClickEvent = 0;
            this.upgradeMoney.style.color = "red"
            this.upgradeCrystal.style.color = "red"
        } else {
            this.IfAddClickEvent = 1;
            this.upgradeMoney.style.color = "green"
            this.upgradeCrystal.style.color = "green"
        }
    }

    delete() {
        for (var events in eventsListening) {
            if (eventsListening[events][1] == this.id) {
                eventsListening.splice(events, 1)
            }
        }
        for (var button in upgradeButtonList) {
            if (upgradeButtonList[button].id == this.id) {
                upgradeButtonList.splice(button, 1)
            }
        }
        document.getElementById("ui_container").removeChild(this.upgradeButton)
    }

    onClick() {
        if (!this.IfAddClickEvent) return;
        this.tower.upgrade(this.upgradeType)
        towerInformation.onChange(currentGrid)
        this.delete()
    }
}

//选中地板信息
class Info {

    //@param grid 选中的地板地图坐标

    constructor() {
        this.Init()
        this.grid = []
        this.information = {}
    }

    Init() {
        this.informationbar = document.createElement("div")
        this.informationbar.style.cssText=`
            user-select: none;
            background-color: #131313;
            display: none;
            border-radius: 5px;
            padding: 10px;
            width: 300px;
            height: 150px;
            position: fixed;
            bottom: 0px;
            right: 0px;
        `
        this.name = document.createElement("div")
        this.name.style.color = "white"
        this.name.style.fontSize = "32px"
        this.name.innerHTML = "default"

        this.hp = document.createElement("div")
        this.hp.style.color = "green"
        this.hp.style.fontSize = "20px"
        this.hp.innerHTML = "0"

        this.towerImage = toDom("")
        this.towerImage.style.position = "absolute"
        this.towerImage.style.right = "10px"
        this.towerImage.style.top = "10px"
        this.towerImage.style.width = "30px"
        this.towerImage.style.height = "30px"

        this.divider = document.createElement("hr")

        // 展示参数
        this.detail = document.createElement("div")

        this.dividerbottom = document.createElement("hr")

        this.informationbar.appendChild(this.name)
        this.informationbar.appendChild(this.hp)
        this.informationbar.appendChild(this.towerImage)
        this.informationbar.appendChild(this.divider)
        this.informationbar.appendChild(this.detail)
        this.informationbar.appendChild(this.dividerbottom)
        document.getElementById("ui_container").appendChild(this.informationbar)
    }

    onChange(grid) {

        this.grid = grid || this.grid
        this.information = getTower(towerList, this.grid[0], this.grid[1])

        //如果不是塔
        if (this.information.type == undefined) {
            this.informationbar.style.display = 'none';
            return;
        } else {
            this.informationbar.style.display = '';
        }

        if (this.information.hp == this.hp.innerHTML) return;

        //真正部分
        this.name.innerHTML = this.information.type
        this.hp.innerHTML = this.information.hp
        this.towerImage.src = this.information.image

        this.information = this.information.parameters

        this.detail.style.display = "flex";
        this.detail.style.flexWrap = "wrap";
        this.detail.innerHTML = ""
        for (var information in this.information) {
            if (!(information == "Cost")) {
                this.param = document.createElement("div");
                this.param.style.width = "100px"

                this.param.appendChild(imgToDom(imageUI[information][0], 20, 20, imageUI[information][1]))

                this.paramtext = document.createElement("a")
                this.paramtext.style.color = "white"
                this.paramtext.innerHTML = this.information[information]

                this.param.appendChild(this.paramtext)
                this.detail.appendChild(this.param)
            }
        }
    }
}


//显示金币水晶
class WealthShow {
    constructor(variable, x, y) {
        this.variable = variable
        this.x = x
        this.y = y
        this.Init()
    }

    Init() {
        this.container = document.createElement("div")
        this.container.style.cssText=`
            user-select: none;
            background-color: #131313;
            border-radius: 5px;
            padding: 10px;
            width: 50px;
            height: 20px;
            position: absolute;
            text-align: center;
            top: ${this.y}px;
            left: ${this.x}px;
            color: white
        `
        this.container.innerHTML = this.variable
        document.getElementById("ui_container").appendChild(this.container)
    }

    onChange(variable) {
        if (variable != this.variable) {
            this.variable = variable
            this.container.innerHTML = this.variable
        }
    }
}

//天数
class DayShow {
    constructor(day_data, tick) {
        this.day_data = day_data
        this.tick = tick
        this.Init()
    }

    Init() {
        this.container = document.createElement("div")
        this.container.style.cssText=`
            user-select: none;
            background-color: #131313;
            border-radius: 5px;
            opacity: 0.8;
            padding: 10px;
            width: 400px;
            height: 50px;
            position: absolute;
            text-align: center;
            top: 1px;
            right: 1px;
            color: white;
        `
        this.days = document.createElement("a")
        this.days.innerHTML = "天数0";

        this.timebar = document.createElement("div")
        this.timebar.style.backgroundColor = "gray"
        this.timebar.style.width = "390px"
        this.timebar.style.height = "10px"
        this.timebar.style.display = "flex";
        this.timebar.style.position = "absolute"

        this.daytimebar = document.createElement("div");
        this.daytimebar.style.backgroundColor = "yellow"
        this.daytimebar.style.width = "0%"

        this.afternoonbar = document.createElement("div")
        this.afternoonbar.style.backgroundColor = "red"
        this.afternoonbar.style.width = "0%"

        this.nightbar = document.createElement("div")
        this.nightbar.style.backgroundColor = "purple"
        this.nightbar.style.width = "0%"

        this.timeSliderHander = toDom("resources/UI/TimeSliderHander.png");
        this.timeSliderHander.style.position = "absolute"
        this.timeSliderHander.style.width = "1px"
        this.timeSliderHander.style.height = "20px"
        this.timeSliderHander.style.top = this.timebar.style.height
        this.timeSliderHander.style.left = "0%"
        this.timeSliderHander.style.objectFit = "cover"
        this.timeSliderHander.style.overflow = "visible"

        this.timebar.appendChild(this.daytimebar)
        this.timebar.appendChild(this.afternoonbar)
        this.timebar.appendChild(this.nightbar)
        this.timebar.appendChild(this.timeSliderHander)
        this.container.appendChild(this.days)
        this.container.appendChild(this.timebar)
        document.getElementById("ui_container").appendChild(this.container)
    }

    onChange() {
        if (this.tick != tick) {
            this.days.innerHTML = `天数 ${day}`;
            this.daytimebar.style.width = (this.day_data[day][0] / eval(this.day_data[day].join("+")) * 100) + "%"
            this.afternoonbar.style.width = (this.day_data[day][1] / eval(this.day_data[day].join("+")) * 100) + "%"
            this.nightbar.style.width = (this.day_data[day][2] / eval(this.day_data[day].join("+")) * 100) + "%"
            this.timeSliderHander.style.left = (tick / eval(this.day_data[day].join("+")) * 100) + "%"
        }
    }
}

//游戏状态选择
class StateButton {
    constructor(state, right, y) {
        this.state = state;
        this.right = right;
        this.y = y;
        this.Init()
    }

    Init() {
        this.stateButton = document.createElement("div")
        this.stateButton.style.cssText = `
            user-select: none;
            background-color: #414141;
            border-radius: 5px;
            padding: 7px;
            width: 25px;
            height: 25px;
            position: absolute;
            display: flex;
            right: ${this.right}px;
            top: ${this.y}px;
        `
        this.image = toDom(imageUI[this.state][0]);
        this.image.style.width = "30px";
        if (this.state == "start") {
            this.image.style.width = "20px";
        }
        this.image.style.height = "30px";
        this.image.style.pointerEvents = "none";

        this.mask = document.createElement("div")
        this.mask.style.cssText = `
            position:absolute; 
            top:0px;
            left:0px;
            opacity:0;
            background-color:white;
            width:100%;
            height:100%
        `
        this.stateButton.appendChild(this.mask);

        this.stateButton.appendChild(this.image);
        document.getElementById("ui_container").appendChild(this.stateButton);

        var that = this;
        this.stateButton.addEventListener("click", function (event) {
            that.onClick(event)
        });
        this.stateButton.addEventListener("mouseenter", function (event) {
            that.onHover(event)
        });
        this.stateButton.addEventListener("mouseout", function (event) {
            that.onOut(event)
        });
    }

    onClick() {
        setState(this.state)
    }
    onHover() {
        this.stateButton.style.border = "1px solid white";
        this.stateButton.style.backgroundColor = "#515151";
    }
    onOut() {
        this.stateButton.style.border = "";
        this.stateButton.style.backgroundColor = "#414141";
    }
    //被选择
    onSelect(current_state) {
        if (current_state == this.state) {
            this.mask.style.opacity = "0.5"
        } else {
            this.mask.style.opacity = "0"
        }
    }

    event(){
        this.onSelect(STATE)
    }
}

export function UIInit() {
    var towerInformation = new Info();
    eventsListening.push([function () { towerInformation.onChange(currentGrid) }, "event"])

    var dayShow = new DayShow(TOTALDAYS, tick)
    eventsListening.push([function () { dayShow.onChange() }, "event"])

    const pauseBtn = new StateButton("pause", 470, 9)
    eventsListening.push([function () { pauseBtn.event() }, "pause"])
    const startBtn = new StateButton("start", 430, 9)
    eventsListening.push([function () { startBtn.event() }, "start"])

    const beginBtn = new BeginBtn()

    const displaymoney = new WealthShow(money, 10, 0)
    eventsListening.push([function () { displaymoney.onChange(money) }, "moneyChange"])

    const displaycrystal = new WealthShow(crystal, 130, 0)
    eventsListening.push([function () { displaycrystal.onChange(crystal) }, "crystal"])

    for (var tower in towersChoose) {
        chooseButtonList.push(new Button(tower, towersChoose[tower], 60))
    }
}

//import 进来的变量享有共同指针