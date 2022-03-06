'use strict';

let divContainer = document.getElementById("divContainer");
let divContainerInfo = divContainer.getBoundingClientRect();
let divContainerHeight = divContainerInfo.height;
let divContainerWidth = divContainerInfo.width;
let divContainerBorder = parseFloat(getComputedStyle(divContainer).getPropertyValue("border"));

let numberDivs = 16;
let rowCounter = 0;
let colCounter = 0;

function createGrid(numberDivs){

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
            newDiv.style.height = containerHeight.toString()+"px";
            newDiv.style.width = containerWidth.toString()+"px";
            newDiv.style.backgroundColor ="white";
            divContainer.lastChild.appendChild(newDiv);
            colCounter++;
        }
        colCounter=0;
        rowCounter++;
    }
}


function clearGrid(){
    divsGrid.forEach(function(item){
        item.style.backgroundColor ="white";
    })
}

function changeBackgroundColorBlack (input) {
    input.target.style.backgroundColor = "black";
}

function changeBackgroundColorRainbow (input){
    let currentDiv = input.target;
    let backgroundColorDiv = input.target.style.backgroundColor;
    if (backgroundColorDiv === "white" || backgroundColorDiv ==='black'){
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

createGrid(numberDivs);
let divsGrid = document.querySelectorAll(".divGrid");
changeGridColor()



document.querySelector(".clear").addEventListener("click",clearGrid);
document.querySelector(".blackMode").addEventListener("click",changeGridColor,false)
document.querySelector(".rainbowMode").addEventListener("click",changeGridColor,false)


