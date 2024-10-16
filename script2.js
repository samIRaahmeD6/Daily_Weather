const base_url = 'http://api.weatherapi.com/v1/future.json?'
const key = '373fc7ab5c9943f0b2e184237241410'

const params = new URLSearchParams(window.location.search)
const country = params.get('country')
const date = params.get('date')

if (country && date) {
  console.log(`Country: ${country}, Date: ${date}`)
  fetchFutureForecast(country, date)
} else {
  console.error('Country or Date not specified')
}

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search)
  const country = params.get('country')
  const date = params.get('date')
  if (country && date) {
    try {
      const futureData = await fetchFutureForecast(country, date)
      if (futureData) {
        displayFutureWeatherInfo(futureData)
      }
    } catch (error) {
      console.error('Country or Date not specified', error)
    }
  } else {
    console.error('No country specified')
  }
})

async function fetchFutureForecast(country, date) {
  const futureUrl = `${base_url}key=${key}&&q=${country}&dt=${date}`

  try {
    const response = await fetch(futureUrl)
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

function displayFutureWeatherInfo(data) {
  if (
    !data.forecast ||
    !data.forecast.forecastday ||
    data.forecast.forecastday.length === 0
  ) {
    console.error('No forecast data available.')
    return
  }

  const localTime = data.location.localtime
  const localHour = new Date(localTime).getHours()

  const isDay = localHour >= 6 && localHour < 18

  if (isDay) {
    document.body.style.backgroundColor = '#A2D2DF'
    document.body.style.color = 'black'
  } else {
    document.body.style.backgroundColor = '#3C3D37'
    document.body.style.color = '#ECDFCC'
  }

  let info = document.getElementsByClassName('forecast-info')
  for (let i = 0; i < info.length; i++) {
    info[i].style.backgroundColor = isDay ? '#A2D2DF' : '#181C14'
  }

  const forecastContainer = document.getElementById('futureForecast')
  const summarySection = document.getElementById('summarySection')

  if (!forecastContainer || !summarySection) {
    console.error('Data missing')
    return
  }

  forecastContainer.innerHTML = ''
  summarySection.innerHTML = ''

  const avgTemp = `${data.forecast.forecastday[0].day.avgtemp_c}℃`
  const minTemp = `${data.forecast.forecastday[0].day.mintemp_c}℃`
  const maxTemp = `${data.forecast.forecastday[0].day.maxtemp_c}℃`

  summarySection.innerHTML = `
    <div style="background-color: ${isDay ? '#A2D2DF' : '#3C3D37'}; ">
      <strong>Avg Temp:</strong> ${avgTemp}<br>
      <strong>Min Temp:</strong> ${minTemp}<br>
      <strong>Max Temp:</strong> ${maxTemp}
    </div>
  `

  forecastContainer.style.display = 'grid'
  forecastContainer.style.gridTemplateColumns = 'repeat(4, 1fr)'
  forecastContainer.style.gap = '10px'

  const hoursToShow = [0, 3, 6, 9, 12, 15, 18, 21]
  hoursToShow.forEach((hourIndex) => {
    const hourData = data.forecast.forecastday[0].hour[hourIndex]
    if (!hourData) return

    const time = new Date(hourData.time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    const temp = `${hourData.temp_c}℃`
    const condition = hourData.condition.text
    const iconSrc = hourData.condition.icon

    const forecastItem = document.createElement('div')
    forecastItem.classList.add('forecast-item')
    forecastItem.style.textAlign = 'center'
    forecastItem.style.backgroundColor = isDay ? '#5B99C2' : '#181C14'
    forecastItem.style.padding = '10px'
    forecastItem.style.borderRadius = '8px'

    const timeElem = document.createElement('div')
    timeElem.textContent = time

    const tempElem = document.createElement('div')
    tempElem.textContent = temp

    const iconElem = document.createElement('img')
    iconElem.src = iconSrc
    iconElem.alt = condition
    iconElem.style.width = '50px'
    iconElem.style.height = '50px'

    const conditionElem = document.createElement('div')
    conditionElem.textContent = condition

    forecastItem.appendChild(timeElem)
    forecastItem.appendChild(iconElem)
    forecastItem.appendChild(tempElem)
    forecastItem.appendChild(conditionElem)

    forecastContainer.appendChild(forecastItem)
  })
}
