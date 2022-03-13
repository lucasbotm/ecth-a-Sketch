'use strict';

let divContainer = document.getElementById("divContainer");
let divContainerInfo = divContainer.getBoundingClientRect();
let divContainerHeight = divContainerInfo.height;
let divContainerWidth = divContainerInfo.width;
let divContainerBorder = parseFloat(getComputedStyle(divContainer).getPropertyValue("border"));
let bodyElement = document.querySelector("body")
let windowBackgroundColor = window.getComputedStyle(bodyElement).getPropertyValue("background-color");
// let colorSketch = "#CED8F7"
let colorSketch = "rgb(206, 216, 247)"
let inputValuesGrid = [1,2,4,8,16,32,64]
let indexSlider = document.getElementById("inputSlider").defaultValue;
let sliderValue = inputValuesGrid[indexSlider];
let valueSlider = document.getElementById("outputSlider")
let textCoordinate = document.getElementById("textCoordinates")

function createGrid(value){
    let numberDivs = value;
    let rowCounter = 0;
    let colCounter = 0;

    let rowWidth = divContainerWidth-2*divContainerBorder;
    let rowHeight = (divContainerHeight-2*divContainerBorder)/numberDivs;


    let borderContainer = 0.05;
    let containerWidth = divContainerWidth/numberDivs-2*borderContainer;
    let containerHeight = rowHeight - 2*borderContainer;


    while (rowCounter < numberDivs){
        let newDivRow = document.createElement("div");
        newDivRow.classList.add("divRow");
        newDivRow.style.height = rowHeight.toString()+"px";
        newDivRow.style.width = rowWidth.toString()+"px";
        divContainer.appendChild(newDivRow); 
        while (colCounter < numberDivs){
            let newDiv = document.createElement("div");
            newDiv.classList.add("divGrid");
            newDiv.setAttribute("darken","none");
            newDiv.style.border = "solid";
            newDiv.style.borderWidth = borderContainer.toString()+"px";
            newDiv.style.borderColor= "white";
            newDiv.style.height = containerHeight.toString()+"px";
            newDiv.style.width = containerWidth.toString()+"px";
            newDiv.style.backgroundColor = windowBackgroundColor;
            divContainer.lastChild.appendChild(newDiv);
            colCounter++;
        }
        colCounter=0;
        rowCounter++;
    }
}
function clearGrid(){
    divsGrid.forEach(function(item){
        item.style.backgroundColor = windowBackgroundColor;
    })
}
function changeBackgroundColorBlack (input) {
    input.target.style.backgroundColor = colorSketch;
}
function changeBackgroundColorRainbow (input){
    let currentDiv = input.target;
    let backgroundColorDiv = input.target.style.backgroundColor;
    if (backgroundColorDiv === windowBackgroundColor || backgroundColorDiv === colorSketch|| backgroundColorDiv==="black"){
        currentDiv.style.backgroundColor = randomHex();
        let actualColors = currentDiv.style.backgroundColor.slice(4,-1).split(',');
        let darkenChange = [actualColors[0]/10, actualColors[1]/10, actualColors[2]/10];
        darkenChange = darkenChange.map(Math.ceil);
        currentDiv.setAttribute("darken", darkenChange);
    } else {
        let actualColors = currentDiv.style.backgroundColor.slice(4,-1).split(',');

        let newRed = actualColors[0] - parseFloat(currentDiv.getAttribute("darken").split(',')[0]);
        let newGreen = actualColors[1] - parseFloat(currentDiv.getAttribute("darken").split(',')[1]);
        let newBlue = actualColors[2] - parseFloat(currentDiv.getAttribute("darken").split(',')[2]);

        if (newRed < 0 && newGreen < 0 && newBlue < 0){
            currentDiv.style.backgroundColor = "black";
        } else{
            let newRGB = `rgb(${newRed},${newGreen},${newBlue})`
            currentDiv.style.backgroundColor = newRGB;
        }
    }
}
function randomHex(input) {
    // code by "Programming Bytes" - available on: https://www.educative.io/edpresso/how-to-generate-a-random-color-in-javascript
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}
function changeGridColor(clickEvent,colorMode="blackMode"){
    if (clickEvent){
        colorMode = clickEvent.target.className;
    }
    if (colorMode === "blackMode"){
        divsGrid.forEach(function(div){
            div.removeEventListener('mouseover', changeBackgroundColorRainbow);
            div.addEventListener('mouseover',changeBackgroundColorBlack);
        })
    } else {
        divsGrid.forEach(function(div){
            div.removeEventListener('mouseover', changeBackgroundColorBlack);
            div.addEventListener('mouseover',changeBackgroundColorRainbow);
        })
    }
}
function removeGrid(){
    while (divContainer.firstChild){
        divContainer.removeChild(divContainer.lastChild)
    }
}
function updateMouseCoordinate(input){
    let boundaryContainer = divContainer.getBoundingClientRect()
    let leftGridBoundary = boundaryContainer["left"]
    let rightGridBoundary = boundaryContainer["right"]
    let topGridBoundary = boundaryContainer["top"];
    let bottomGridBoundary = boundaryContainer["bottom"];
    let mouseXCoordinate = input.clientX;
    let mouseYCoordinate = input.clientY;
    if (mouseXCoordinate>=leftGridBoundary
        && mouseXCoordinate <= rightGridBoundary 
        && mouseYCoordinate <= bottomGridBoundary 
        && mouseYCoordinate >= topGridBoundary){ 
                textCoordinate.innerText = `X: ${mouseXCoordinate} Y: ${mouseYCoordinate}`
            } 
}

createGrid(sliderValue);
let divsGrid = document.querySelectorAll(".divGrid");
valueSlider.textContent = `${sliderValue} X ${sliderValue}`;
changeGridColor()
document.querySelector(".clear").addEventListener("click",clearGrid);
document.querySelector(".blackMode").addEventListener("click",changeGridColor,false)
document.querySelector(".rainbowMode").addEventListener("click",changeGridColor,false)
document.addEventListener('mousemove', function(e){
    updateMouseCoordinate(e)});
 document.getElementById("inputSlider").addEventListener("change", function(e){
    indexSlider = e.target.value
    sliderValue = inputValuesGrid[indexSlider];
    removeGrid()
    createGrid(sliderValue)
    valueSlider.textContent = `${sliderValue} X ${sliderValue}`;
    divsGrid = document.querySelectorAll(".divGrid");
    changeGridColor()
});


