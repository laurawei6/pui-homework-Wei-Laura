const radioButtons = document.querySelectorAll('input[name="City"]');
console.log(radioButtons);
const confirmBtn = document.querySelector('#confirm');

confirmBtn.addEventListener("click", determineWeather);

function determineWeather() {
    for (const radioButton of radioButtons) {
        let chosenCity;
        if (radioButton.checked) {
            chosenCity = radioButton.value;
            console.log(radioButton.value);
            new City();
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