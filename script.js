// Declarations
let deckId;

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
      document.getElementById("cards").innerHTML = `
                    <img src=${data.cards[0].image} />
                    <img src=${data.cards[1].image} />
                `;
    });
});
