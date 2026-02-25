//这里也使用DOM
import { getTower,currentGrid } from "./utils/floorFuncs.js"
import { eventsListening } from "./event.js"
import { towerList,
    TOTALDAYS,tick,money,crystal} from "./gameArguments.js"
import { WealthShow } from "./UI/WealthShow.js"
import { StateBtn } from "./UI/StateBtn.js"
import { DayShow } from "./UI/DayShow.js"
import { BeginBtn } from "./UI/BeginBtn.js"
import { Info } from "./UI/Info.js"
import { TowerChooseButton } from "./UI/TowerChooseBtn.js"
import { UpgradeBtn } from "./UI/UpgradeBtn.js"


//选择的塔
var towersChoose = ["arrowtower", "goldmine", "multiplearrowtower", "temporaryarrowtower","wall"]

/**@type {TowerChooseButton[]} */
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

export function UIInit() {
    var towerInformation = new Info();
    eventsListening.push([function () { towerInformation.onChange(currentGrid) }, "event"])

    var dayShow = new DayShow(TOTALDAYS, tick)
    eventsListening.push([function () { dayShow.onChange() }, "event"])

    const pauseBtn = new StateBtn("pause", 470, 9)
    eventsListening.push([function () { pauseBtn.event() }, "pause"])
    const startBtn = new StateBtn("start", 430, 9)
    eventsListening.push([function () { startBtn.event() }, "start"])

    const beginBtn = new BeginBtn()

    const displaymoney = new WealthShow(money, 10, 0)
    eventsListening.push([function () { displaymoney.onChange(money) }, "moneyChange"])

    const displaycrystal = new WealthShow(crystal, 130, 0)
    eventsListening.push([function () { displaycrystal.onChange(crystal) }, "crystal"])

    for (var tower in towersChoose) {
        chooseButtonList.push(new TowerChooseButton(tower, towersChoose[tower], 60))
    }
}