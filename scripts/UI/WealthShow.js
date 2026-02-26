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
        this.container.className = "WealthShow"
        Object.assign(this.container.style,{
            left: `${this.x}px`,
            top: `${this.y}px`,

        })
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