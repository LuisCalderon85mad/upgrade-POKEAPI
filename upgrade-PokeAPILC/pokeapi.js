const pokemon_container = document.querySelector('.pokemons'); // selecciono nodo donde voy a incluir mi html con JS
const pokemons_number = 150; // creo constante con el número máximo de pokemons que voy a necesitar 
const buscador = document.querySelector(".searchinput"); // selecciono nodo que tiene la clase del input de buscador 

const colors = {
	fire: '#FF5A5F',
	grass: '#05F140',
	electric: '#2CDA9D',
	water: '#087E8B',
	ground: '#011936',
	rock: '#00FFCD',
	fairy: '#2541B2',
	poison: '#B14AED',  
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#FF1654', 
	flying: '#FF9770', 
	fighting: '#465362',
	normal: '#00B4D8'
};
const main_types = Object.keys(colors);



const getPokemon = async id => {  // constante que es una función asíncrona 
  const url =`https://pokeapi.co/api/v2/pokemon/${id}`; // constante que guarda la url del api + id 
  const response = await fetch(url); // await fetch de la url del api + id para que te devuelva 1 pokemon
  const pokemon = await response.json(); // pasado json 

  buscador.addEventListener("input", () => buscar(pokemon)) // cada vez que meta una letra se actualizará. Busca sobre "Pokemon" que contiene el json de datos
// la línea 12 es una función recursiva ojo. Cada vez que haces input (solo cuando lo hagas) se llama a la función buscar.

  createPokemonCard(pokemon); // esta función llama a un pokemon y createPokemon lo crea 
}


// buscador debe devolver valor del input y además filtrar pokemons 
const buscar = (pokemon) => {
  // console.log(buscador.value); // pinta cada letra que pongas en el buscador. Viene de buscador.addevenlistener y es de tipo input
  
  const pokemonFilter = []; // creo una constante con un array vacío al que pushear los pokemons filtrados

  for (const mipokemon of pokemon) {
    
    if (mipokemon.name.includes(buscador.value)) {  // si nombre de mi pokemon incluye el buscador.value (valor del buscador)
        pokemonFilter.push(mipokemon); // si lo incluye entonces push a pokemon filter. 
    } 

  }
  createPokemonCard(pokemonFilter);  // Me falla  :( 
}


const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) { // con esta función asíncrona creo con un bucle for los 150 pokemons
		await getPokemon(i);
	}
};  


const createPokemonCard = (pokemon) => {
  const pokemonElement = document.createElement('div');  // creo una varaible que genera un div 
  pokemonElement.classList.add('pokemonCard'); // añado una clase a ese div 
  const { name, sprites, types, base_experience, weight } = pokemon; // desestructuring de la función 
  const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const color = colors[type];
  pokemonElement.style.color = color; 
  
  const pokeInnerHTML = `
    <div class="main_data">
        <h3 class="name">${name}</h3>
    </div>
    <img class="pokeimage" src="${sprites.other.dream_world.front_default}"/>
    <div class="second_data">
        <p>${base_experience}</p>
        <p>${weight}</p>
    </div>
    <div class="family">
        <p class="family_type">${type}</p>
    </div>    
  `

// con innerHTML incluyo el html con las variables que llaman a partes del api (name, id, type, weight...) 

    pokemonElement.innerHTML = pokeInnerHTML;
    pokemon_container.appendChild(pokemonElement); // incluyo el pokemonElement (ese div con el innerHTML dentro) al final de pokemon_container que es el nodo que había seleccionado
}

fetchPokemons();  //llamo a la función con el bucle que pinta todos los pokemon 