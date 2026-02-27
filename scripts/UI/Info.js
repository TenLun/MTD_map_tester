import { toDom,imgToDom } from "../utils/covertToDOM.js"
import { getTower,currentGrid} from "../utils/floorFuncs.js"
import { towerList } from "../gameArguments.js"
import { imageUI } from "../gameDatas/gameResouces.js"
import { Tower } from "../tower.js"
import { eventsListening } from "../event.js"
//选中塔信息
export class Info {

    //@param grid 选中的地板地图坐标

    constructor(UIcontainer) {
        this.UIcontainer = UIcontainer;
        this.grid = [];
        this.towerObj = {};
        this.Init()
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

        this.towerImage = toDom("");
        this.towerImage.style.cssText=`
            position:absolute;
            right:10px;
            top: 10px;
            width: 30px;
            height: 30px;
        `
        // 展示参数
        this.divider = document.createElement("hr")
        this.detail = document.createElement("div")
        this.dividerbottom = document.createElement("hr")

        this.sellButton = document.createElement("div");
        this.sellButton.style.cssText = `
            text-align: center;
            background-color: #131313;
            border-radius: 5px;
            padding: 10px;
            width: 125px;
            height: 35px;
            position: absolute;
            top: -60px
        `
        //图片
        this.sellImage = toDom("/resources/UI/icon_shopping_1.png")
        this.sellImage.style.cssText = `
            pointer-events: none;
            position:absolute;
            left:5px;
            bottom:5px;
        `
        this.sellImage.width = 55;
        this.sellImage.height = 75;
        //文字
        this.sellMoney = document.createElement("a");
        this.sellMoney.style.cssText = `
            pointer-events: none;
            color:white;
            position: absolute;
            font-size:25px;
            left:65px
        `
        this.sellCrystal = document.createElement("a");
        this.sellCrystal.style.cssText = `
            pointer-events: none;
            color:white;
            position: absolute;
            font-size:19px;
            left:93px;
            top:18px;
        `

        this.sellButton.appendChild(this.sellImage)
        this.sellButton.appendChild(this.sellMoney)
        this.sellButton.appendChild(this.sellCrystal)

        this.informationbar.appendChild(this.sellButton)
        this.informationbar.appendChild(this.name)
        this.informationbar.appendChild(this.hp)
        this.informationbar.appendChild(this.towerImage)
        this.informationbar.appendChild(this.divider)
        this.informationbar.appendChild(this.detail)
        this.informationbar.appendChild(this.dividerbottom)

        eventsListening.push([()=>{ this.onChange(currentGrid) }, "event"])

        this.UIcontainer.appendChild(this.informationbar)
    }

    onChange(grid) {

        this.grid = grid || this.grid

        /**@type {Tower} */
        this.towerObj = getTower(towerList, this.grid[0], this.grid[1]) //拿到目前tower对象

        //如果不是塔
        if (this.towerObj.type == undefined) {
            this.informationbar.style.display = 'none';
            return;
        }
        this.informationbar.style.display = '';

        //如果信息没有变化
        if (this.towerObj.id + JSON.stringify(this.towerObj.parameters) + this.towerObj.hp.toString() == this.lastTowerCache) return;
        this.lastTowerCache = this.towerObj.id + JSON.stringify(this.towerObj.parameters) + this.towerObj.hp.toString() //保存信息

        //真正部分
        this.name.innerHTML = this.towerObj.type
        this.hp.innerHTML = this.towerObj.hp
        this.towerImage.src = this.towerObj.image

        console.log(this.towerObj.parameters)
        this.sellMoney.innerHTML = this.towerObj.parameters.Cost.money;
        this.sellCrystal.innerHTML = `+${this.towerObj.parameters["Cost"]["crystal"] || 0 }C`

        this.detail.style.display = "flex";
        this.detail.style.flexWrap = "wrap";
        this.detail.innerHTML = ""
        for (var information in this.towerObj.parameters) {
            if (!(information == "Cost")) {
                this.param = document.createElement("div");
                this.param.style.width = "100px"

                this.param.appendChild(imgToDom(imageUI[information][0], 20, 20, imageUI[information][1]))

                this.paramtext = document.createElement("a")
                this.paramtext.style.color = "white"
                this.paramtext.innerHTML = this.towerObj.parameters[information]

                this.param.appendChild(this.paramtext)
                this.detail.appendChild(this.param)
            }
        }
        var that = this;
        this.sellButton.addEventListener("click",()=>{that.onSellBtnClick(that.towerObj)},{once:true})
    }

    onSellBtnClick(towerObj) {
        towerObj.sell()
        this.sellButton.removeEventListener("click",()=>{that.onSellBtnClick()})
    }
}