/* ===== Virtual Dog Park - JavaScript ===== */
/* Three small interactive touches, written with plain vanilla JavaScript:
   1. A button that greets you with a random dog.
   2. A "fun fact" button on each breed card.
   3. A "My Virtual Dog" section: adopt, feed, play, and grow a dog (saved in localStorage). */

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

/* --- Part 3: My Virtual Dog --- */

// The dog the visitor has adopted. null means "no dog yet".
var myDog = null;

// Where the dog is saved in the browser. One key = one dog at a time.
var STORAGE_KEY = "virtualDogParkPetV1";

// Where to find the picture for each breed.
var breedImages = {
  "Beagle": "assets/beagle.svg",
  "Golden Retriever": "assets/golden-retriever.svg",
  "Poodle": "assets/poodle.svg"
};

// Form controls and message areas.
var adoptForm = document.getElementById("adopt-form");
var breedChoice = document.getElementById("breed-choice");
var nameInput = document.getElementById("dog-name");
var nameError = document.getElementById("name-error");
var dogStatus = document.getElementById("dog-status");
var dogImage = document.getElementById("dog-image");
var statusName = document.getElementById("status-name");
var statusBreed = document.getElementById("status-breed");
var statusDay = document.getElementById("status-day");
var statusStage = document.getElementById("status-stage");
var statusHappiness = document.getElementById("status-happiness");
var happinessFill = document.getElementById("happiness-fill");
var growthFill = document.getElementById("growth-fill");
var careMessage = document.getElementById("care-message");

// Decide the growth stage from the day number.
function getGrowthStage(day) {
  if (day === 1) {
    return "Puppy";
  }
  if (day <= 3) {
    return "Young Dog";
  }
  return "Adult Dog";
}

// Check the typed name: not empty after trimming, 20 characters at most.
// Returns the clean name, or null when the name is not usable.
function getValidName() {
  var cleanName = nameInput.value.trim();

  if (cleanName === "") {
    nameError.textContent = "Please give your dog a name (up to 20 characters).";
    return null;
  }
  if (cleanName.length > 20) {
    nameError.textContent = "That name is too long - please use 20 characters or fewer.";
    return null;
  }

  nameError.textContent = "";
  return cleanName;
}

// Create the dog when the Adopt button is pressed.
function adoptDog(event) {
  event.preventDefault();   // stop the form from reloading the page

  var cleanName = getValidName();
  if (cleanName === null) {
    nameError.hidden = false;   // show the helpful message
    return;
  }

  nameError.hidden = true;      // hide any old message
  careMessage.textContent = "";

  // A brand-new dog: Day 1, Puppy stage, happiness 50.
  myDog = {
    name: cleanName,
    breed: breedChoice.value,
    day: 1,
    happiness: 50
  };

  dogStatus.hidden = false;
  renderDog();
  saveDog();   // remember the new dog right away
}

// Feed or Play: +10 happiness, never above 100.
// (Days only move forward with the Next Day button.)
function careForDog(action) {
  if (myDog === null) {
    return;   // no dog yet, nothing to care for
  }

  myDog.happiness = Math.min(100, myDog.happiness + 10);   // cap at 100

  if (action === "Feed") {
    careMessage.textContent = "Yum! " + myDog.name + " enjoyed the meal.";
  } else {
    careMessage.textContent = "Wheee! " + myDog.name + " had fun playing.";
  }

  saveDog();
  renderDog();
}

// Save the dog to the browser's localStorage, so it survives a refresh.
function saveDog() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(myDog));
}

// Load the saved dog when the page opens. If nothing is saved, do nothing.
function loadDog() {
  var savedText = localStorage.getItem(STORAGE_KEY);

  if (savedText === null) {
    return;   // no saved dog - stay on the adoption form
  }

  try {
    myDog = JSON.parse(savedText);
    dogStatus.hidden = false;
    renderDog();
  } catch (error) {
    // The saved data was broken - remove it and start fresh.
    localStorage.removeItem(STORAGE_KEY);
  }
}

// Next Day: one more day of life, but the dog gets a little less happy.
function nextDay() {
  if (myDog === null) {
    return;   // no dog yet
  }

  myDog.day = myDog.day + 1;
  myDog.happiness = Math.max(0, myDog.happiness - 5);   // never below 0

  careMessage.textContent = "A new day begins for " + myDog.name + "!";

  saveDog();
  renderDog();
}

// Start Over: ask first, then delete the saved dog and show the form again.
function startOver() {
  var sure = confirm("Start over? This will delete your saved dog.");

  if (!sure) {
    return;   // visitor cancelled - keep the dog exactly as it is
  }

  localStorage.removeItem(STORAGE_KEY);
  myDog = null;
  dogStatus.hidden = true;
  nameInput.value = "";
  nameError.hidden = true;
  careMessage.textContent = "";
}

// Show the dog's details on the page.
function renderDog() {
  // textContent writes plain text, never HTML, so any name stays safe.
  statusName.textContent = myDog.name;
  statusBreed.textContent = myDog.breed;
  statusDay.textContent = myDog.day;
  statusStage.textContent = getGrowthStage(myDog.day);
  statusHappiness.textContent = myDog.happiness;

  dogImage.src = breedImages[myDog.breed];
  dogImage.alt = "Illustration of a " + myDog.breed;

  // The dog grows a little every day until it is fully grown on Day 4.
  var growthPercent = Math.min(myDog.day, 4) * 25;   // Day 1 = 25%, Day 4+ = 100%
  dogImage.style.width = growthPercent + "%";
  growthFill.style.width = growthPercent + "%";

  happinessFill.style.width = myDog.happiness + "%";
}

// Wire up the buttons.
adoptForm.addEventListener("submit", adoptDog);
document.getElementById("feed-button").addEventListener("click", function () {
  careForDog("Feed");
});
document.getElementById("play-button").addEventListener("click", function () {
  careForDog("Play");
});
document.getElementById("next-day-button").addEventListener("click", nextDay);
document.getElementById("start-over-button").addEventListener("click", startOver);

// Hide the error message as soon as the visitor types a new name.
nameInput.addEventListener("input", function () {
  nameError.hidden = true;
});

// Bring back the saved dog, if there is one.
loadDog();
