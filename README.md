# Virtual Dog Park

A small, beginner-friendly website built with plain HTML, CSS, and vanilla
JavaScript — no frameworks, no build step, no backend, and no external
services. It combines a short encyclopedia of three dog breeds with a virtual
pet you can adopt, feed, play with, and watch grow. The project was made for a
first-year programming lab, and the code is kept simple enough to discuss
line by line.

All dog artwork in this project is drawn with SVG by the project author. The
illustrations are original, project-created images — they are **not real dog
photographs**, and no external image websites are used.

## Features

- **Dog Encyclopedia** — three breed cards (Beagle, Golden Retriever, Poodle)
  with short notes on size, personality, and everyday care.
- **Fun facts** — each card has a button that shows or hides a breed fun fact.
- **Random greeting** — a button that says hello with one of the three dogs.
- **My Virtual Dog** — adopt a dog by choosing a breed and entering a name.
  The name is validated: it may not be empty after trimming spaces from the
  ends (spaces inside the name are fine), and it may be at most 20 characters.
- **Daily care** — Feed and Play buttons raise happiness; a Next Day button
  advances the day.
- **Growth display** — a happiness bar, a growth bar, and a dog illustration
  that grows larger each day. The growth stage is also written out in words,
  so it never depends on color or size alone.
- **Saved progress** — the adopted dog is stored in the browser and restored
  after a page refresh.
- **Start Over** — deletes the saved dog, but only after a confirmation
  prompt; choosing "Cancel" keeps the dog.
- **Responsive layout** — readable on both phones and laptops.

## How to preview the page

Any modern browser can open the page, but a local server is the easiest way
to preview it while editing.

**Option A — VS Code Live Server (recommended)**

1. Open the `virtual-dog-park` folder in VS Code.
2. Install the "Live Server" extension if you do not have it yet.
3. Right-click `index.html` and choose **Open with Live Server**.
4. The page opens at an address such as `http://127.0.0.1:5500/index.html`
   and reloads automatically every time you save a file.

**Option B — open the file directly**

Double-click `index.html` to open it in your browser. Everything still works,
because the project has no server-side code.

Tip: with Live Server running you can open the same address on your phone
(same Wi-Fi) to check the mobile layout.

## Rules

### Growth

- Day 1: **Puppy**
- Days 2–3: **Young Dog**
- Day 4 and later: **Adult Dog**
- Each click on **Next Day** increases the day by 1.
- The growth bar and the dog illustration get bigger each day, until the dog
  is fully grown on Day 4.

### Happiness

- A newly adopted dog starts with happiness **50**.
- **Feed** and **Play** each add **10** happiness.
- Happiness never goes above **100**.
- **Next Day** subtracts **5** happiness — a day has passed, so the dog
  misses you a little.
- Happiness never goes below **0**.

## Where pet progress is stored

Your dog is saved in your browser's **localStorage** under the key
`virtualDogParkPetV1`, as a small JSON object holding the dog's name, breed,
day, and happiness. It is saved immediately after adoption and after every
Feed, Play, or Next Day action, and it is restored when the page is opened
again. Only one dog is stored at a time; adopting a new dog replaces the old
one.

**Important:** this storage lives inside your own browser on your own device.
It is not connected to any account — including a GitHub account — and it is
not shared between browsers, devices, or people. Publishing this project to
GitHub Pages does not move or sync your saved dog; every visitor's browser
keeps its own separate dog. Clearing your browser data, or clicking Start
Over, deletes it.

You can inspect the saved data yourself: open your browser's developer tools
(F12), go to the **Application** tab (Chrome/Edge) or **Storage** tab
(Firefox), and look under **Local Storage** for the key
`virtualDogParkPetV1`.

## Manual testing checklist

Open the page in a browser and walk through these steps:

- [ ] The page shows the "Virtual Dog Park" title, a welcome message, and the
      Dog Encyclopedia with three breed cards.
- [ ] Each breed card shows its illustration, and the three illustrations
      look different from each other.
- [ ] Clicking "Show a fun fact" reveals the fun fact; clicking again hides it.
- [ ] Clicking "Say hello to a dog" shows a greeting from one of the dogs.
- [ ] In "My Virtual Dog", clicking Adopt with an empty or spaces-only name
      shows a red message, and no dog is displayed.
- [ ] Adopting with a name like `  Rex  ` displays the name as `Rex`.
- [ ] After adopting, the status panel shows the name, breed, Day 1,
      "Puppy", and happiness 50.
- [ ] Clicking Feed or Play raises happiness by 10 each time and stops at 100.
- [ ] Clicking Next Day raises the day by 1, lowers happiness by 5 (never
      below 0), and the stage text changes at Day 2 and Day 4.
- [ ] Refreshing the page brings back the same dog, day, and happiness.
- [ ] Clicking Start Over and choosing "Cancel" keeps the dog.
- [ ] Clicking Start Over and choosing "OK" deletes the saved dog and shows
      the adoption form again.
- [ ] Narrowing the browser window (or opening the page on a phone) keeps the
      layout readable, with one card per row.

## File overview

```
virtual-dog-park/
  index.html               page structure
  style.css                page styles (responsive)
  script.js                all interactions (vanilla JavaScript)
  assets/
    beagle.svg             project-created Beagle illustration
    golden-retriever.svg   project-created Golden Retriever illustration
    poodle.svg             project-created Poodle illustration
```
