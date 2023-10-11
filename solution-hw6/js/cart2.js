const cart = new Set();

// creates new roll and adds it to cart set
function addNewRoll(rollType, rollGlazing, packSize, rollPrice, event) {
    // Create a new roll object
    const roll = new Roll(rollType, rollGlazing, packSize, rollPrice);
  
    // Add the roll object to roll set
    cart.add(roll);
    saveToLocalStorage();
  
    return roll;
}

// creating new rolls
function createElement(roll) {
    // make a clone of the roll template
    const template = document.querySelector("#product-choices-total-template");
    const clone = template.content.cloneNode(true);
    
    roll.element = clone.querySelector('.product-choices-total');

    // options
    const rollImage = clone.querySelector('#product-cart-img');
    const rollName = clone.querySelector('.product-offering-name.cart');
    const rollGlazing = clone.querySelector('.product-offering-glazing.cart');
    const rollPackSize = clone.querySelector('.product-offering-pack-size.cart');
    const rollPrice = clone.querySelector('.product-offering-price.cart');
    
    rollImage.src = "../assets/products/" + roll.type.toLowerCase() + "-cinnamon-roll.jpg";
    rollName.innerHTML = roll.type + " Cinnamon Roll";
    rollGlazing.innerHTML = roll.glazing;
    rollPackSize.innerHTML = "Pack size: " + roll.size;
    rollPrice.innerHTML = "$" + roll.totalPrice();

    shoppingCart.appendChild(clone);
    
    // add the roll clone to the DOM
    const cartList = document.querySelector('#cart-overview');
    cartList.appendChild(roll.element);

    // take price of bun and add to the cart price
    price += parseFloat(roll.totalPrice());
    updateCartPrice(roll);

    // remove button
    const removeBtn = roll.element.querySelector('.remove');
    removeBtn.addEventListener('click', () => {
      deleteRoll(roll);
    });
}

for (const roll of cart) {
    createElement(roll);
}

function updateCartPrice(roll) {
    cartPrice.innerHTML = "$" + String(Math.abs(price).toFixed(2));
}

function deleteRoll(roll) {
    // change price based on 
    price -= roll.totalPrice();
    console.log(price);
    updateCartPrice(roll);
    
    // remove the roll DOM object from the UI
    roll.element.remove();
    // remove the actual Notecard object from our set of notecards
    cart.delete(roll);

    // update local storage
    saveToLocalStorage();
}

function retrieveFromLocalStorage() {
    const rollArrayString = localStorage.getItem('storedRolls');
    const rollArray = JSON.parse(rollArrayString);
    console.log("rollArray: " + rollArray);
    console.log(new Array(...rollArray));
    for (const rollData of rollArray) {
      const roll = addNewRoll(rollData.type, rollData.glazing, rollData.size, rollData.basePrice);
      createElement(roll);
    }
}

// only retrieve if local storage has stuff in it
if (localStorage.getItem('storedRolls') != null) {
    retrieveFromLocalStorage();
}