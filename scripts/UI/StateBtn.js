import { toDom } from "../utils/covertToDOM.js"
import { imageUI } from "../gameDatas/gameResouces.js";
import { STATE,setState } from "../gameArguments.js";
import { eventsListening } from "../event.js";
//游戏状态选择
export class StateBtn {
    constructor(state, right, y,UIcontainer) {
        this.UIcontainer = UIcontainer
        this.state = state;
        this.right = right;
        this.y = y;
        this.Init()
    }

    Init() {
        this.stateButton = document.createElement("div")
        this.stateButton.className = "StateBtn"
        this.stateButton.style.cssText = `
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

        this.stateButton.appendChild(this.image);
        document.getElementById("ui_container").appendChild(this.stateButton);
        eventsListening.push([()=> { this.event() }, this.state])

        var that = this;
        this.stateButton.addEventListener("click", function (event) {
            that.onClick(event)
        });
    }

    onClick() {
        setState(this.state)
    }
    //被选择
    onSelect(current_state) {
        if (current_state == this.state) {
            this.stateButton.style.opacity = "0.5"
        } else {
            this.stateButton.style.opacity = "1"
        }
    }

    event(){
        this.onSelect(STATE)
    }
}