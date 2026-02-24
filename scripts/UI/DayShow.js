import { toDom } from "../utils/covertToDOM.js"
import { tick,day } from "../gameArguments.js"
//天数
export class DayShow {
    constructor(day_data, tick) {
        this.day_data = day_data
        this.tick = tick
        this.Init()
    }

    Init() {
        this.container = document.createElement("div")
        this.container.style.cssText=`
            user-select: none;
            background-color: #131313;
            border-radius: 5px;
            opacity: 0.8;
            padding: 10px;
            width: 400px;
            height: 50px;
            position: absolute;
            text-align: center;
            top: 1px;
            right: 1px;
            color: white;
        `
        this.days = document.createElement("a")
        this.days.innerHTML = "天数0";

        this.timebar = document.createElement("div")
        this.timebar.style.cssText=`
            background-color: gray;
            width: 390px;
            height: 10px;
            display: flex;
            position: absolute
        `
        this.daytimebar = document.createElement("div");
        this.daytimebar.style.backgroundColor = "yellow"
        this.daytimebar.style.width = "0%"

        this.afternoonbar = document.createElement("div")
        this.afternoonbar.style.backgroundColor = "red"
        this.afternoonbar.style.width = "0%"

        this.nightbar = document.createElement("div")
        this.nightbar.style.backgroundColor = "purple"
        this.nightbar.style.width = "0%"

        this.timeSliderHander = toDom("resources/UI/TimeSliderHander.png");
        this.timeSliderHander.style.cssText = `
            position: absolute;
            width: 1px;
            height: 20px;
            top: ${this.timebar.style.height};
            left: 0%;
            object-fit: cover;
            overflow: visible;
        `
        this.timebar.appendChild(this.daytimebar)
        this.timebar.appendChild(this.afternoonbar)
        this.timebar.appendChild(this.nightbar)
        this.timebar.appendChild(this.timeSliderHander)
        this.container.appendChild(this.days)
        this.container.appendChild(this.timebar)
        document.getElementById("ui_container").appendChild(this.container)
    }

    onChange() {
        if (this.tick != tick) {
            this.days.innerHTML = `天数 ${day}`;
            this.daytimebar.style.width = (this.day_data[day][0] / eval(this.day_data[day].join("+")) * 100) + "%"
            this.afternoonbar.style.width = (this.day_data[day][1] / eval(this.day_data[day].join("+")) * 100) + "%"
            this.nightbar.style.width = (this.day_data[day][2] / eval(this.day_data[day].join("+")) * 100) + "%"
            this.timeSliderHander.style.left = (tick / eval(this.day_data[day].join("+")) * 100) + "%"
        }
    }
}