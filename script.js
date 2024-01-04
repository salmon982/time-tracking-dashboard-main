const dailyButton = document.querySelector('.daily');
const weeklyButton = document.querySelector('.weekly');
const monthlyButton = document.querySelector('.monthly');
let data;

fetch('data.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
    displayData('weekly');
  })
  .catch(error => console.error('Error fetching data:', error));

function displayData(timeframe) {
  const selectedData = data.map(item => ({
    title: item.title,
    current: item.timeframes[timeframe].current,
    previous: item.timeframes[timeframe].previous,
  }));

  selectedData.forEach(item => {
    const element = document.querySelector(`.${item.title.toLowerCase()}-hours`);
    const lastElement = document.querySelector(`.last-${item.title.toLowerCase()}-hours`);

    if (element && lastElement) {
      element.textContent = `${item.current}hrs`;
      lastElement.textContent = `Last Week - ${item.previous}hrs`;
    }
  });
}

dailyButton.addEventListener('click', () => {
  dailyButton.classList.add('selected');
  weeklyButton.classList.remove('selected');
  monthlyButton.classList.remove('selected');
  displayData('daily');
});

weeklyButton.addEventListener('click', () => {
  dailyButton.classList.remove('selected');
  weeklyButton.classList.add('selected');
  monthlyButton.classList.remove('selected');
  displayData('weekly');
});

monthlyButton.addEventListener('click', () => {
  dailyButton.classList.remove('selected');
  weeklyButton.classList.remove('selected');
  monthlyButton.classList.add('selected');
  displayData('monthly');
});

