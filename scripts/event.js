import { monsterList } from "./monster.js";
import { towerList } from "./tower.js";
import { cannonsList } from "./cannon.js";
// [function,id]
export var eventsListening = [];

function monster_event(){
    for (var monster in monsterList){
        monsterList[monster].event()
    }
}
eventsListening.push([monster_event,"monster"])

function tower_events(){
    for (var tower in towerList){
        towerList[tower].events()
    }
}
eventsListening.push([tower_events,"tower"])

function cannon_event(){
    for (var cannon in cannonsList){
        cannonsList[cannon].event()
    }
}
eventsListening.push([cannon_event,"cannon"])

//执行添加的事件
export function runEvents() {
    console.log(eventsListening)
    if (eventsListening == 0) return;
    for (var events in eventsListening) {
        eventsListening[events][0]()
    }
    requestAnimationFrame(runEvents)
};