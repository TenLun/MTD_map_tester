import { eventsListening } from "../event.js";
import { changeChosenTower, chosenTowerList } from "../UI.js";
import { towerDataDict } from "../gameDatas/gameResouces.js";
import { imgToDom } from "../utils/covertToDOM.js";

export class ChangChosenTowerBtn { 
    /**
     * @constructor
     * @param {HTMLDivElement} UIcontainer 
     * @param {TowerChooseUI} towerChooseUI 
     */
    constructor(UIcontainer,towerChooseUI) {
        this.UIcontainer = UIcontainer
        this.towerChooseUI = towerChooseUI
        this.Init()
    }
    Init() {
        this.changeChosenTowerButton = document.createElement("div");
        this.changeChosenTowerButton.style.cssText = `
            align-content:center;
            text-align:center;
            user-select:none;
            background-color:#131313;
            border-radius:5px;
            padding:10px;
            width:150px;
            height:70px;
            position:fixed;
            font-size:35px;
            left:270px; bottom:10px; color:white
        `
        this.changeChosenTowerButton.innerHTML = "防御塔"

        this.UIcontainer.appendChild(this.changeChosenTowerButton)
        this.changeChosenTowerButton.addEventListener("click", () => {
            this.onClick()
        })
    }

    onClick() {
        this.towerChooseUI.open()
    }
}

//选择塔界面
export class TowerChooseUI {
    constructor(UIcontainer) {
        this.UIcontainer = UIcontainer
        this.Init()
    }
    Init(){
        this.cover = document.createElement("div")
        this.cover.style.cssText = `
            width:100vw;
            height:100vh;
            position:fixed;left:0px; bottom:0px;
            background-color: #0000007c;
            display:none;
            align-items: center;
            justify-content: center;
        `
        this.TowerChooseBg = document.createElement("div");
        this.TowerChooseBg.id = 'change-chosen-tower-ui'

        this.TowerChooseTitle = document.createElement("a")
        this.TowerChooseTitle.style.gridArea = "title";
        this.TowerChooseTitle.innerHTML = "选择防御塔"
        

        this.closeBtn = imgToDom("/resources/UI/icon_common_27.png",60,60)
        Object.assign(this.closeBtn.style,{
            position:"absolute",
            right: "10px",
            top:"10px",
        })
        this.closeBtn.addEventListener("click",()=>{ this.close()})
        
        this.TowerChooseBg.appendChild(this.TowerChooseTitle)
        this.chosenTowersDisplay = new ChosenTowersDisplay(this.TowerChooseBg)
        new TowersDisplay(this.TowerChooseBg,this.chosenTowersDisplay.chosenTowerDisplayContainer)
        
        this.TowerChooseBg.appendChild(this.closeBtn)
        this.cover.appendChild(this.TowerChooseBg)
        this.UIcontainer.appendChild(this.cover)
    }
    open(){
        this.TowerChooseBg.style.visibility = "visible"
        this.TowerChooseBg.style.display = "grid"
        this.cover.style.visibility = "visible"
        this.cover.style.display = "flex"
    }
    close(){
        changeChosenTower(chosenTowerList,this.UIcontainer)
        this.TowerChooseBg.style.visibility = "hidden"
        this.TowerChooseBg.style.display = "none"
        this.cover.style.display = "none"
        this.cover.style.visibility = "hidden"
    }
}

//右侧展示导入的所有塔
export class TowersDisplay{
    constructor(UIcontainer,chosenTowerDisplayContainer) {
        this.UIcontainer = UIcontainer
        this.chosenTowerDisplayContainer = chosenTowerDisplayContainer
        this.Init()
    }
    Init(){
        this.towersDisplayBg = document.createElement("div");
        this.towersDisplayBg.id = 'tower-display'

        this.towerElementContainer = document.createElement("div");
        this.towerElementContainer.id = 'tower-display-container'

        for (const towerData in towerDataDict){
            new TowerElement(this.towerElementContainer, towerDataDict[towerData], this.chosenTowerDisplayContainer)
        }
        this.towersDisplayBg.appendChild(this.towerElementContainer)
        this.UIcontainer.appendChild(this.towersDisplayBg)
    }
}

