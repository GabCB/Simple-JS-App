let pokemonRepository = (function () {
  //Pokemon array
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=25';

// Function to add a new pokemon to the array (check that the new input is an object)
function add(pokemon){
    if (typeof pokemon === "object" &&"name" in pokemon) {
        pokemonList.push(pokemon);
    } else {
    console.log("pokemon is not correct");
    }
}
// Function to return all of the items in the pokemonList array
function getAll() {
  return pokemonList;
}
//Add pokemon to the list with the button format
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
// Function that gets the pokemon list from pokeAPI
function loadList() {
    return fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
        // forEach loop to get the name and detail URL from the pokeAPI
            json.results.forEach (function (item){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                }; //calls the add function to add the "items"/pokemon ti the pokemonList array
                add(pokemon);
                console.log(pokemon); 
            }); //if error log to the console
        }).catch(function (e) {
            console.error(e);
        })
}
// Function to load the details of the pokemon from the detailsUrl call
function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
        .then (function (response) {
            return response.json();
        })
        .then(function (details) {
            //Now we add the details (image, height, types) to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        })
        .catch(function (e) {
            console.error (e);
        });
}

function showDetails (pokemon) {
    loadDetails(pokemon).then(function () {
        showModal(pokemon);
        });
}

function showModal(pokemon) {
    let  modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let tittleElement = document.createElement("h1");
    tittleElement.innerText = pokemon.name;

    let contentElement = document.createElement("p");
    contentElement.innerText = `Height: ${pokemon.height}`;

    modal.appendChild(closeButtonElement);
    modal.appendChild(tittleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  

    modalContainer.addEventListener("click", (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        console.log("target: ", e.target, modalContainer)
        if (target === modalContainer) {
            hideModal();
        }
    });

}

function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
}

    /*function showDialog(tittle, text) {

        showModal(tittle, text);
        
        let modalContainer = document.querySelector('#modal-container'); // We have defined modalContainer here
        let modal = modalContainer.querySelector('.modal')// We want to add a confirm and cancel button to the modal
        
        let confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-confirm');
        confirmButton.innerText = 'Confirm';

        let cancelButton = document.createElement('button');
        cancelButton.classList.add('modal-cancel');
        cancelButton.innerText = 'Cancel';

        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton),
        
        //We want to focus the confirmButton so that the user can simply press Enter
        confirmButton.focus();
        return new Promise((resolve, reject) => {
            cancelButton.addEventListener('click', hideModal);
            confirmButton.addEventListener('click', () => {
                dialogPromiseReject = null; 
                hideModal();
                resolve();
            });

            dialogPromiseReject = reject;
        });


    }*/

window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')
    ) {
        hideModal();
    }
});

/*  document.querySelector('#show-modal').addEventListener('click', () => {
      showModal('Modal tittle', 'This is the modal content!');
  });

  document.querySelector('#show-dialog').addEventListener('click', () => {
      showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
          alert('Confirmed!');
      }, () => {
          alert ('Not confirmed!');
      });
  });

}*/

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