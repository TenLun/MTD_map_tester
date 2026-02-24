import { getTower,currentGrid } from "../utils/floorFuncs.js"
import { towerList,money,crystal } from "../gameArguments.js"
import { toDom } from "../utils/covertToDOM.js"
import { gradeImage } from "../gameDatas/gameResouces.js"
import { eventsListening } from "../event.js"
import { upgradeButtonList } from "../UI.js"
// 升级按钮
export class UpgradeBtn {
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
        this.upgradeButton.style.cssText = `
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
        document.getElementById("ui_container").removeChild(this.upgradeButton);
    }

    onClick() {
        if (!this.IfAddClickEvent) return;
        this.tower.upgrade(this.upgradeType)
        this.delete()
    }
}