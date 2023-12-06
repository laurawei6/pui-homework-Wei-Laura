const radioButtons = document.querySelectorAll('input[name="city"]');
const confirmBtn = document.querySelector('#confirm');

confirmBtn.addEventListener("click", determineWeather);

function determineWeather() {
    for (const radioButton of radioButtons) {
        if (radioButtons.checked) {
            console.log("Pittsburgh");
            new City();
        } else if (radioButtons.checked) {
            console.log("Tokyo");
        }
    }
    
}

class City{
    constructor(lat, long){
        this.lat = lat;
        this.long = long;
    }
}


// btn.addEventListener("click", () => {
//     let selectedSize;
//     for (const radioButton of radioButtons) {
//         if (radioButton.checked) {
//             selectedSize = radioButton.value;
//             break;
//         }
//     }