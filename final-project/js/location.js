const cityDropdown = document.querySelector("form");

cityDropdown.addEventListener("click", determineWeather);

function determineWeather() {
    if (cityDropdown.value == "Pittsburgh") {
        console.log("pittsburgh");
    } else if (cityDropdown.value == "Tokyo") {
        console.log("Tokyo");
    }
}