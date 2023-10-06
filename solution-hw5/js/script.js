// detail page updates
const cart = new Set();
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

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
let basePrice = rolls[rollType].basePrice;
let totalPriceDetail = document.querySelector(".total.detail");
let glazingPrice = 0;
let packPrice = 1;
let totalItemPrice;
totalPriceDetail.innerHTML = "$" + basePrice;

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

// Update the header text
const headerElement = document.querySelector('.detail-header');
headerElement.innerText = rollType + " Cinnamon Roll";

// Update the image
const detailImage = document.querySelector('#roll-detail-page');
let rollImage = rolls[rollType].imageFile;
detailImage.src = '../assets/products/' + rollImage;

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

// add to cart
let addToCart = document.querySelector("button");
addToCart.addEventListener("click", function() {
    let roll = new Roll(rollType, glazingDropdown.value, packSizeDropdown.value, basePrice);
    cart.push(roll);
    console.log(cart);
})

// creating new rolls
const roll1 = new Roll("Original", glazing.options[1], packSize.options[0], basePrice);
console.log(roll1);

function addNewRoll(rollType, rollGlazing, packSize, basePrice) {
    // Create a new roll object. The Roll constructor takes three
    // arguments: the image URL, title text,  and body text.
    const roll = new Roll(rollType, rollGlazing, packSize, basePrice);
  
    // Add the notecard object to our notecard Set, which keeps track of all
    // the notecards in our application.
    cart.add(roll);
  
    return roll;
}

function createElement(notecard) {
    // make a clone of the notecard template
    const template = document.querySelector('#notecard-template');
    const clone = template.content.cloneNode(true);
    
    // connect this clone to our notecard.element
    // from this point we only need to refer to notecard.element
    notecard.element = clone.querySelector('.notecard');
  
    const btnDelete = notecard.element.querySelector('.icon-delete');
    console.log(btnDelete);
    btnDelete.addEventListener('click', () => {
      deleteNote(notecard);
    });
    
    // add the notecard clone to the DOM
    // find the notecard parent (#notecard-list) and add our notecard as its child
    const notecardListElement = document.querySelector('#notecard-list');
    notecardListElement.prepend(notecard.element);
    
    // populate the notecard clone with the actual notecard content
    updateElement(notecard);
  }