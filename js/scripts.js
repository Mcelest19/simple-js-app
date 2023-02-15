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
          item.weight = details.weight;
        }).catch(function (e) {
          console.error(e);
        });
      }

    //shows details of the selected pokemon as a modal
      function showDetails(item) {
        loadDetails(item).then(function () {
          let modalBody = $(".modal-body");
          let modalTitle =$(".modal-title");
          //let modalHeader =$(".modal-header");
          //let modalContainer =$("#modal-container");

          // cleaning existing content of the model
          //modalHeader.empty();
          modalBody.empty();
          modalTitle.empty();

         //creating an elemnt for name in modal content
          let name = $("<h1>" + item.name + "</h1>");         
         //creating an element for height in modal content
          let height =$("<p>" + "height : " + item.height + "</p>");
         //creating an element for weight in modal content
          let weight =$("<p>" + "weight : " + item.weight + "</p>");
          //creting image in modal content
          let image = $('<img class="modal-img style="width:30%>');          
          image.attr("src", item.imageUrl);

         modalTitle.append(name);         
         modalBody.append(height);
         modalBody.append(weight);
         modalBody.append(image);
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
  

 