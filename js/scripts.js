let pokemonRepository = (function (){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
   
        
    function add(pokemon){
        if (
            typeof pokemon ==="object" &&
            "name" in pokemon            
        ) {
            pokemonList.push(pokemon);
        }else{
            console.log("pokemon is not correct");
        }
    }

    function getAll(){
        return pokemonList;
    }  

    function addListItem(pokemon){

        let pokemonList = document.querySelector(".pokemon-list");
        let listElement = document.createElement("li");
        listElement.classList.add("group-list-item")

        //Create a button for each pokemon
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");        
        button.classList.add("btn");
        button.classList.add("btn-warning");
        button.classList.add("btn-block-sm");
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#pokemon-modal");
        listElement.appendChild(button);
        pokemonList.appendChild(listElement);

        // Create an event listener to the button
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
        
      }  
    
      // load pokemon data details on selected pokemon
    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }

    //shows details of the selected pokemon as a modal
      function showDetails(item) {
        loadDetails(item).then(function () {
            let modalContainer = document.querySelector ('#modal-container');
            
            // Clear all existing modal content
            modalContainer.innerHTML = '';

            let modal = document.createElement('div');
            modal.classList.add ('modal');

            let sprite = document.createElement('img');
            sprite.classList.add ('sprite');
            sprite.src = item.imageUrl;

            // Add the new modal content
            let closeButtonElement = document.createElement ('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'X';
            closeButtonElement.addEventListener ('click', hideModal)

            let titleElement = document.createElement ('h1');
            titleElement.innerText =  (item.name);

            let contentElement = document.createElement ('p');
            contentElement.innerText =('Height: ' + item.height);

            // append created elements to HTML
            modal.appendChild (closeButtonElement);
            modal.appendChild (titleElement);
            modal.appendChild (contentElement);
            modalContainer.appendChild (modal);
            modal.appendChild (sprite);


            modalContainer.classList.add('is-visible');

        //closing the modal
        function hideModal (){
            modalContainer.classList.remove ('is-visible');
        }
        // clossing modal with ESC
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
              hideModal();
            }
          });
        //closing the modal with the clickoutside of the modal  
        modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
        });

        //opening the modal with a click
        document.querySelector ('button.button-class').addEventListener('click', () => {
            showDetails ('Modal Title', 'Modal Content');
        });
    });
    }
    
//Return all functions of IIFE
    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        showDetails: showDetails,
    }
})();


/*Loop over pokemonList
pokemonRepository.getAll().forEach(function (pokemon) {  
    pokemonRepository.addListItem(pokemon);
});  */   

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });
  

 