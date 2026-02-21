
function events(tower){
    for (monster in monsterList) {
        if (Math.pow(monsterList[monster].x-(tower.canvasX+tower.size/2),2)+
            Math.pow(monsterList[monster].y-(tower.canvasY+tower.size/2),2) <= Math.pow(tower.parameters['AttackRange'],2)){
            createCannon(
                (tower.canvasX+tower.size/2),(tower.canvasY+tower.size/2),
                Angle((tower.canvasX+tower.size/2), (tower.canvasY+tower.size/2), monsterList[monster].x, monsterList[monster].y),
                10,
                tower.parameters['AttackPower']
            )
            tower.hurt(2)
            return;
        }
    }
    
}
//升级技能树(当前等级可以升哪个等级)
var upgradeTree = {
}
//属性
var parameters = {
    "0":{
        'Cost':20,
        'MaxHealth' : 50,
        'AttackTime' : 1,
        'AttackPower': 5,
        'AttackRange': 250,
        'BulletNumber':1
    },
}
towerDict["temporaryarrowtower"] = {
    "name":"temporaryarrowtower",
    "events":events,
    "parameters":parameters,
    "upgradetree":upgradeTree,
    "floor":["ground","gold"], //可以被放置的地板类型
    "image":"resources/towers/TemporaryArrowTower.png"
}
