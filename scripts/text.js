//UI使用Dom

import { MAP_CONTAINER } from "./utils/getElements.js"
import { CubicOut } from "./utils/mathFuncs.js"

var textsList = []

/**
 * @param {number} x 起始x坐标
 * @param {number} y 起始y坐标
 * @param {string} content 内容
 * @param {string} color 颜色
 * @param {number} size 大小
 * @param {number} type 动画选择
 */

export function createText(x=0,y=0,content="None",color="#ffffff",size=2,type=1){
    textsList.push(new Text(x,y,content,color,size,type))
}

class Text{
    constructor(x,y,content,color,size,type){
        //原坐标 px
        this.x = x
        this.y = y

        this.content = content
        this.color = color
        this.size = size || 2
        this.type = type

        //显示部分
        this.dom = document.createElement('div')
        this.dom.appendChild(document.createTextNode(this.content))
        this.dom.style.userSelect = 'none';
        this.dom.style.color = this.color
        this.dom.style.position = 'absolute'
        this.dom.style.display = 'none';
        this.dom.style.textShadow = "1px 1px black";
        MAP_CONTAINER.appendChild(this.dom)

        this.id = Math.ceil(Math.random()*10000000)

        //动画部分
        this.i = 0
        var that = this
        
        //偏移量
        this.offsetX = Math.ceil(Math.random()*30) 
        this.offsetY = Math.ceil(Math.random()*30) 
        this.offsetZ = Math.ceil((Math.random()-0.5)*30) //方向

        this.Interval = setInterval( function(){that.animate()} , 50)
    }

    /**
     * 
     * @param {*} dx x坐标 
     * @param {*} dy y坐标
     * @param {*} dz 旋转角度
     * @param {*} dsize 大小
     */
    render(dx=this.x,dy=this.y,dz=0,dsize=this.size){
        this.dom.style.display = ''
        this.dom.style.left = dx + "px"
        this.dom.style.top = dy + "px"
        this.dom.style.transform = 'scale('+ dsize +') rotate('+ dz +'deg)'
    }

    animate(){
        // 动画 normal 给创建，升级塔
        if (this.type == "normal") {
            //进入
            if (this.i<1){
                this.render(this.x ,this.y - 30*CubicOut(1,0,1,this.i)) 
            //停留
            } else if (this.i < 3) {
            //出
            } else if (this.i > 3 && this.i < 4){
                this.render(this.x ,this.y - 30, 0 ,this.size*CubicOut(1,0,1,4-this.i))
            } else {
                this.delete()
            }
        //动画 number 给数值
        } else if (this.type == "number") {
            //进入
            if (this.i<1){
                this.render(this.x - this.offsetX*CubicOut(1,0,1,this.i), this.y - this.offsetY*CubicOut(1,0,1,this.i), 0, this.size*CubicOut(1,0,1,this.i))
            //出
            } else if (this.i > 1 && this.i < 2){
                this.render(this.x - this.offsetX,this.y - this.offsetY*CubicOut(1,0,1,1), 0 ,this.size*CubicOut(1,0,1,2-this.i))
            } else {
                this.delete()
            }
        } else if (this.type == "production") {
        //动画 production 给金币，水晶生产
            //进入
            if (this.i<1){
                this.render(this.x , this.y - 30*CubicOut(1,0,1,this.i), this.offsetZ*CubicOut(1,0,1,this.i*0.5))
            //停留
            } else if (this.i < 2) {
                this.render(this.x ,this.y - 30, this.offsetZ*CubicOut(1,0,1,this.i*0.5))
            //出
            } else if (this.i > 2 && this.i < 3){
                this.render(this.x ,this.y - 30, this.offsetZ, this.size*CubicOut(1,0,1,3-this.i))
            } else {
                this.delete()
            }
        } 
        this.i += 0.1
    }
    //删除
    delete(){
        clearInterval(this.Interval)//删除回调
        this.dom.remove() //dom
        for (var text in textsList) { //删除引用
            if (textsList[text].id == this.id){
                textsList.splice(text,1)
            }
        }
    }
}
