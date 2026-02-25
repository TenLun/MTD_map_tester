import { toDom } from "../utils/covertToDOM.js"
import { imageUI } from "../gameDatas/gameResouces.js";
import { STATE,setState } from "../gameArguments.js";
//游戏状态选择
export class StateBtn {
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
        this.stateButton.style.backgroundColor = "#515151";
    }
    onOut() {
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