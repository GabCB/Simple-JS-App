let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=25';

function add(pokemon){
  if (
      typeof pokemon === "object" &&
      "name" in pokemon
  ) {
  pokemonList.push(pokemon);
  } else {
  console.log("pokemon is not correct");
  }
}

function getAll() {
  return pokemonList;
}

function addListItem (pokemon) {
  let pokemonList = document.querySelector(".pokemon-list");
  let listPokemon = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listPokemon.appendChild(button);
  pokemonList.appendChild(listPokemon);
  //added event listener: returns all pokemon info to console when button is clicked
  button.addEventListener("click", function(event) {
  showDetails(pokemon);
  }); // showDetails function =>showDetails(pokemon)); instead of console.log
}

function loadList() {
  return fetch(apiUrl).then(function (response) {
  return response.json();
  }).then(function (json) {
      json.results.forEach (function (item){
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
      });
  }).catch(function (e) {
      console.error(e);
  })
}

function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then (function (response) {
      return response.json();
  }).then(function (details) {
  //Now we add the details to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
      console.error (e);
  });
}

function showDetails(item) {
  pokemonRepository.loadDetails(item).then (function () {
      console.log(item);
  });
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails
};

}) ();

/*pokemonRepository.add({ ID:10, name: "Pikachu", type: "fire", height: 2.3, ability: "blaze" });*/

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});
