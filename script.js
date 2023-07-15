const data = document.getElementById('data')
const submit = document.getElementById('submit')
const aWeeksAgo = new Date()
aWeeksAgo.setDate(aWeeksAgo.getDate() - 7)
const threeWeeksAgo = new Date()
threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21)
document.getElementById('start-date').valueAsDate = threeWeeksAgo
document.getElementById('end-date').valueAsDate = aWeeksAgo
document.getElementById('start-date').min = '1940-01-01'
document.getElementById('start-date').max =
  aWeeksAgo.getUTCFullYear() +
  '-' +
  ('0' + (aWeeksAgo.getUTCMonth() + 1)).slice(-2) +
  '-' +
  ('0' + aWeeksAgo.getUTCDate()).slice(-2)
document.getElementById('end-date').min = '1940-01-01'
document.getElementById('end-date').max =
  aWeeksAgo.getUTCFullYear() +
  '-' +
  ('0' + (aWeeksAgo.getUTCMonth() + 1)).slice(-2) +
  '-' +
  ('0' + aWeeksAgo.getUTCDate()).slice(-2)

window.addEventListener('load', getDate)
submit.addEventListener('click', getDate)

function getDate() {
  const startDate = document.getElementById('start-date').value
  const endDate = document.getElementById('end-date').value
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=47.5&longitude=19.1&start_date=${startDate}&end_date=${endDate}&daily=weathercode,temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max&timezone=Europe%2FBerlin`
  getData(url)
}
async function getData(url) {
  try {
    const response = await fetch(url)
    const result = await response.json()
    const arrDays = []
    for (let k in result.daily.time) {
      const objDay = {}
      Object.keys(result.daily).forEach(function (key) {
        objDay[key] = result.daily[key][k]
      })
      arrDays.push(objDay)
    }
    kiir(arrDays)
  } catch (error) {
    console.error(error)
  }
}
function kiir(arr) {
  let text =
    '<table><tr><th>Dátum</th><th>Kód</th><th>Max (C°)</th><th>Min (C°)</th><th>Csap (mm)</th></tr>'
  arr.forEach(function (obj) {
    text += '<tr>'
    text += `<td>${obj.time}</td>`
    text += `<td>${obj.weathercode}</td>`
    text += `<td>${obj.temperature_2m_max}</td>`
    text += `<td>${obj.temperature_2m_min}</td>`
    text += `<td>${obj.precipitation_sum}</td>`
    text += '</tr>'
  })
  text += '</table>'
  data.innerHTML = text
}
