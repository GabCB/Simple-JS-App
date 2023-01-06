/*define new variable and wrap in IIFE to eliminate code from global use */
let pokemonRepository = (function() {

    let pokemonList = [
      { ID: "1", name: "Bulbasaur", type: ["grass", "poison"], height: 0.7, ability: "overgrow" },
      { ID: "2", name: "Ivysaur", type: ["grass", "poison"], height: 1, ability: "overgrow" },
      { ID: "3", name: "Venusaur", type: ["grass", "poison"], height: 2, ability: "overgrow" },
      { ID: "4", name: "Charmender", type: "fire", height: 0.6, ability: "blaze" },
      { ID: "5", name: "Charmeleon", type: "fire", height: 1.1, ability: "blaze" },
      { ID: "6", name: "Charizard", type: ["fire", "flying"], height: 1.7, ability: "blaze" },
      { ID: "7", name: "Squirtle", type: "water", height: 0.5, ability: "torrent" },
      { ID: "8", name: "Wartortle", type: "water", height: 1, ability: "torrent" },
      { ID: "9", name: "Blastoise", type: "water", height: 1.6, ability: "torrent" },
    ]
  
    function add(pokemon){
      if (
      typeof pokemon === "object" &&
      "ID" in pokemon &&
      "name" in pokemon &&
      "type" in pokemon &&
      "height" in pokemon &&
      "ability" in pokemon
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
      let repository = document.querySelector(".pokemon-list");
      let listPokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      //added event listener: returns all pokemon info to console when button is clicked
      button.addEventListener("click", (Event) => showDetails(pokemon));
      listPokemon.appendChild(button);
      repository.appendChild(listPokemon);
    }

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
    };
  
  }) ();
  
pokemonRepository.add({ ID:10, name: "Pikachu", type: "fire", height: 2.3, ability: "blaze" });

/*replace for loop for forEach loop
pokemonList.forEach (function(pokemon) {
    if (pokemon.height >=5) {
        document.write(pokemon.name + " (height: " + pokemon.height + "m) - Wow, that is a big pokemon!" + "<br>")
    } else if (pokemon.height >= 1.6 && pokemon.height < 5) {
        document.write(pokemon.name + " (height: " + pokemon.height + "m) - That is a medium pokemon!" + "<br>")
    } else {
        document.write(pokemon.name + " (height: " + pokemon.height + "m) - That is a small pokemon!" + "<br>")
    }
//      console.log(pokemon);
    });*/

/* forEach loop uses pokemonRepository.getAll() instead of pokemonList to retrieve data now that array is protected by IIFE*/
pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height >=5) {
        document.write(pokemon.name + " (height: " + pokemon.height + "m) - Wow, that is a big pokemon!" + "<br>")
    } else if (pokemon.height >= 1.6 && pokemon.height < 5) {
          document.write(pokemon.name + " (height: " + pokemon.height + "m) - That is a medium pokemon!" + "<br>")
    } else {
          document.write(pokemon.name + " (height: " + pokemon.height + "m) - That is a small pokemon!" + "<br>")
    }
        
});
