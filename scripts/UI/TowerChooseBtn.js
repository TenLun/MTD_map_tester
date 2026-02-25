import { toDom } from "../utils/covertToDOM.js"
import { towerDataDict } from "../gameDatas/gameResouces.js"
import { eventsListening } from "../event.js"
import { money,currentTower, setCurrentTower } from "../gameArguments.js"
//塔类选择
export class TowerChooseButton {
    constructor(number, towerType, size) {
        this.number = number
        this.towerType = towerType
        this.size = size

        this.id = Math.ceil(Math.random() * 10000000)
        this.Init()
    }

    Init() {
        this.chooseButton = document.createElement("div")
        this.chooseButton.style.cssText = `
            user-select: none;
            pointer-events: auto;
            background-color: #414141;
            border-radius: 5px;
            padding: 1px;
            width: ${this.size}px;
            height: ${this.size}px;
            position: absolute;
            top: ${70 + 65 * this.number}px;
            left: 10px;
            display: flex;
            flex-direction: column;
        `
        this.image = toDom(towerDataDict[this.towerType]["image"]);
        this.image.style.margin = "auto";
        this.image.style.width = this.size / 2 + "px";
        this.image.style.height = this.size / 2 + "px";
        this.image.style.pointerEvents = "none";

        this.costText = document.createElement("div")
        this.costText.innerHTML = towerDataDict[this.towerType]["parameters"][0]["Cost"];
        this.costText.style.margin = 'auto';
        this.costText.style.color = 'rgb(0,255,0)';
        this.costText.style.pointerEvents = "none";

        this.mask = document.createElement("div")
        this.mask.style.cssText = "position:absolute; opacity:0.2; background-color:white;width:100%"

        this.chooseImg = toDom("/resources/UI/ButtonSelectLine2.png")
        this.chooseImg.style.position = 'absolute';
        this.chooseImg.style.width = "60px"
        this.chooseImg.style.height = "60px"
        this.chooseImg.style.top = "1px"
        this.chooseImg.style.opacity = "0.0"

        this.chooseButton.appendChild(this.image);
        this.chooseButton.appendChild(this.costText);
        this.chooseButton.appendChild(this.mask);
        this.chooseButton.appendChild(this.chooseImg);
        document.getElementById("ui_container").appendChild(this.chooseButton);

        this.delayCD = towerDataDict[this.towerType]["parameters"]["delay"]

        this.IfOnHover = 0
        var that = this;

        eventsListening.push([function () { that.event() }, "chooseBtn-" + this.id]);

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

    event() {
        if (money < towerDataDict[this.towerType]["parameters"][0]["Cost"]) {
            if (currentTower == this.towerType) setCurrentTower("")
            this.costText.style.color = 'rgb(255,0,0)';
        } else {
            this.costText.style.color = 'rgb(0,255,0)';
        }
        this.mask.style.height = (towerDataDict[this.towerType]["parameters"]["delay"] - this.delayCD) / towerDataDict[this.towerType]["parameters"]["delay"] * 100 + "%"
        this.mask.style.top = this.delayCD / towerDataDict[this.towerType]["parameters"]["delay"] * 100 + "%"
        if (this.delayCD < towerDataDict[this.towerType]["parameters"]["delay"]) {
            if (currentTower == this.towerType) setCurrentTower("")
            this.delayCD += 1
        }
        this.onSelect()
    }

    onClick() {
        if (currentTower == this.towerType) {
            setCurrentTower("")
        } else {
            setCurrentTower(this.towerType)
        }
    }

    onSelect(){
        if (currentTower == this.towerType){
            this.chooseImg.style.opacity = "1"
        } else {
            this.chooseImg.style.opacity = "0"
        }
    }

    onHover() {
        this.chooseButton.style.backgroundColor="#646464ff"
    }
    onOut() {
        this.chooseButton.style.backgroundColor="#414141"
    }
}