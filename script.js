const pokeListHtml = document.querySelector("#main");
const searchInputHtml = document.querySelector("#search-text");
const rangeInputHtml = document.querySelector("#range-input");

// pokemonData variable for api object
let pokemonData = "";

// Fetches pokemon api
fetch("https://pokeapi.co/api/v2/pokemon/?limit=1154")
  // Turns json into an object
  .then((res) => res.json())
  .then((data) => {
    // first call to display content before any searching has begun
    pokemonInfo(data);
    // stores api object in pokemonData variable
    pokemonData = data;
  });

// Runs pokemonInfo function when something is input in search bar
searchInputHtml.addEventListener("input", function () {
  pokemonInfo(pokemonData);
});

// Runs pokemonInfo function when range input is used
// adds range value to p element in html
rangeInputHtml.addEventListener("input", function () {
  const rangeNumber = document.querySelector("#range-number");
  rangeNumber.textContent = rangeInputHtml.value;

  pokemonInfo(pokemonData);
});

// Function that decides which pokemons in object
// will be put into cards in html
function pokemonInfo(data) {
  pokeListHtml.innerHTML = "";

  // variables for while loop
  let a = 0;
  let matchingEntries = 0;
  // loops until chosen range input is equal to matching pokemons
  // or when there are no more pokemons to loop through
  while (matchingEntries < rangeInputHtml.value && a < 1154) {
    const pokemonName = data.results[a].name;
    const pokemonUrl = data.results[a].url;

    // Checks if the inputted text word is included in a
    // Pokemon name in the object from the api
    if (pokemonName.includes(searchInputHtml.value)) {
      // Fetches detailed information for each pokemon, example: image
      fetch(`${pokemonUrl}`)
        .then((res) => res.json())
        .then((data) => {
          render(pokemonName, data.sprites.front_default);
        });
      matchingEntries++;
    }
    a++;
  }
}

// Adds elements with pokemon info to the element with the id of main
function render(name, image) {
  pokeListHtml.innerHTML += `
        <div class="card">
            <h1>${name}</h1>
            <img src="${image} ">
        </div>
    `;
}
