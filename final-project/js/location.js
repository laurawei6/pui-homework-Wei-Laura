const cityDropdown = document.querySelector("form");

cityDropdown.addEventListener("click", determineWeather);

function determineWeather() {
    if (cityDropdown.value == "Pittsburgh") {
        console.log("pittsburgh");
        // lat = 
    } else if (cityDropdown.value == "Tokyo") {
        console.log("Tokyo");
    }
}

class City(lat, long){
    constructor(lat, long){
        
    }
}