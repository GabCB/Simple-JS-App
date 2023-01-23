let pokemonRepository = (function () {
  /* list array is replaced with link to API */
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=60';
  let pokemonListElement = $('.pokemon-list');

  /* data to be fetched from API */
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  /* calls list group item and button from bootstrap */
  function addListItem(pokemon) {
    let listItem = $('<li class="list-group-item"></li>');
    let button = $(
      '<button class="pokemon-button btn btn-info" data-target="#pokemon-modal" data-toggle="modal">' +
        pokemon.name +
        '</button>'
    );

    listItem.append(button);
    pokemonListElement.append(listItem);

    /* event listener to show pokemon details when clicked */
    button.on('click', function () {
      showDetails(pokemon);
    });
  }

  /* loading data from the API using promise */
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  /* loading details from API, define which details by "item." */
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map((type) => type.type.name);
        item.abilities = details.abilities.map(
          (abilities) => abilities.ability.name
        );
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  /* function for showing defined API details within modal layout */
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showDetailsModal(pokemon);
    });
  }

  /* modal function and defining elements */
  function showDetailsModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalBody.empty();
    modalTitle.text(pokemon.name);

    let height = $('<p>' + 'Height:  ' + pokemon.height + '</p>');
    let image = $('<img class="pokemon-img" src="' + pokemon.imageUrl + '" />');
    let types = $('<p>' + 'Types:  ' + pokemon.types + '</p>');
    let abilities = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');

    modalBody.append(image);
    modalBody.append(height);
    modalBody.append(types);
    modalBody.append(abilities);
  }

  /* returned data from defined functions */
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showDetailsModal: showDetailsModal,
  };
})();

pokemonRepository.loadList().then(function () {
  /* forEach loop iterates over addListItem function*/
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
