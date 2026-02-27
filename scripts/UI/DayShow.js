import { toDom } from "../utils/covertToDOM.js"
import { tick,day, TOTALDAYS } from "../gameArguments.js"
import { getDayLenth } from "../utils/getElements.js"
import { eventsListening } from "../event.js";

//天数
export class DayShow {
    constructor(day_data, tick,UIconatiner) {
        this.UIconatiner = UIconatiner
        this.day_data = day_data
        this.tick = tick
        this.Init()
    }

    Init() {
        this.container = document.createElement("div")
        this.container.id = "day-show-container"
        
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
        this.daytimebar.style.backgroundColor = "#fdcd53"
        this.daytimebar.style.width = "0%"
        this.daytimebar.style.transition = "all .4s"

        this.afternoonbar = document.createElement("div")
        this.afternoonbar.style.backgroundColor = "#c9685c"
        this.afternoonbar.style.width = "0%"
        this.afternoonbar.style.transition = "all .4s"

        this.nightbar = document.createElement("div")
        this.nightbar.style.backgroundColor = "#8576ff"
        this.nightbar.style.width = "0%"
        this.nightbar.style.transition = "all .4s"

        //这个是看目前天数
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
        this.UIconatiner.appendChild(this.container)

        eventsListening.push([()=>{ this.onChange() }, "day-change"])
    }

    onChange() {
        if (this.tick != tick) {
            this.days.innerHTML = `天数 ${day}`;
            this.daytimebar.style.width = (this.day_data[day][0] / eval(this.day_data[day].join("+")) * 100) + "%"
            this.afternoonbar.style.width = (this.day_data[day][1] / eval(this.day_data[day].join("+")) * 100) + "%"
            this.nightbar.style.width = (this.day_data[day][2] / eval(this.day_data[day].join("+")) * 100) + "%"
            this.timeSliderHander.style.left = ((tick - getDayLenth(day-1,TOTALDAYS)) / eval(this.day_data[day].join("+")) * 100) + "%"
        }
    }
}