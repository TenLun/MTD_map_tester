import { setState } from "../gameArguments.js";
import { spawn_monster } from "../monster.js";
//开始游戏
export class BeginBtn {
    constructor(UIcontainer) {
        this.UIcontainer = UIcontainer
        this.Init()
    }
    Init() {
        this.startButton = document.createElement("div");
        this.startButton.style.cssText = `
            align-content:center;
            font-size:35px;
            text-align:center;
            user-select:none;
            background-color:#131313;
            border-radius:5px;
            padding:10px;
            width:225px;
            height:70px;
            position:fixed;
            left:10px; bottom:10px; color:white
        `
        this.startButton.innerHTML = "开始游戏"
        this.UIcontainer.appendChild(this.startButton)
        this.startButton.addEventListener("click",()=>{this.onClick()})
    }

    onClick() {
        setState("start")
        spawn_monster()
    }
}