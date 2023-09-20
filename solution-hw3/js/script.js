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
let defaultPrice = 2.49;
const totalPriceDetail = document.querySelector(".total.detail");

function glazingChange(element) {
    // get value of selected glazing option
    const priceChange = parseFloat(element.value);
    // update the price

    totalPriceDetail.textContent = priceChange;
}
  