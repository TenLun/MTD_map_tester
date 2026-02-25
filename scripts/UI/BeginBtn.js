import { setState } from "../gameArguments.js";
import { spawn_monster } from "../monster.js";
//开始游戏
export class BeginBtn {
    constructor() {
        this.Init()
    }
    Init() {
        this.startButton = document.createElement("div");
        this.startButton.style.cssText = `
            text-align:center;
            user-select:none;
            background-color:#131313;
            border-radius:5px;
            padding:10px;
            width:150px;
            height:70px;
            position:fixed;
            left:0px; bottom:0px; color:white
        `
        this.startButton.innerHTML = "开始游戏"

        document.getElementById("ui_container").appendChild(this.startButton)

        var that = this
        this.startButton.addEventListener("click", function () {
            that.onClick()
        })
    }

    onClick() {
        setState("start")
        spawn_monster()
    }
}