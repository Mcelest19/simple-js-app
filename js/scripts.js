let pokemonList =[
    {name: "Bulbasaur", height: 0.7, type: ["grass","poison"]},
    {name: "Squirtle", height: 0.5, type:"water"},
    {name: "Jigglypuff", height: 0.5, type: ["fairy","normal"]}
];

/*
 For Loop

for (let i=0; i<pokemonList.length; i++ ){
    if (pokemonList[i].height > 0.5){
        document.write('<p>'+ pokemonList[i].name + ' (height:' + pokemonList[i].height + ')' + ' - is a big pokemon!</p>'); 
} else {
    document.write('<p>'+ pokemonList[i].name + ' (height:' + pokemonList[i].height + ')</p>');
}
  */
 
// forEach() Loop
function myLoopFunction(pokemon){
    document.write('<p>'+ pokemon.name + ' ' + pokemon.height + ' ' + pokemon.type + ' ' + '</p>')
}
pokemonList.forEach(myLoopFunction)
