const sfx = {
    'rain': {
        'morning': 'https://dl.vgmdownloads.com/soundtracks/animal-crossing-new-horizons-original-soundtrack-limited-edition/fuyestpluk/2-09%20-%208%20am%20%28Rain%29.mp3',
        'night': 'https://dl.vgmdownloads.com/soundtracks/animal-crossing-new-horizons-original-soundtrack-limited-edition/bprgbccncf/2-14%20-%201%20pm%20%28Rain%29.mp3'
    },
    'snow': {
        'morning': 'https://dl.vgmdownloads.com/soundtracks/animal-crossing-new-horizons-original-soundtrack-limited-edition/lqjklysucg/2-32%20-%207%20am%20%28Snow%29.mp3',
        'night': 'https://dl.vgmdownloads.com/soundtracks/animal-crossing-new-horizons-original-soundtrack-limited-edition/lizmokgyqq/2-44%20-%207%20pm%20%28Snow%29.mp3'
    },
    'clear': {
        'morning': 'https://dl.vgmdownloads.com/soundtracks/animal-crossing-new-horizons-original-soundtrack-limited-edition/rbmefcxsvg/1-01%20-%20Opening%20Theme.mp3',
        'night': 'https://dl.vgmdownloads.com/soundtracks/animal-crossing-new-horizons-original-soundtrack-limited-edition/chohsrdyem/1-18%20-%204%20pm%20%28Sunny%29.mp3'
    }
}

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
  let timeString = new Date().toLocaleString('en-US', { timeZone: 'America/New_York', timeStyle: 'medium' });

  for (const radioButton of radioButtons) {
      if (radioButton.checked) {
          chosenCity = radioButton.value;
          if (chosenCity === "Pittsburgh") {
              const pittsburgh = new City(40.4406, 79.9959);
              chosenCity = pittsburgh;
              timeString = new Date().toLocaleString('en-US', { timeZone: 'America/New_York', timeStyle: 'medium' });
          } else if (chosenCity === "Tokyo") {
              const tokyo = new City(35.6764, 139.6500);
              chosenCity = tokyo;
              timeString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo', timeStyle: 'medium' });
          }
      }
  }

  const weatherDescription = await fetchWeather(chosenCity);
  const weather = translateWeather(weatherDescription);
  const time = translateTime(timeString);

  playMusic(weather, time);
  changeSongDescription(weather, time);
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

function translateTime(dateString) {
    if (dateString.includes('AM')) {
        return 'morning'
    }
    
    return 'night'
}

function playMusic(weather, time) {
    const url = sfx[weather][time];

    console.log({weather, time, url});
    
    const sound = new Howl({
    src: [url],
    html5: true,
    autoplay: true
  });

  console.log({sound})

  sound.play()
}

const songDescription = document.querySelector(".btm-info>h2");
console.log(songDescription);

function changeSongDescription(weather, time){
  songDescription.textContent = weather + ", " + time;
}