'use strict';

let divContainer = document.getElementById("divContainer");
let divContainerInfo = divContainer.getBoundingClientRect();
let divContainerHeight = divContainerInfo.height;
let divContainerWidth = divContainerInfo.width;

let numberDivs = 16;
let rowCounter = 0;
let colCounter = 0;

let rowWidth = divContainerWidth;
let rowHeight = divContainerHeight/numberDivs;

let containerWidth = rowWidth/numberDivs


console.log(divContainer.lastChild);

while (rowCounter <= 15){
    let newDivRow = document.createElement("div");
    newDivRow.classList.add("divRow");
    newDivRow.style.height = rowHeight.toString()+"px";
    newDivRow.style.width = rowWidth.toString()+"px";
    divContainer.appendChild(newDivRow); 
    while (colCounter <= 15){
        let newDiv = document.createElement("div");
        newDiv.classList.add("divGrid");
        newDiv.style.height = rowHeight.toString()+"px";
        newDiv.style.width = containerWidth.toString()+"px";
        divContainer.lastChild.appendChild(newDiv);
        colCounter++;
    }
    colCounter=0;
    rowCounter++;
}



console.log(divContainer.lastChild)
