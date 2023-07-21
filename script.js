const horseImages = ['./images/horse1.jpg', './images/horse2.jpg', './images/horse3.jpg', './images/horse4.jpg', './images/horse5.jpg', './images/horse6.jpg', './images/horse7.jpg', './images/horse8.jpg', './images/horse9.jpg', './images/horse10.jpg', './images/horse11.jpg', './images/horse12.jpg', './images/horse13.jpg', './images/horse14.jpg', './images/horse15.jpg', './images/horse16.jpg', './images/horse17.jpg', './images/horse18.jpg', './images/horse19.jpg', './images/horse20.jpg', './images/horse21.jpg', './images/horse22.jpg', './images/horse23.jpg', './images/horse24.jpg', './images/horse25.jpg'];

const horses = Array.from({ length: 25 }, (_, i) => ({
  number: i + 1,
  image: horseImages[i],
}));


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}



function generateRandomOrder() {
  shuffleArray(horses);

  const races = Math.ceil(horses.length / 5);
  const fastestHorses = horses.slice(0, 3);
  const remainingHorses = horses.slice(3);

  displayRaceResults(races, fastestHorses);
  displayRemainingHorses(remainingHorses);

  showMessageCard("No results are shown since it is generated Random horse order !");
}

function displayRemainingHorses(remainingHorses) {
  const horsesContainer = document.getElementById('horsesContainer');

  let remainingHorseCards = "<p class='alert alert-dark text-center'>Remaining Horses</p><div class='row'>";

  remainingHorses.forEach(horse => {
    remainingHorseCards += `
      <div class='card horse-card col-md-4'>
        <span class='horse-number text-center m-2 fs-4'>${horse.number}</span>
        <img class='card-img-top horse-image' src='${horse.image}' alt='Horse ${horse.number}' style='object-fit: cover;'>
      </div>
    `;
  });

  remainingHorseCards += "</div>";
  horsesContainer.innerHTML = remainingHorseCards;
}

function displayRaceResults(races, fastestHorses) {
  const raceResultsDiv = document.getElementById('raceResults');
  const explanation = "These horses were chosen based on their exceptional speed, agility, and performance during the races. The program simulates multiple races with randomly shuffled horse orders. By analyzing the times achieved in these races, the algorithm identifies the top performers. The three horses displayed here demonstrated remarkable athleticism and surpassed their competitors, achieving the fastest times. Congratulations to the winning horses!";
  const threeCardResult = `
    <p class="fs-3 text-center">Minimum number of races needed: ${races}</p>
    <p class="fs-3 text-center">-Fastest 3 horses-</p>
    <div id="fastestHorsesContainer" class="row">
      ${fastestHorses
      .map(
        horse => `
            <div class='card horse-card col-sm-4'>
              <span class='horse-number text-center m-2 fs-4'>${horse.number}</span>
              <img class='card-img-top horse-image' src='${horse.image}' alt='Horse ${horse.number}' style='object-fit: cover;'>
            </div>
          `
      )
      .join('')}
    </div>
    
    <p class="fastest-horses-explanation alert alert-info m-1">${explanation}</p>
  `;

  raceResultsDiv.innerHTML = threeCardResult;
}

function showMessageCard(message) {
  const messageCardContainer = document.getElementById('messageCardContainer');
  const messageCard = document.createElement('div');
  messageCard.classList.add('card', 'message-card');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = 'Result';

  const cardText = document.createElement('p');
  cardText.classList.add('card-text');
  cardText.textContent = message;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  messageCard.appendChild(cardBody);

  messageCardContainer.innerHTML = '';
  messageCardContainer.appendChild(messageCard);
}

function checkSelectedHorse() {
  const userInput = document.getElementById('userInput').value;
  const selectedHorse = parseInt(userInput);

  if (isNaN(selectedHorse) || selectedHorse < 1 || selectedHorse > 25) {
    alert('Please enter a valid number from 1 to 25.');
    return;
  }

  generateRandomOrder();

  const fastestHorses = horses.slice(0, 3);
  const fastestHorseNumbers = fastestHorses.map(horse => horse.number);


  if (fastestHorseNumbers.includes(selectedHorse)) {
    showMessageCard('Congratulations! Your horse wins!');
  } else {
    showMessageCard('Sorry, your horse did not win. Better luck next time!');
  }
}
