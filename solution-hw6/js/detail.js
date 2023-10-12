// detail page updates
const cart = new Set();
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollName = params.get('roll');

// glazing options for rolls
const glazing = {
    options: ["Keep original", "Sugar milk", "Vanilla milk", "Double chocolate"],
    priceAdaptation: [0, 0, 0.5, 1.5],
}

// pack size options for rolls
const packs = {
    options: [1, 3, 6, 12],
    priceAdaptation: [1, 3, 5, 10],
}

// detail page
// dropdown options
let glazingDropdown = document.querySelector("#glazing");
let packSizeDropdown = document.querySelector("#pack-size");

for (let i=0; i < glazing.options.length; i++){
    let newOption = document.createElement("option");
    newOption.setAttribute("value", glazing.priceAdaptation[i]);
    newOption.textContent = glazing.options[i];
    glazingDropdown.appendChild(newOption);
}

for (let i=0; i < packs.options.length; i++){
    let newOption = document.createElement("option");
    newOption.setAttribute("value", packs.priceAdaptation[i]);
    newOption.textContent = packs.options[i];
    packSizeDropdown.appendChild(newOption);
}

// roll prices
let rollPrice = rolls[rollName].basePrice;
let totalPriceDetail = document.querySelector(".total.detail");
let glazingPrice = 0;
let packPrice = 1;
let totalItemPrice;
totalPriceDetail.innerHTML = "$" + rollPrice;

function glazingChange(element) {
    // get value of selected glazing option
    glazingPrice = parseFloat(element.value);
    
    // update the price
    // the formula to update the price
    totalItemPrice = ((rollPrice + glazingPrice) * packPrice).toFixed(2);
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
    totalItemPrice = ((rollPrice + glazingPrice) * packPrice).toFixed(2);
    /* used this stackoverflow thread to round to two decimal places: 
    https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary */

    // the formula to update the HTML to the new price
    totalPriceDetail.innerHTML = "$" + String(totalItemPrice);
}

// Update the header text
const headerElement = document.querySelector('.detail-header');
headerElement.innerText = rollName + " Cinnamon Roll";

// Update the image
const detailImage = document.querySelector('#roll-detail-page');
let rollImage = rolls[rollName].imageFile;
detailImage.src = '../assets/products/' + rollImage;

class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
    }
    
    totalPrice() {
        //basePrice
        let basePrice = this.basePrice;
        
        let i = glazing.options.indexOf(this.glazing);
        let glazingPrice = parseFloat(glazing.priceAdaptation[i]);

        let j = packSize.options.indexOf(this.size);
        let packPrice = parseFloat(packSize.priceAdaptation[j]);

        let totalItemPrice = ((basePrice + glazingPrice) * packPrice).toFixed(2);
        return totalItemPrice;
    }
}

// what user selected
// source for this line of code is from here: https://stackoverflow.com/questions/5913/getting-the-text-from-a-drop-down-box
let rollGlazing = glazing.options[glazingDropdown.selectedIndex];
let packSize = packs.options[packSizeDropdown.selectedIndex];

// add to cart button
const addToCart = document.querySelector(".total-addToCart button");
addToCart.addEventListener("click", addNewRoll.bind(null, rollName, rollGlazing, packSize, rollPrice));

// creates new roll and adds it to cart set
function addNewRoll(rollType, rollGlazing, packSize, rollPrice, event) {
    // Create a new roll object
    const roll = new Roll(rollType, rollGlazing, packSize, rollPrice);
  
    // Add the roll object to roll set
    cart.add(roll);
    saveToLocalStorage();
  
    return roll;
}

function saveToLocalStorage() {
    const rollArray = Array.from(cart);
    console.log(rollArray);
    
    const rollArrayString = JSON.stringify(rollArray);
    console.log(rollArrayString);
  
    localStorage.setItem('storedRolls', rollArrayString);
}