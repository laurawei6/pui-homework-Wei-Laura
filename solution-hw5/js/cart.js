// detail page updates
const cart = new Set();
const queryString = window.location.search;

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

// roll prices
// let basePrice = rolls[rollType]["basePrice"];
// let totalPriceDetail = document.querySelector(".total.detail");
// let glazingPrice = 0;
// let packPrice = 1;
// let totalItemPrice;
// totalPriceDetail.innerHTML = "$" + basePrice;

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

// add to cart
let addToCart = document.querySelector("button");
addToCart.addEventListener("click", function() {
    let roll = new Roll(rollType, glazingDropdown, packSizeDropdown, basePrice);
    cart.push(roll);
    console.log(cart);
})

const originalRoll = new Roll("Original", glazing.options[1], packSize.options[0], 2.49);
const walnutRoll = new Roll("Walnut", glazing.options[2], packSize.options[3], 3.49);
const raisinRoll = new Roll("Raisin", glazing.options[1], packSize.options[1], 2.99);
const appleRoll = new Roll("Apple", glazing.options[0], packSize.options[1], 3.49);
console.log(originalRoll);
console.log(walnutRoll);
console.log(raisinRoll);
console.log(originalRoll.totalPrice());

// creating new rolls using class and constructor
function addNewRoll(rollType, rollGlazing, packSize, basePrice) {
    // Create a new roll object using Roll class
    const newRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
  
    // Add the roll object to our cart Set
    cart.add(newRoll);
  
    return newRoll;
}

// creating new rolls
function createElement(newRoll) {
    // make a clone of the roll template
    const template = document.querySelector('#product-choices-total-template');
    const clone = template.content.cloneNode(true);
    
    newRoll.element = clone.querySelector('.product-choices-total');
  
    const removeBtn = newRoll.element.querySelector('.remove');
    console.log(removeBtn);
    removeBtn.addEventListener('click', () => {
      deleteRoll(newRoll);
    });
    
    // add the roll clone to the DOM
    const cartList = document.querySelector('#cart');
    cartList.appendChild(roll.element);
    
    // populate the roll clone with the actual roll content
    updateElement(newRoll);
  }

  // updating the roll with information
  function updateElement(newRoll) {
    // get the HTML elements that need updating
    const rollImageElement = notecard.element.querySelector('.product-card-img');
    const rollName = notecard.element.querySelector('.product-offering-name .cart');
    const rollGlazing = notecard.element.querySelector('.product-offering-glazing .cart');
    const rollPackSize = notecard.element.querySelector('.product-offering-pack-size .cart');
    
    // copy our roll content over to the corresponding HTML elements
    rollImageElement.src = newRoll.noteImageURL;
    // noteTitleElement.innerText = notecard.noteTitle;
    // noteBodyElement.innerText = notecard.noteBody;
  }

