const data = document.getElementById('data')
const submit = document.getElementById('submit')
const dataTable = document.getElementById('data-table')
const aWeekAgo = new Date()
aWeekAgo.setDate(aWeekAgo.getDate() - 7)
const threeWeeksAgo = new Date()
threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21)
document.getElementById('start-date').valueAsDate = threeWeeksAgo
document.getElementById('end-date').valueAsDate = aWeekAgo
document.getElementById('start-date').min = '1940-01-01'
document.getElementById('start-date').max =
  aWeekAgo.getUTCFullYear() +
  '-' +
  ('0' + (aWeekAgo.getUTCMonth() + 1)).slice(-2) +
  '-' +
  ('0' + aWeekAgo.getUTCDate()).slice(-2)
document.getElementById('end-date').min = '1940-01-01'
document.getElementById('end-date').max =
  aWeekAgo.getUTCFullYear() +
  '-' +
  ('0' + (aWeekAgo.getUTCMonth() + 1)).slice(-2) +
  '-' +
  ('0' + aWeekAgo.getUTCDate()).slice(-2)

window.addEventListener('load', getDate)
submit.addEventListener('click', getDate)

function getDate() {
  const startDate = document.getElementById('start-date').value
  const endDate = document.getElementById('end-date').value
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=47.4&longitude=19.1&start_date=${startDate}&end_date=${endDate}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FBerlin`
  getData(url)
}

async function getData(url) {
  try {
    const response = await fetch(url)
    const result = await response.json()
    const arrDays = []
    deleteFromTable()
    for (let k in result.daily.time) {
      const objDay = {}
      Object.keys(result.daily).forEach(function (key) {
        objDay[key] = result.daily[key][k]
      })
      arrDays.push(objDay)
    }
    writeToTable(arrDays)
  } catch (error) {
    console.error(error)
  }
}

function writeToTable(arr) {
  arr.forEach(function (obj) {
    let tr = document.createElement('tr')
    dataTable.appendChild(tr)
    Object.keys(obj).forEach(function (key) {
      console.log(key, obj[key])
      let td = document.createElement('td')
      tr.appendChild(td)
      td.innerHTML = obj[key]
    })
  })
}

function deleteFromTable() {
  dataTable.innerHTML = ''
}
