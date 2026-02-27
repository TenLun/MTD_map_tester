//这里也使用DOM
import { getTower } from "./utils/floorFuncs.js"
import { towerList,
    TOTALDAYS,tick,money,crystal} from "./gameArguments.js"

import { WealthShow } from "./UI/WealthShow.js"
import { StateBtn } from "./UI/StateBtn.js"
import { DayShow } from "./UI/DayShow.js"
import { BeginBtn } from "./UI/BeginBtn.js"
import { Info } from "./UI/Info.js"
import { TowerChooseButton } from "./UI/TowerChooseBtn.js"
import { UpgradeBtn } from "./UI/UpgradeBtn.js"
import { ChangChosenTowerBtn, TowerChooseUI } from "./UI/ChangeChosenTower.js"


/**@type {TowerChooseButton[]} */
export var chooseButtonList = []
/**@type {UpgradeBtn[]} */
export var upgradeButtonList = []


//选择的塔
export var chosenTowerList = ["arrowtower", "goldmine", "multiplearrowtower", "temporaryarrowtower","wall"]
export function changeChosenTower(changeChosenTowerList,UIcontainer){
    for (const chooseBtn of chooseButtonList) {
        chooseBtn.delete()
    }
    chooseButtonList.length = 0;
    console.log(changeChosenTowerList,chooseButtonList)
    for (const tower in changeChosenTowerList) {
        chooseButtonList.push(new TowerChooseButton(tower, chosenTowerList[tower], UIcontainer))
    }
}

//当前选中塔改变
export function changeTowerInfo(grid) {
    var tower = getTower(towerList, grid[0], grid[1])
    if (tower.type == undefined) return;                            //如果不是塔
    if (upgradeButtonList.length != 0) return;                      //如果按钮已存在

    var grade = tower.upgradeTree[tower.currentGrade]               
    if (grade == undefined) return;                                 //如果没有升级数
    if (typeof grade == 'string' ){
        upgradeButtonList.push(new UpgradeBtn(grid, grade))
    } else if (typeof grade == 'object') {
        for (const gradeName of grade){
            upgradeButtonList.push(new UpgradeBtn(grid, gradeName))
        }
    }
}



export function UIInit() {
    const UIcontainer = document.getElementById("ui_container")
    
    new Info(UIcontainer);
    new DayShow(TOTALDAYS, tick, UIcontainer);
    new StateBtn("pause", 470, 9, UIcontainer);
    new StateBtn("start", 430, 9, UIcontainer);
    new WealthShow(money, 10, 0, UIcontainer);
    new WealthShow(crystal, 130, 0, UIcontainer);
    const changeChosenTowerUI = new TowerChooseUI(UIcontainer);
    new BeginBtn(UIcontainer)
    new ChangChosenTowerBtn(UIcontainer,changeChosenTowerUI)

    changeChosenTower(chosenTowerList,UIcontainer)
}