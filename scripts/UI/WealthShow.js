//显示金币水晶
export class WealthShow {
    constructor(variable, x, y) {
        this.variable = variable
        this.x = x
        this.y = y
        this.Init()
    }

    Init() {
        this.container = document.createElement("div")
        this.container.style.cssText=`
            user-select: none;
            background-color: #131313;
            border-radius: 5px;
            padding: 10px;
            width: 50px;
            height: 20px;
            position: absolute;
            text-align: center;
            top: ${this.y}px;
            left: ${this.x}px;
            color: white
        `
        this.container.innerHTML = this.variable
        document.getElementById("ui_container").appendChild(this.container)
    }

    onChange(variable) {
        if (variable != this.variable) {
            this.variable = variable
            this.container.innerHTML = this.variable
        }
    }
}