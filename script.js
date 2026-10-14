/* ===== Virtual Dog Park - JavaScript ===== */
/* Two small interactive touches, written with plain vanilla JavaScript:
   1. A button that greets you with a random dog.
   2. A "fun fact" button on each breed card. */

/* --- Part 1: random dog greeting --- */

// The three dogs and what each one says when greeted.
var greetings = [
  { name: "Beagle", text: "Woof! I'm the Beagle. Follow my nose to the good snacks!" },
  { name: "Golden Retriever", text: "Hi friend! The Golden Retriever here. Want to play fetch?" },
  { name: "Poodle", text: "Bonjour! The Poodle at your service. I've learned three new tricks today." }
];

// Find the button and the message box in the page.
var greetButton = document.getElementById("greet-button");
var greetMessage = document.getElementById("greet-message");

// When the button is clicked, pick a random dog and show its greeting.
greetButton.addEventListener("click", function () {
  var randomDog = greetings[Math.floor(Math.random() * greetings.length)];
  greetMessage.textContent = randomDog.name + " says: " + randomDog.text;
});

/* --- Part 2: show / hide fun facts --- */

// Find every "Show a fun fact" button on the page.
var factButtons = document.querySelectorAll(".fact-button");

// Loop over the buttons and give each one a click listener.
for (var i = 0; i < factButtons.length; i++) {
  var button = factButtons[i];

  button.addEventListener("click", function () {
    // The fun fact is the paragraph right after this button.
    var fact = this.nextElementSibling;

    if (fact.hidden) {
      fact.hidden = false;
      this.textContent = "Hide the fun fact";
    } else {
      fact.hidden = true;
      this.textContent = "Show a fun fact";
    }
  });
}
