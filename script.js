// Declarations
let deckId;
const cardsContainer = document.getElementById("cards");
const header = document.getElementById("header");
const drawBtn = document.getElementById("draw-cards");
let compScore = 0;
let player2Score = 0;
const cScore = document.getElementById("comp-score");
const p2Score = document.getElementById("play2-score");

// Function Declaration and API Details
async function getCards() {
  const res = await fetch(
    "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
  );
  const data = await res.json();
  deckId = data.deck_id;
  document.getElementById(
    "remaining"
  ).textContent = `You have ${data.remaining} cards`;
}

document.getElementById("new-cards").addEventListener("click", getCards);

document.getElementById("draw-cards").addEventListener("click", () => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.cards);
      cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `;
      cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `;
      const winnerText = determineCardWinner(data.cards[0], data.cards[1]);
      header.textContent = winnerText;

      document.getElementById(
        "remaining"
      ).textContent = `You have ${data.remaining} cards left`;

      if (data.remaining === 0) {
        drawBtn.disabled = true;
        if (compScore > player2Score) {
          header.textContent = "Computer has won the game";
        } else if (player2Score > compScore) {
          header.textContent = " Player2 has won the game";
        } else {
          header.textContent = "It's a tie game";
        }
      }
    });
});

// Winner Logic
function determineCardWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);
  //   console.log("card 1:", card1ValueIndex);
  //   console.log("card 2:", card2ValueIndex);

  if (card1ValueIndex > card2ValueIndex) {
    cScore.textContent = `Computer has ${++compScore} points`;
    return "Computer wins!";
  } else if (card1ValueIndex < card2ValueIndex) {
    p2Score.textContent = `Player 2 has ${++player2Score} points`;
    return "Player 2 wins!";
  } else {
    return "It's a tie!";
  }
}

// const card1Obj = {
//   value: "JACK",
// };
// const card2Obj = {
//   value: "QUEEN",
// };

// determineCardWinner(card1Obj, card2Obj);
