const base_url = 'http://api.weatherapi.com/v1/forecast.json?'
const key = '373fc7ab5c9943f0b2e184237241410'

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search)
  const country = params.get('country')

  if (country) {
    try {
      const hourlyData = await fetchHourlyWeather(country)
      if (hourlyData) {
        displayHourlyWeatherInfo(hourlyData)
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  } else {
    console.error('No country specified')
  }
})

async function fetchHourlyWeather(country) {
  const hourlyUrl = `${base_url}key=${key}&q=${country}&days=1&aqi=no&alerts=no`
  console.log(hourlyUrl)

  try {
    const response = await fetch(hourlyUrl)
    if (!response.ok) {
      console.error('Error fetching hourly weather data')
      return null
    }

    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error('Error parsing hourly weather data:', error)
    return null
  }
}

function displayHourlyWeatherInfo(data) {
  if (
    !data.forecast ||
    !data.forecast.forecastday ||
    data.forecast.forecastday.length === 0
  ) {
    console.error('No forecast data available.')
    return
  }

  const isDay = data.current.is_day
  let info = document.getElementsByClassName('info')

  if (isDay) {
    document.body.style.backgroundColor = '#A2D2DF'
    document.body.style.color = 'black'
    for (let i = 0; i < info.length; i++) {
      info[i].style.backgroundColor = '#5B99C2'
    }
  } else {
    document.body.style.backgroundColor = '#3C3D37'
    document.body.style.color = '#ECDFCC'
    for (let i = 0; i < info.length; i++) {
      info[i].style.backgroundColor = '#181C14'
    }
  }

  const hourlyContainer = document.getElementById('hourlyWeather')
  if (!hourlyContainer) {
    console.error('No container element found for displaying weather data.')
    return
  }

  const currentHourData = data.forecast.forecastday[0].hour

  currentHourData.forEach((hour) => {
    const grid = document.createElement('div')
    grid.classList.add('weather-grid')
    const time = document.createElement('div')
    time.classList.add('grid-item')
    time.textContent = `Time: ${hour.time}`

    const temp = document.createElement('div')
    temp.classList.add('grid-item')
    temp.textContent = `Temperature: ${hour.temp_c}℃`

    const rain = document.createElement('div')
    rain.classList.add('grid-item')
    rain.textContent = `Chance of Rain: ${hour.chance_of_rain}%`

    const snow = document.createElement('div')
    snow.classList.add('grid-item')
    snow.textContent = `Chance of Snow: ${hour.chance_of_snow}%`

    const cloud = document.createElement('div')
    cloud.classList.add('grid-item')
    cloud.textContent = `Cloud Cover: ${hour.cloud}%`

    const humidity = document.createElement('div')
    humidity.classList.add('grid-item')
    humidity.textContent = `Humidity: ${hour.humidity}%`

    grid.appendChild(time)
    grid.appendChild(temp)
    grid.appendChild(rain)
    grid.appendChild(snow)
    grid.appendChild(cloud)
    grid.appendChild(humidity)

    hourlyContainer.appendChild(grid)
  })
}
