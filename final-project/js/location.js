const radioButtons = document.querySelectorAll('input[name="City"]');
const confirmBtn = document.querySelector('#confirm');

async function determineCity() {
  // Pittsburgh
  let chosenCity = new City(40.4406, 79.9959);

  for (const radioButton of radioButtons) {
      if (radioButton.checked) {
          chosenCity = radioButton.value;
          if (chosenCity === "Pittsburgh") {
              const pittsburgh = new City(40.4406, 79.9959);
              chosenCity = pittsburgh;
          } else if (chosenCity === "Tokyo") {
              const tokyo = new City(35.6764, 139.6500);
              chosenCity = tokyo;
          }
      }
  }

  const weatherDescription = await fetchWeather(chosenCity);
  const weather = translateWeather(weatherDescription);

  console.log({ weatherDescription, weather });
}


class City{
    constructor(lat, long){
        this.lat = lat;
        this.long = long;
    }
}

const apiKey = 'b1dca7eb2a1128f628e81314d8f7ec88';
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=40.44&lon=79.99&appid=b1dca7eb2a1128f628e81314d8f7ec88&units=imperial`;

async function fetchWeather(city) {
  const { lat, long } = city;

  const apiKey = 'b1dca7eb2a1128f628e81314d8f7ec88';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;

  const description = await fetch(apiUrl).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const firstItem = data.list[0];
    const description = firstItem.weather[0].description;
    const location = data.name;
    // outputElement.textContent = `Weather: ${description}`;
    return description
  })
  .catch(error => {
    console.error('Error:', error);
  });

  return description;
}

function translateWeather(description) {
  if (description.includes("rain")) {
    return "rain";
  }

  if (description.includes("snow")) {
    return "snow";
  }

  return "clear"
}