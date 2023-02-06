let pokemonRepository = (function (){
    let pokemonList =[
        {name: "Bulbasaur", height: 0.7, type: ["grass","poison"]},
        {name: "Squirtle", height: 0.5, type:"water"},
        {name: "Jigglypuff", height: 0.5, type: ["fairy","normal"]}
    ]
        
    function add(pokemon){
        pokemonList.push(pokemon);
    }

    function getAll(){
        return pokemonList;
    }  

    function addListItem(pokemon){

        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");

        //Create a button for each pokemon
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);

        // Create an event listener to the button
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
        
      }  

      function showDetails(pokemon){
        console.log('name: '+ pokemon.name+ ' '+ 'height: '+ pokemon.height+ ' '+ 'type: '+ pokemon.type)
      }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    }
})();


//Loop over pokemonList
pokemonRepository.getAll().forEach(function (pokemon) {  
    pokemonRepository.addListItem(pokemon);
});     


  