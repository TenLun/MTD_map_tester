import { toDom } from "../utils/covertToDOM.js"
import { towerDataDict } from "../gameDatas/gameResouces.js"
import { eventsListening } from "../event.js"
import { money,currentTower, setCurrentTower, STATE } from "../gameArguments.js"
//塔类选择
export class TowerChooseButton {
    constructor(index, towerType, UIcontainer) {
        this.UIcontainer = UIcontainer
        this.index = index
        this.towerType = towerType
        this.image = toDom(towerDataDict[this.towerType]["image"]);
        this.cost = towerDataDict[this.towerType]["parameters"][0]["Cost"]["money"];

        this.id = Math.ceil(Math.random() * 10000000)
        this.Init()
    }

    Init() {
        this.chooseButton = document.createElement("div")
        this.chooseButton.className = "TowerChooseBtn"
        Object.assign(this.chooseButton.style,{
            top: `${70 + 65 * this.index}px`,
        })
        
        this.image.style.margin = "auto";
        this.image.style.width = "30px";
        this.image.style.height = "30px";
        this.image.style.pointerEvents = "none";

        this.costText = document.createElement("div")
        this.costText.innerHTML = this.cost
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
        this.UIcontainer.appendChild(this.chooseButton);

        this.delayCD = towerDataDict[this.towerType]["delay"];
        this.CDtimer = this.delayCD
        this.IfOnHover = 0

        eventsListening.push([()=>{ this.event() }, "chooseBtn-" + this.id]);

        this.chooseButton.addEventListener("click",      ()=>{this.onClick()});
        this.chooseButton.addEventListener("mouseenter", ()=>{this.onHover()});
        this.chooseButton.addEventListener("mouseleave", ()=>{this.onOut()  });
    };

    event() {
        this.animate()
        if (money < this.cost) {
            if (currentTower == this.towerType) setCurrentTower("")
            this.costText.style.color = 'rgb(255,0,0)';
        } else {
            this.costText.style.color = 'rgb(0,255,0)';
        }
        this.onSelect()
    }

    animate(){
        if (STATE == "pause") return;
        this.mask.style.height = `${(this.delayCD - this.CDtimer) / this.delayCD * 100}%`
        this.mask.style.top    = `${this.CDtimer / this.delayCD * 100}%`
        if (this.CDtimer >= this.delayCD) return;
        if (currentTower == this.towerType) setCurrentTower("");
        this.CDtimer += 1
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

    delete(){
        for (const event in eventsListening){
            if(eventsListening[event][1] != this.id) continue;
            console.log(eventsListening[event][1])
            eventsListening.splice(event,1)
        }
        this.chooseButton.removeEventListener("click",      ()=>{this.onClick()});
        this.chooseButton.removeEventListener("mouseenter", ()=>{this.onHover()});
        this.chooseButton.removeEventListener("mouseleave", ()=>{this.onOut()  });
        this.chooseButton.removeChild(this.image);
        this.chooseButton.removeChild(this.costText);
        this.chooseButton.removeChild(this.mask);
        this.chooseButton.removeChild(this.chooseImg);
        this.UIcontainer.removeChild(this.chooseButton);
        delete this 
    }
}