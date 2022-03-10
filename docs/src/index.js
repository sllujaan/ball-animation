


// dom vars 
const parent = document.querySelectorAll(".parent")[0];
const child = document.querySelectorAll(".child")[0];
const indicatorCenterVertial = document.querySelectorAll(".indicator-center-vertical")[0];
const indicatorCenterHorizontal = document.querySelectorAll(".indicator-center-horizontal")[0];
var parentWidth;
var parentHeight;
var childWidth;
var childHeight;
var widthRatio;
var heightRatio;

// event vars
var mouseMoveEvent = null;
var isMouseMoving = false;
var isAnimationPlaying = false;
var animationRequestId = null;
var mouseX = 0;
var mouseY = 0;
var boxX = 0;
var boxY = 0;
const speed = 0.04;
var rotation = 0;
var mouseMoveTimer = null;


const updateWidthRatio = () => {
    widthRatio = parentWidth / childWidth;
}
const updateHeightRatio = () => {
    heightRatio = parentHeight / childHeight;
}
const updateParentWidth = () => {
    parentWidth = parseInt(window.getComputedStyle(parent).getPropertyValue("width"));
}
const updateParentHeight = () => {
    parentHeight = parseInt(window.getComputedStyle(parent).getPropertyValue("height"));
}
const updateChildWidth = () => {
    childWidth = parseInt(window.getComputedStyle(child).getPropertyValue("width"));
}
const updateChildHeight = () => {
    childHeight = parseInt(window.getComputedStyle(child).getPropertyValue("height"));
}
const handleUpdate = () => {
    updateParentWidth();
    updateParentHeight();
    updateChildWidth();
    updateChildHeight();
    updateWidthRatio();
    updateHeightRatio();
}
const getParentMousePercentageX = (e) => {
    return ((e.clientX - parent.offsetLeft) / parentWidth) * 100;
}
const getParentMousePercentageY = (e) => {
    return ((e.clientY - parent.offsetTop) / parentHeight) * 100;
}

const showCenterIndicator = () => {
    indicatorCenter.classList.remove("hide");
}
const hideCenterIndicator = () => {
    indicatorCenter.classList.add("hide");
}

const showCenterIndicatorVertical = () => {
    indicatorCenterVertial.classList.remove("hide");
}
const hideCenterIndicatorVertical = () => {
    indicatorCenterVertial.classList.add("hide");
}
const showCenterIndicatorHorizontal = () => {
    indicatorCenterHorizontal.classList.remove("hide");
}
const hideCenterIndicatorHorizontal = () => {
    indicatorCenterHorizontal.classList.add("hide");
}
const getParentMousePercentageXEx = (boxX) => {
    return ((boxX - parent.offsetLeft) / parentWidth) * 100;
}
const getParentMousePercentageYEx = (boxY) => {
    return ((boxY - parent.offsetTop) / parentHeight) * 100;
}
const onMouseMoveStop = (e) => {
    isMouseMoving = false;
    stopAnimation();
}
const handleOnMouseMove = (e) => {
    clearTimeout(mouseMoveTimer);
    isMouseMoving = true;
    mouseMoveEvent = e;
    mouseX = e.pageX;
    mouseY = e.pageY;
    startAnimation();

    mouseMoveTimer = setTimeout(() => {
        onMouseMoveStop(e);
    }, 3000);
}

handleUpdate();
// event listeners------------
document.addEventListener("mousemove", e => {
    handleOnMouseMove(e);
});
window.addEventListener("resize", e => {
    handleUpdate();
});
// -------------------



const startAnimation = () => {
    if(!isMouseMoving || isAnimationPlaying) return false;

    //console.log("------animation-started-------------");
    isAnimationPlaying = true;
    animate();
}

const stopAnimation = () => {
    isAnimationPlaying = false;
    cancelAnimationFrame(animationRequestId);
    //console.log("------animation-stoped-------------");
}

const transformBoxOnMouseMove = () => {

    var mousePercentageXParent = getParentMousePercentageXEx(boxX);
    var mousePercentageYParent = getParentMousePercentageYEx(boxY);

    //console.log(`${mousePercentageXParent}`);

    // for x coordinates--------------------------------------
    if(mousePercentageXParent <= 0) mousePercentageXParent = 0;
    if(mousePercentageXParent >= 100) mousePercentageXParent = 100;

    if(mousePercentageXParent >= 45 && mousePercentageXParent <= 55) {
        mousePercentageXParent = 50;
        showCenterIndicatorHorizontal();
    }
    else {
        hideCenterIndicatorHorizontal();
    }
    //--------------------------------------------------------

    // for y coordinates--------------------------------------
    if(mousePercentageYParent <= 0) mousePercentageYParent = 0;
    if(mousePercentageYParent >= 100) mousePercentageYParent = 100;

    if(mousePercentageYParent >= 45 && mousePercentageYParent <= 55) {
        mousePercentageYParent = 50;
        showCenterIndicatorVertical();
    }
    else {
        hideCenterIndicatorVertical();
    }
    //--------------------------------------------------------

    rotation = mousePercentageXParent;

    child.style.setProperty("transform", `translate3d(
        ${(mousePercentageXParent*widthRatio)-mousePercentageXParent}%, 
        ${(mousePercentageYParent*heightRatio)-mousePercentageYParent}%, 
        0px) 
        scale3d(1, 1, 1) 
        rotateX(0deg) 
        rotateY(0deg) 
        rotateZ(${rotation}deg)   
        skew(0deg, 0deg) 
    `);

}

const animate = () => {

    //console.log("animation");

    let distX = mouseX - boxX;
    let distY = mouseY - boxY;
    
    boxX = boxX + (distX * speed);
    boxY = boxY + (distY * speed);
    
    transformBoxOnMouseMove();

    if(isAnimationPlaying) animationRequestId = requestAnimationFrame(animate);
    
}