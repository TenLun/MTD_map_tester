//将图片转换成dom
export function toDom(src){
    var ImageDom = new Image();
    ImageDom.src = src;
    return ImageDom;
}

//将图片转换成dom(带颜色)
export function imgToDom(src,width,height,color){
    var wrapper = document.createElement("div");
    wrapper.style.display = "inline-block";
    wrapper.style.overflow = "hidden";
    wrapper.style.width = width+"px"
    wrapper.style.height = height+"px"

    var ImageDom = new Image();
    ImageDom.src = src;
    ImageDom.width = width;
    ImageDom.height = height;

    ImageDom.style.transform = "translateX(-100%)";
    ImageDom.style.filter = "drop-shadow("+ width +"px 0 " + color +")"; 

    wrapper.appendChild(ImageDom);

    return wrapper;
}