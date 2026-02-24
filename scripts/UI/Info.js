import { toDom,imgToDom } from "../utils/covertToDOM.js"
import { getTower } from "../utils/floorFuncs.js"
import { towerList } from "../gameArguments.js"
import { imageUI } from "../gameDatas/gameResouces.js"
//选中塔信息
export class Info {

    //@param grid 选中的地板地图坐标

    constructor() {
        this.Init()
        this.grid = []
        this.towerObj = {}
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

        this.informationbar.appendChild(this.name)
        this.informationbar.appendChild(this.hp)
        this.informationbar.appendChild(this.towerImage)
        this.informationbar.appendChild(this.divider)
        this.informationbar.appendChild(this.detail)
        this.informationbar.appendChild(this.dividerbottom)
        document.getElementById("ui_container").appendChild(this.informationbar)
        /*
        this.sellButton = document.createElement("div");
        this.sellButton.style.cssText = `
            text-align: center;
            user-select: none;
            background-color: #131313;
            border-radius: 5px;
            padding: 10px;
            width: 70px;
            height: 70px;
            position: fixed;
            left: 50vw;
            bottom: 30px;
        `
        //图片
        this.sellImage = toDom("/resources/UI/icon_shopping_1.png")
        this.sellImage.width = 55
        this.sellImage.height = 55
        this.sellImage.style.pointerEvents = "none";
        //文字
        this.sellMoney = document.createElement("a");
        this.sellMoney.innerHTML = this.tower.upgradePara[this.upgradeType]["Cost"]["money"];
        this.sellMoney.style.pointerEvents = "none";

        this.sellCrystal = document.createElement("a");
        this.sellCrystal.innerHTML = "+" + this.tower.upgradePara[this.upgradeType]["Cost"]["crystal"] + "C";
        this.sellCrystal.style.pointerEvents = "none";
        this.sellButton.appendChild(this.sellImage)
        this.sellButton.appendChild(this.sellMoney)
        this.sellButton.appendChild(this.sellCrystal) */
    }

    onChange(grid) {

        this.grid = grid || this.grid
        this.towerObj = getTower(towerList, this.grid[0], this.grid[1]) //拿到目前tower对象

        //如果不是塔
        if (this.towerObj.type == undefined) {
            this.informationbar.style.display = 'none';
            return;
        }
        this.informationbar.style.display = '';
        if (this.towerObj.hp == this.hp.innerHTML) return;

        //真正部分
        this.name.innerHTML = this.towerObj.type
        this.hp.innerHTML = this.towerObj.hp
        this.towerImage.src = this.towerObj.image

        this.towerObj = this.towerObj.parameters

        this.detail.style.display = "flex";
        this.detail.style.flexWrap = "wrap";
        this.detail.innerHTML = ""
        for (var information in this.towerObj) {
            if (!(information == "Cost")) {
                this.param = document.createElement("div");
                this.param.style.width = "100px"

                this.param.appendChild(imgToDom(imageUI[information][0], 20, 20, imageUI[information][1]))

                this.paramtext = document.createElement("a")
                this.paramtext.style.color = "white"
                this.paramtext.innerHTML = this.towerObj[information]

                this.param.appendChild(this.paramtext)
                this.detail.appendChild(this.param)
            }
        }
    }

    onSellBtnClick() {
        if (!this.IfAddClickEvent) return;
        this.tower.upgrade(this.upgradeType)
        towerInformation.onChange(currentGrid)
        this.delete()
    }
}