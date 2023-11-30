const table = document.querySelector('.main');
let sortOrder = 'DESC';
let currentSortField = null;

function clearSortArrow(buttonElement) {
  buttonElement.textContent = buttonElement.textContent.replace(/ ▼| ▲/, '');
}

function updateSortButtonText(buttonElement, sortOrder, sortField) {
  clearSortArrow(buttonElement);
  buttonElement.textContent = ` ${sortField} ${sortOrder === 'DESC' ? '▼' : '▲'}`;
}

function handleButtonClick(sortField, buttonElement) {
  if (currentSortField && currentSortField !== sortField) {
    const previousButton = document.querySelector(`.${currentSortField}`);
    if (previousButton) {
      clearSortArrow(previousButton);
    }
  }

  sortOrder = (sortField === currentSortField) ? (sortOrder === 'DESC' ? 'ASC' : 'DESC') : 'DESC';
  updateSortButtonText(buttonElement, sortOrder, sortField);

  const sortParams = {
    sortFirst: sortField,
    sortSecond: sortOrder,
  };

  currentSortField = sortField;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sortParams),
  };

  fetch('http://localhost/api/get_players', requestOptions)
    .then(response => response.json())
    .then(data => {
      table.innerHTML = '';
      data.forEach(item => {
        const row = table.insertRow(-1);
        Object.values(item).forEach(value => {
          const cell = row.insertCell();
          cell.textContent = value;
        });
      });
    });
}

function addClickListener(selector, sortField) {
  const button = document.querySelector(selector);
  button.addEventListener('click', () => handleButtonClick(sortField, button));
}

// Add click listeners for each button
addClickListener('.game', 'game');
addClickListener('.goal', 'goal');
addClickListener('.pass', 'pass');
addClickListener('.points', 'points');

// Initial data fetch and table population
window.addEventListener('load', () => {
  const sortParams = {
    sortFirst: 'points',
    sortSecond: 'DESC',
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sortParams),
  };

  fetch('http://localhost/api/get_players', requestOptions)
    .then(response => response.json())
    .then(data => {
      table.innerHTML = '';
      data.forEach(item => {
        const row = table.insertRow(-1);
        Object.values(item).forEach(value => {
          const cell = row.insertCell();
          cell.textContent = value;
        });
      });
    });
});
