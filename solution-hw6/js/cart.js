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

// detail page updates
const cart = new Set();
const queryString = window.location.search;

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

// creates new roll and adds it to cart set
function addNewRoll(rollType, rollGlazing, packSize, rollPrice) {
    // Create a new roll object
    const roll = new Roll(rollType, rollGlazing, packSize, rollPrice);
  
    // Add the roll object to roll set
    cart.add(roll);
  
    return roll;
  }

const shoppingCart = document.querySelector("#cart-overview");

// cart price
const cartPrice = document.querySelector('.total-price.cart');
let price = 0;

// creating new rolls
function createElement(newRoll) {
    // make a clone of the roll template
    const template = document.querySelector('#product-choices-total-template');
    const clone = template.content.cloneNode(true);
    
    newRoll.element = clone.querySelector('.product-choices-total');

    // options
    const rollImage = clone.querySelector('#product-cart-img');
    const rollName = clone.querySelector('.product-offering-name.cart');
    const rollGlazing = clone.querySelector('.product-offering-glazing.cart');
    const rollPackSize = clone.querySelector('.product-offering-pack-size.cart');
    const rollPrice = clone.querySelector('.product-offering-price.cart');
    
    rollImage.src = "../assets/products/" + newRoll.type.toLowerCase() + "-cinnamon-roll.jpg";
    rollName.innerHTML = newRoll.type + " Cinnamon Roll";
    rollGlazing.innerHTML = newRoll.glazing;
    rollPackSize.innerHTML = "Pack size: " + newRoll.size;
    rollPrice.innerHTML = "$" + newRoll.totalPrice();

    shoppingCart.appendChild(clone);
    
    // add the roll clone to the DOM
    const cartList = document.querySelector('#cart-overview');
    cartList.appendChild(newRoll.element);

    // take price of bun and add to the cart price
    price += parseFloat(newRoll.totalPrice());
    updateCartPrice(newRoll);

    const removeBtn = newRoll.element.querySelector('.remove');
    removeBtn.addEventListener('click', () => {
      deleteRoll(newRoll);
    });
  }

for (const newRoll of cart) {
    // const newRollElement = createElement(newRoll);
    createElement(newRoll);
}

function updateCartPrice(newRoll) {
    cartPrice.innerHTML = "$" + String(Math.abs(price).toFixed(2));
}

function deleteRoll(newRoll) {
    // change price based on 
    price -= newRoll.totalPrice();
    console.log(price);
    updateCartPrice(newRoll);
    
    // remove the roll DOM object from the UI
    newRoll.element.remove();
    // remove the actual Notecard object from our set of notecards
    cart.delete(newRoll);

    // update local storage
    saveToLocalStorage();
  }

// add

function saveToLocalStorage() {
    const rollArray = Array.from(cart);
    console.log(rollArray);
    
    const rollArrayString = JSON.stringify(rollArray);
    console.log(rollArrayString);
  
    localStorage.setItem('storedRolls', rollArrayString);
  }

function retrieveFromLocalStorage() {
    const rollArrayString = localStorage.getItem('storedRolls');
    const rollArray = JSON.parse(rollArrayString);
    for (const rollData of rollArray) {
      const roll = addNewRoll(noteData.noteImageURL, noteData.noteTitle, noteData.noteBody);
      createElement(roll);
    }
  }

// only retrieve if local storage has stuff in it
if (localStorage.getItem('storedRolls') != null) {
    retreiveFromLocalStorage();
}