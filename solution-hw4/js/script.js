// glazing options for rolls
const glazing = {
    options: ["Keep original", "Sugar milk", "Vanilla milk", "Double chocolate"],
    priceAdaptation: [0, 0, 0.5, 1.5],
}

// pack size options for rolls
const packSize = {
    options: [1, 3, 6, 12],
    priceAdaptation: [1, 3, 5, 10],
}

// dropdown options
let glazingDropdown = document.querySelector("#glazing");
let packSizeDropdown = document.querySelector("#pack-size");

for (let i=0; i < glazing.options.length; i++){
    let newOption = document.createElement("option");
    newOption.setAttribute("value", glazing.priceAdaptation[i]);
    newOption.textContent = glazing.options[i];
    glazingDropdown.appendChild(newOption);
}

for (let i=0; i < packSize.options.length; i++){
    let newOption = document.createElement("option");
    newOption.setAttribute("value", packSize.priceAdaptation[i]);
    newOption.textContent = packSize.options[i];
    packSizeDropdown.appendChild(newOption);
}

// roll prices
let basePrice = 2.49;
let totalPriceDetail = document.querySelector(".total.detail");
let glazingPrice = 0;
let packPrice = 1;
let totalItemPrice;

function glazingChange(element) {
    // get value of selected glazing option
    glazingPrice = parseFloat(element.value);
    
    // update the price
    // the formula to update the price
    totalItemPrice = ((basePrice + glazingPrice) * packPrice).toFixed(2);
    /* used this stackoverflow thread to round to two decimal places: 
    https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary */
    
    // the formula to update the HTML to the new price
    totalPriceDetail.innerHTML = "$" + String(totalItemPrice);
}

function packChange(element) {
    // get value of selected pack size option
    packPrice = parseInt(element.value);

    // update the price
    // the formula to update the price
    totalItemPrice = ((basePrice + glazingPrice) * packPrice).toFixed(2);
    /* used this stackoverflow thread to round to two decimal places: 
    https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary */

    // the formula to update the HTML to the new price
    totalPriceDetail.innerHTML = "$" + String(totalItemPrice);
}

const cart = [];
const queryString = window.location.search;
console.log(queryString);
const params = new URLSearchParams(queryString);

console.log(params);
const rollType = params.get('roll');