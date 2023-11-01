const shoppingCart = document.querySelector("#cart-overview");

// cart price
const cartPrice = document.querySelector('.total-price.cart');
let price = 0;

// creating new rolls
function createElement(roll) {
    // make a clone of the roll template
    const template = document.querySelector("#product-choices-total-template");
    const clone = template.content.cloneNode(true);
    
    roll.element = clone.querySelector('.product-choices-total');

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

function updateCartPrice(roll) {
    cartPrice.innerHTML = "$" + String(Math.abs(price).toFixed(2));
}

function deleteRoll(roll) {
    // remove the actual roll object from our cart
    let whereIsRoll = cart.find(element => roll.type === roll.type); 
    let x = cart.splice(cart.indexOf(whereIsRoll), cart.indexOf(whereIsRoll)+1);
    
    // change price based on what was removed
    price -= roll.totalPrice();
    updateCartPrice(roll);
    
    // remove the roll DOM object from the UI
    roll.element.remove();

    // set local storage to cart
    if (cart.length !== 0) {
        console.log(cart);
        localStorage.setItem("storedRolls", JSON.stringify(cart));
    } else {
        localStorage.clear();
        console.log(cart);
        cart = [];
    }
}

function retrieveFromLocalStorage() {
    const rollArrayString = localStorage.getItem('storedRolls');
    cart = JSON.parse(rollArrayString);
    console.log(cart);

    for (let roll of cart){
        createElement(roll = new Roll(roll.type, roll.glazing, roll.size, roll.basePrice));
    }
}

// only retrieve if local storage has stuff in it
if (localStorage.getItem('storedRolls') != null) {
    retrieveFromLocalStorage();
}