//展示塔元素
export class TowerElement{
    constructor(UIcontainer,towerData,chosenTowerDisplayContainer) {
        /**@type {import("../gameDatas/gameResouces").towerData} */
        this.towerData = towerData
        this.UIcontainer = UIcontainer
        this.chosenTowerDisplayContainer = chosenTowerDisplayContainer
        this.Init()
    }
    Init(){
        this.towerElementBg = document.createElement("div");
        this.towerElementBg.className = "TowerSelectElement"
        this.towerElementBg.addEventListener("click",()=>{this.onClick()})
        eventsListening.push([()=>{this.event()},"chooseTowerBtn"])
        
        this.towerElementType = document.createElement("a");
        this.towerElementType.innerText = this.towerData['type']

        this.towerElementImg = imgToDom(this.towerData['image'],40,40)

        this.towerElementBg.appendChild(this.towerElementImg)
        this.towerElementBg.appendChild(this.towerElementType)

        this.UIcontainer.appendChild(this.towerElementBg)
    }
    onClick(){
        if (chosenTowerList.includes(this.towerData['type'])) return;
        new TowerElementSimple(this.chosenTowerDisplayContainer, this.towerData)
        chosenTowerList.push(this.towerData['type'])
    }

    event(){
        if (chosenTowerList.includes(this.towerData['type'])) {
            this.towerElementBg.style.backgroundColor = "#FF0000"
            return;
        }
        this.towerElementBg.style.backgroundColor = "#464646"
        
    }
}

//左侧展示已选择的塔
export class ChosenTowersDisplay{
    constructor(UIcontainer) {
        this.UIcontainer = UIcontainer
        this.Init()
    }
    Init(){
        this.chosenTowersDisplayBg = document.createElement("div");
        this.chosenTowersDisplayBg.id = 'chosen-tower-display'

        this.chosenTowerDisplayContainer = document.createElement("div");
        this.chosenTowerDisplayContainer.id = 'chosen-tower-display-container'

        for (const towerData of chosenTowerList){
            new TowerElementSimple(this.chosenTowerDisplayContainer, towerDataDict[towerData])
        }
        this.chosenTowersDisplayBg.appendChild(this.chosenTowerDisplayContainer)
        this.UIcontainer.appendChild(this.chosenTowersDisplayBg)
    }
}

//展示塔元素,精简版
export class TowerElementSimple{
    constructor(UIcontainer,towerData) {
        /**@type {import("../gameDatas/gameResouces").towerData} */
        this.towerData = towerData
        this.UIcontainer = UIcontainer
        this.Init()
    }
    Init(){
        this.chosenTowerElementBg = document.createElement("div");
        this.chosenTowerElementBg.className = "TowerSelectElement"
        this.chosenTowerElementBg.addEventListener("click",()=>{this.onClick()},{once:true})
        
        this.chosenTowerElementType = document.createElement("a");
        this.chosenTowerElementType.innerText = this.towerData['type']

        this.chosenTowerElementImg = imgToDom(this.towerData['image'],40,40)

        this.chosenTowerElementBg.appendChild(this.chosenTowerElementImg)
        this.chosenTowerElementBg.appendChild(this.chosenTowerElementType)

        this.UIcontainer.appendChild(this.chosenTowerElementBg)
    }
    onClick(){
        this.chosenTowerElementBg.removeEventListener("click",()=>{this.onClick()})
        this.chosenTowerElementBg.removeChild(this.chosenTowerElementImg)
        this.chosenTowerElementBg.removeChild(this.chosenTowerElementType)
        this.UIcontainer.removeChild(this.chosenTowerElementBg)

        let index = chosenTowerList.indexOf(this.towerData['type']);
        chosenTowerList.splice(index,1);
    }
}