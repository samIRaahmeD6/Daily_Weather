const base_url = 'https://api.weatherapi.com/v1/current.json?'
const key = '373fc7ab5c9943f0b2e184237241410'
let btn = document.querySelector('#btn')
let btn2 = document.querySelector('#btn2')
let input2 = document.querySelector('#input2')
let info = document.querySelector('#info')

async function FetchDailyWeather(country) {
  const URL = `${base_url}key=${key}&q=${country}&aqi=yes`
  const response = await fetch(URL)

  if (response.ok) {
    try {
      let data = await response.json()
      console.log(data)
      return data
    } catch (error) {
      console.error('hello' + error)
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const country = document.querySelector('#input').value
  console.log(country)
  try {
    let data = await FetchDailyWeather(country)
    displayWeatherInfo(data)
  } catch (error) {
    console.error('Error while fetching data at the time of loading', error)
  }
})

function displayWeatherInfo(data) {
  console.log(data.current.is_day)
  let info = document.getElementsByClassName('info')
  if (data.current.is_day == '1') {
    document.body.style.backgroundColor = '#A2D2DF'
    document.body.style.color = 'black'

    input.style.backgroundColor = '#5B99C2'
    input.style.color = 'black'

    btn.style.backgroundColor = '#5B99C2'
    btn.style.color = 'black'

    input2.style.backgroundColor = '#5B99C2'
    input2.style.color = 'black'

    btn2.style.backgroundColor = '#5B99C2'
    btn2.style.color = 'black'

    for (let i = 0; i < info.length; i++) {
      info[i].style.backgroundColor = '#5B99C2'
    }
  } else if (data.current.is_day == '0') {
    document.body.style.backgroundColor = '#3C3D37'
    document.body.style.color = '#ECDFCC'

    input.style.backgroundColor = '#181C14'
    input.style.color = '#ECDFCC'

    input2.style.backgroundColor = '#181C14'
    input2.style.color = '#ECDFCC'

    btn.style.backgroundColor = '#181C14'
    btn.style.color = '#ECDFCC'

    btn2.style.backgroundColor = '#181C14'
    btn2.style.color = '#ECDFCC'

    for (let i = 0; i < info.length; i++) {
      info[i].style.backgroundColor = '#181C14'
    }
  }
  const CountryName = document.getElementById('country')

  const Name = document.getElementById('name')

  const Region = document.getElementById('region')

  const Localtime = document.getElementById('localtime')

  const tempc = document.getElementById('temp')

  const wind_mph = document.getElementById('wind_mph')
  const wind_kph = document.getElementById('wind_kph')
  const windchill_c = document.getElementById('windchill_c')
  const windchill_f = document.getElementById('windchill_f')

  const heatindex_c = document.getElementById('heatindex_c')
  const heatindex_f = document.getElementById('heatindex_f')

  const feelslike_c = document.getElementById('feelslike_c')
  const feelslike_f = document.getElementById('feelslike_f')

  const dewpoint_c = document.getElementById('dewpoint_c')
  const dewpoint_f = document.getElementById('dewpoint_f')

  const humidity = document.getElementById('humidity')
  const cloud = document.getElementById('cloud')

  const co = document.getElementById('co')
  const no2 = document.getElementById('no2')
  const o3 = document.getElementById('o3')
  const so2 = document.getElementById('so2')

  const iconUrl = `https:${data.current.condition.icon}`
  const conditionText = data.current.condition.text

  document.getElementById('condition-text').textContent = conditionText
  document.getElementById('weather-icon').src = iconUrl

  CountryName.innerText = data.location.country
  Name.innerText = data.location.name
  Region.innerText = data.location.region
  tempc.innerText = data.current.temp_c + '℃'
  Localtime.innerText = data.location.localtime

  wind_mph.innerText = data.current.wind_mph + 'mph'
  wind_kph.innerText = data.current.wind_kph + 'kph'
  windchill_c.innerText = data.current.windchill_c + '℃'
  windchill_f.innerText = data.current.windchill_f + '℉'

  heatindex_c.innerText = data.current.heatindex_c + '℃'
  heatindex_f.innerText = data.current.heatindex_f + '℉'

  dewpoint_c.innerText = data.current.dewpoint_c + '℃'
  dewpoint_f.innerText = data.current.dewpoint_f + '℉'

  feelslike_c.innerText = data.current.feelslike_c + '℃'
  feelslike_f.innerText = data.current.feelslike_f + '℉'

  co.innerText = data.current.air_quality.co
  no2.innerText = data.current.air_quality.no2
  o3.innerText = data.current.air_quality.o3
  so2.innerText = data.current.air_quality.so2

  humidity.innerText = data.current.humidity + '%'
  cloud.innerText = data.current.cloud + '%'
}

btn.addEventListener('click', async (evt) => {
  evt.preventDefault()
  let input = document.querySelector('#input').value
  try {
    let weatherData = await FetchDailyWeather(input)
    displayWeatherInfo(weatherData)
  } catch (error) {
    console.error('Error' + error)
  }
})

function redirectToHourlyUpdate() {
  const country = document.querySelector('#input').value
  if (country) {
    window.location.href = `hourlyUpdate.html?country=${encodeURIComponent(
      country
    )}`
  } else {
    alert('Please enter a country name!')
  }
}
function redirectToFutureForecasting() {
  const country = document.getElementById('input').value
  const date = document.getElementById('input2').value
  const url = `futureForecast.html?country=${encodeURIComponent(
    country
  )}&date=${encodeURIComponent(date)}`
  window.location.href = url
}
