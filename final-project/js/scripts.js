
// selected navigation item
const navOption = document.querySelector("ul div");
let imgInQuestion = navOption.querySelector("ul div img");
let navHeader = navOption.querySelector("ul h2").textContent;
if (navOption.classList.contains('selected')) {
    imgInQuestion.src = './Icons/LeftBanner/' + navHeader + "-Filled.svg";
} else {
    imgInQuestion.src = './Icons/LeftBanner/' + navHeader + "-Outlined.svg";
}

const radioButtons = document.querySelectorAll('input[name="City"]');
const confirmBtn = document.querySelector('#confirm');

async function determineCity() {
  // Pittsburgh
  let chosenCity = new City(40.4406, 79.9959);
  let timeString = Date.now().toLocaleDateString('en-US', { timeZone: 'America/New_York' });

  for (const radioButton of radioButtons) {
      if (radioButton.checked) {
          chosenCity = radioButton.value;
          if (chosenCity === "Pittsburgh") {
              const pittsburgh = new City(40.4406, 79.9959);
              chosenCity = pittsburgh;
              timeString = Date.now().toLocaleDateString('en-US', { timeZone: 'America/New_York' });
          } else if (chosenCity === "Tokyo") {
              const tokyo = new City(35.6764, 139.6500);
              chosenCity = tokyo;
              timeString = Date.now().toLocaleDateString(('en-US', { timeZone: 'Asia/Tokyo' }))
          }
      }
  }

  const weatherDescription = await fetchWeather(chosenCity);
  const weather = translateWeather(weatherDescription);

  console.log({ weatherDescription, weather, timeString});
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

    console.log({firstItem})
    return description
  })
  .catch(error => {
    console.error('Error:', error);
  });

  playMusic();

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

function playMusic() {
  const sound = new Howl({
    src: ['https://dl.vgmdownloads.com/soundtracks/animal-crossing-new-horizons-original-soundtrack-limited-edition/rbmefcxsvg/1-01%20-%20Opening%20Theme.mp3'],
    html5: true,
    autoplay: true
  });

  console.log({sound})

  sound.play()
}