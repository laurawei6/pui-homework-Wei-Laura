// detail page updates
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

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
let rollPrice = rolls[rollType].basePrice;
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
headerElement.innerText = rollType + " Cinnamon Roll";

// Update the image
const detailImage = document.querySelector('#roll-detail-page');
let rollImage = rolls[rollType].imageFile;
detailImage.src = '../assets/products/' + rollImage;

// add to cart button
const addToCart = document.querySelector(".total-addToCart button");
addToCart.addEventListener("click", addNewRoll);

// const cart = retrieveFromLocalStorage();

// creates new roll and adds it to cart set
function addNewRoll() {
    // what user selected
    // source for this line of code is from here: https://stackoverflow.com/questions/5913/getting-the-text-from-a-drop-down-box
    let rollGlazing = glazing.options[glazingDropdown.selectedIndex];
    let packSize = packs.options[packSizeDropdown.selectedIndex];

    // Create a new roll object
    const roll = new Roll(rollType, rollGlazing, packSize, rollPrice);
  
    // Add the roll object to roll set
    cart.push(roll);
    console.log(cart);
    saveToLocalStorage(cart);
  
    return roll;
}

function saveToLocalStorage(cart) {
    if (localStorage.getItem('storedRolls') === null){
        const rollArrayString = JSON.stringify(cart);
        console.log(rollArrayString);
  
        localStorage.setItem('storedRolls', rollArrayString);
    } else {
        let storedRolls = JSON.parse(localStorage.getItem('storedRolls'));
        storedRolls.push(cart[cart.length - 1]);
        let storedRollsString = JSON.stringify(storedRolls);
        localStorage.setItem('storedRolls', storedRollsString);
    }
}

function retrieveFromLocalStorage() {
    const rollArrayString = localStorage.getItem('storedRolls');
    const rollArray = JSON.parse(rollArrayString);
}

// only retrieve if local storage has stuff in it
if (localStorage.getItem('storedRolls') != null) {
    retrieveFromLocalStorage();
}
