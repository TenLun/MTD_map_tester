/**
 * 将图片转换成img
 * @param {string} src 
 * @returns {HTMLImageElement}
 */
export function toDom(src){
    var ImageDom = new Image();
    ImageDom.src = src;
    return ImageDom;
}

/**
 * 将图片转换成包裹着其的div(带颜色)
 * @param {string} src 路径
 * @param {number} width 宽
 * @param {number} height 高
 * @param {string} color 颜色 可选
 * @returns {HTMLDivElement}
 */
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

    if (color != undefined){
        ImageDom.style.transform = "translateX(-100%)";
        ImageDom.style.filter = "drop-shadow("+ width +"px 0 " + color +")"; 
    }
    wrapper.appendChild(ImageDom);
    return wrapper;
}