



const parent = document.querySelectorAll(".parent")[0];
const child = document.querySelectorAll(".child")[0];
const indicatorCenterVertial = document.querySelectorAll(".indicator-center-vertical")[0];
const indicatorCenterHorizontal = document.querySelectorAll(".indicator-center-horizontal")[0];
var parentWidth = parseInt(window.getComputedStyle(parent).getPropertyValue("width"));
var parentHeight = parseInt(window.getComputedStyle(parent).getPropertyValue("height"));

const childWidth = parseInt(window.getComputedStyle(child).getPropertyValue("width"));
const childHeight = parseInt(window.getComputedStyle(child).getPropertyValue("height"));

var widthRatio = parentWidth / childWidth;
var heightRatio = parentHeight / childHeight;

const newWidthRatio = window.innerWidth / childWidth;

const minTransformPercentage = 0;
const maxTransformPercentage = 100 * widthRatio;


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
var prevMousePercentageXParent = 0;


// document.addEventListener("mousemove", e => {
//     const mousePercentageX = (e.clientX / window.innerWidth) * 100;
//     console.log(mousePercentageX);
//     console.log(`${mousePercentageX}`);
//     //console.log(`${mousePercentageX*widthRatio}`);

//     var transformXPercentage = ((mousePercentageX - 8.9385) * newWidthRatio);

//     if(transformXPercentage <= minTransformPercentage) transformXPercentage = minTransformPercentage;
//     if(transformXPercentage >= maxTransformPercentage) transformXPercentage = maxTransformPercentage;


//     child.style.setProperty("transform", `translate3d(${transformXPercentage}%, 0px, 0px)`);
// });




window.addEventListener("resize", e => {
    console.log("resize");
    parentWidth = parseInt(window.getComputedStyle(parent).getPropertyValue("width"));
    parentHeight = parseInt(window.getComputedStyle(parent).getPropertyValue("height"));
    widthRatio = parentWidth / childWidth;
    heightRatio = parentHeight / childHeight;

})


const getParentMousePercentageX = (e) => {
    return ((e.clientX - parent.offsetLeft) / parentWidth) * 100;
}
const getParentMousePercentageY = (e) => {
    return ((e.clientY - parent.offsetTop) / parentHeight) * 100;
}

// document.addEventListener("mousemove", e => {
//     const mousePercentageX = (e.clientX / window.innerWidth) * 100;
//     const mousePercentageXParent = ((e.clientX) / window.innerWidth) * 100;
//     console.log(mousePercentageX);
//     console.log(`${getParentMousePercentageX(e)}`);
// });


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

document.addEventListener("mousemove", e => {

    //console.log(`${getParentMousePercentageY(e)}`);
    
    clearTimeout(mouseMoveTimer);
    isMouseMoving = true;
    mouseMoveEvent = e;
    mouseX = e.pageX;
    mouseY = e.pageY;
    startAnimation();

    mouseMoveTimer = setTimeout(() => {
        onMouseMoveStop(e);
    }, 1000);
});



const onMouseMoveStop = (e) => {
    isMouseMoving = false;
    stopAnimation();
}


const startAnimation = () => {
    if(!isMouseMoving || isAnimationPlaying) return false;

    console.log("------animation-started-------------");
    isAnimationPlaying = true;
    animate();
}

const stopAnimation = () => {
    isAnimationPlaying = false;
    cancelAnimationFrame(animationRequestId);
    console.log("------animation-stoped-------------");
}

const transformBoxOnMouseMove = () => {

    var mousePercentageXParent = getParentMousePercentageXEx(boxX);
    var mousePercentageYParent = getParentMousePercentageYEx(boxY);

    console.log(`${mousePercentageXParent}`);

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

    // for x coordinates--------------------------------------
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
    
    transformBoxOnMouseMove(mouseMoveEvent);

    if(isAnimationPlaying) animationRequestId = requestAnimationFrame(animate);
    
}