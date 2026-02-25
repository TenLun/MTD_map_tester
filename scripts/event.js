/*
  用于处理事件，包括渲染
*/
import { STATE,TOTALDAYS,day,tick, setDay, setTick,towerList,cannonsList,monsterList } from "./gameArguments.js";
import { getDayLenth } from "./utils/getElements.js";
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

//时间推进
function Time(){
    if (STATE == "pause" || day == TOTALDAYS.length) return;
    setTick(tick + 1)
    if (tick < getDayLenth(day,TOTALDAYS)) return;
    setDay(day + 1);
};
eventsListening.push([Time, "main_event"])


//执行添加的事件
export function runEvents() {
    if (eventsListening == 0) return;
    for (const event of eventsListening) {
        event[0]()
    }
};