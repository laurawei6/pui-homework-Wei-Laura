const radioButtons = document.querySelectorAll('input[name="city"]');

function determineWeather() {
    if (cityDropdown.value == "Pittsburgh") {
        console.log("Pittsburgh");
        new City() 
    } else if (cityDropdown.value == "Tokyo") {
        console.log("Tokyo");
    }
}

class City{
    constructor(lat, long){
        this.lat = lat;
        this.long = long;
    }
}


btn.addEventListener("click", () => {
    let selectedSize;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedSize = radioButton.value;
            break;
        }
    }