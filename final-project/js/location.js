const radioButtons = document.querySelectorAll('input[name="City"]');
const confirmBtn = document.querySelector('#confirm');

function determineWeather() {
    for (const radioButton of radioButtons) {
        let chosenCity;
        if (radioButton.checked) {
            chosenCity = radioButton.value;
            if (chosenCity === "Pittsburgh") {
                let pittsburgh = new City(40.4406, 79.9959);
                console.log(pittsburgh);
            } else if (chosenCity === "Tokyo") {
                let tokyo = new City(35.6764, 139.6500);
                console.log(tokyo);
            }
        }
    }
}

class City{
    constructor(lat, long){
        this.lat = lat;
        this.long = long;
    }
}