/*
  用于处理事件，包括渲染
*/
import { STATE,TOTALDAYS,day,tick, setDay, setTick,towerList,cannonsList,monsterList,floorsList } from "./gameArguments.js";
// [function,id]
export var eventsListening = [];

function monster_event(){
    for (const monsterObj of monsterList){
        monsterObj.event()
    }
}
eventsListening.push([monster_event,"monster"])

function tower_events(){
    for (const towerObj of towerList){
        towerObj.events()
    }
}
eventsListening.push([tower_events,"tower"])

function cannon_event(){
    for (const cannonObj of cannonsList){
        cannonObj.event()
    }
}
eventsListening.push([cannon_event,"cannon"])

function map_event(){
    for (const floorObj of floorsList){
        floorObj.event()
    }
}
eventsListening.push([map_event,"Map_event"])

//时间推进
function Time(){
    if (STATE == "pause" || day == TOTALDAYS.length) return;
    setTick(tick + 1)
    if (tick < getDayLenth(day)) return;
    setDay(day + 1);
};
eventsListening.push([Time, "main_event"])

function getDayLenth(current_day){
    var dayLenth = 0;
    for (const day in TOTALDAYS){
        if (day > current_day) break;
        dayLenth += eval(TOTALDAYS[day].join("+"));
        console.log(dayLenth)
    }
    
    return dayLenth
}

//执行添加的事件
export function runEvents() {
    if (eventsListening == 0) return;
    for (const event of eventsListening) {
        event[0]()
    }
};