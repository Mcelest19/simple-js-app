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

    return {
        add: add,
        getAll: getAll
    }
})();

/*
 !!"For" Loop!!

for (let i=0; i<pokemonList.length; i++ ){
    if (pokemonList[i].height > 0.5){
        document.write('<p>'+ pokemonList[i].name + ' (height:' + pokemonList[i].height + ')' + ' - is a big pokemon!</p>'); 
} else {
    document.write('<p>'+ pokemonList[i].name + ' (height:' + pokemonList[i].height + ')</p>');
}
  */ 

// !!forEach() Loop!!

pokemonRepository.getAll().forEach(function (pokemon) {    
    if (pokemon.height> 0.5){
        document.write('<p>'+ pokemon.name + ' (height:' + pokemon.height + ')' + ' - is a big pokemon!</p>'); 
}else {
    document.write('<p>'+ pokemon.name + ' (height:' + pokemon.height + ')</p>');
}
});

      


  