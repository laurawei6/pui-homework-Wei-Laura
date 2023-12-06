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

const apiKey = 'b1dca7eb2a1128f628e81314d8f7ec88';
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=40.44&lon=79.99&appid=b1dca7eb2a1128f628e81314d8f7ec88&units=imperial`;

const outputElement = document.getElementById('weatherInfo');

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const temperature = data.list.main.temp;
    const description = data.weather[0].description;
    const location = data.name;
    outputElement.textContent = `Temperature in ${location}: ${temperature}°F. Weather: ${description}`;
  })
  .catch(error => {
    console.error('Error:', error);
  });