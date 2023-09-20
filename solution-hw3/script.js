// glazing options for rolls
const glazing = {
    options: ["Keep original", "Sugar milk", "Vanilla milk", "Double chocolate"],
    priceAdaptation: ["+ $0.00", "+ $0.00", "+ $0.50", "+ $1.50"],
}

// pack size options for rolls
const packSize = {
    options: [1, 3, 6, 12],
    priceAdaptation: ["*1", "*3", "*5", "*10"],
}

// dropdown options
let glazingDropdown = document.querySelector("#glazing");
let packSizeDropdown = document.querySelector("#pack-size");

for (let option of glazing.options){
    let newOption = document.createElement("option");
    newOption.setAttribute("value", option);
    newOption.textContent = option;
    glazingDropdown.appendChild(newOption);
}

for (let option of packSize.options){
    let newOption = document.createElement("option");
    newOption.setAttribute("value", option);
    newOption.textContent = option;
    packSizeDropdown.appendChild(newOption);
}

// roll prices
let defaultPrice = 2.49;
