// glazing options for buns
const glazing = {
    options: ["Keep original", "Sugar milk", "Vanilla milk", "Double chocolate"],
    priceAdaptation: ["+ $0.00", "+ $0.00", "+ $0.50", "+ $1.50"],
}

// pack size options for buns
const packSize = {
    options: [1, 3, 6, 12],
    priceAdaptation: ["*1", "*3", "*5", "*10"],
}

// dropdown options
let glazingDropdown = document.querySelector("#glazing");

for (let option of glazing.options){
    let newOption = document.createElement("option");
    newOption.setAttribute("value", option);
    glazingDropdown.appendChild(newOption);
}