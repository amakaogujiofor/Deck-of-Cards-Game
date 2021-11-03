// Declarations
let deckId;
const cardsContainer = document.getElementById("cards");
const header = document.getElementById("header");

// Function Declaration and API Details
function getCards() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
    });
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
  console.log("card 1:", card1ValueIndex);
  console.log("card 2:", card2ValueIndex);

  if (card1ValueIndex > card2ValueIndex) {
    return "Card 1 wins!";
  } else if (card1ValueIndex < card2ValueIndex) {
    return "Card 2 wins!";
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
