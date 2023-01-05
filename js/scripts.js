/*let pokemonList = [
    {ID:"1", name: "Bulbasaur", type: ["grass", "poison"], height: 0.7, ability:"overgrow"},
    {ID:"2", name: "Ivysaur", type: ["grass", "poison"], height: 1, ability:"overgrow"},
    {ID:"3", name: "Venusaur", type: ["grass", "poison"], height: 2, ability:"overgrow"},
    {ID:"4", name: "Charmender", type: "fire", height: 0.6, ability:"blaze"},
    {ID:"5", name: "Charmeleon", type: "fire", height: 1.1, ability:"blaze"},
    {ID:"6", name: "Charizard", type: ["fire", "flying"], height: 1.7, ability:"blaze"},
    {ID:"7", name: "Squirtle", type: "water", height: 0.5, ability:"torrent"},
    {ID:"8", name: "Wartortle", type: "water", height: 1, ability:"torrent"},
    {ID:"9", name: "Blastoise", type: "water", height: 1.6, ability:"torrent"},
];*/

/* loop to print Pokemon names list:
for (let i = 0;
    i < pokemonList.length;
    i++) {
        document.write(pokemonList[i].name + "<br>" )
}*/

/*for (let i = 0; 
    i < pokemonList.length; 
    i++) {
    if (pokemonList[i].height >=5) {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + "m) - Wow, that is a big pokemon!" + "<br>")
        }
    else if (pokemonList[i].height >= 1.6 && pokemonList[i].height < 5) {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + "m) - That is a medium pokemon!" + "<br>")
        }
    else {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + "m) - That is a small pokemon!" + "<br>")
        }
}*/

let pokemonRepository = (function () {

    let pokemonList = [
        {ID:"1", name: "Bulbasaur", type: ["grass", "poison"], height: 0.7, ability:"overgrow"},
        {ID:"2", name: "Ivysaur", type: ["grass", "poison"], height: 1, ability:"overgrow"},
        {ID:"3", name: "Venusaur", type: ["grass", "poison"], height: 2, ability:"overgrow"},
        {ID:"4", name: "Charmender", type: "fire", height: 0.6, ability:"blaze"},
        {ID:"5", name: "Charmeleon", type: "fire", height: 1.1, ability:"blaze"},
        {ID:"6", name: "Charizard", type: ["fire", "flying"], height: 1.7, ability:"blaze"},
        {ID:"7", name: "Squirtle", type: "water", height: 0.5, ability:"torrent"},
        {ID:"8", name: "Wartortle", type: "water", height: 1, ability:"torrent"},
        {ID:"9", name: "Blastoise", type: "water", height: 1.6, ability:"torrent"},
    ]

    
    function add (pokemon){
        pokemonList.push(pokemon);
    }

    function getAll () {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll,
    
    };

}) ();

document.write(pokemonRepository.getAll())

pokemonRepository.getAll().forEach(function () {
    pokemonRepository.add(pokemon);
});