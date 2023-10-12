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

    console.log("roll: " + roll);
    console.log("roll.type: " + roll.type);
    
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

function retrieveFromLocalStorage() {
    const rollArrayString = localStorage.getItem('storedRolls');
    console.log(rollArrayString)
    const rollArray = JSON.parse(rollArrayString);
    console.log(rollArray)

    for (const rollData of rollArray) {
        console.log(rollData);
        const rollInfo = Object.entries(rollData);
        console.log(rollInfo);
        console.log(typeof rollInfo);
        // console.log(rollData);
        const roll = createElement(rollInfo[0][1], rollInfo[1][1], rollInfo[2][1], rollInfo[3][1]);
        console.log(rollInfo[0][1]);
        console.log(rollInfo[1][1]);
        console.log(rollInfo[2][1]);
        console.log(rollInfo[3][1]);
        createElement(roll);
    }

    // if (rollArray.length === 1) {
    //     const roll = new Roll(rollArray[1], rollArray.glazing, rollArray.size, rollArray.basePrice);
    //     console.log(roll);
    //     createElement(roll);
    // }
    // else {
    //     for (const rollData of rollArray) {
    //         // console.log(rollData);
    //         const roll = createElement(rollData.type, rollData.glazing, rollData.size, rollData.basePrice);
    //         createElement(roll);
    //     }
    // }
    
}

// only retrieve if local storage has stuff in it
if (localStorage.getItem('storedRolls') != null) {
    retrieveFromLocalStorage();
}