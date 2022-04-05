const container = document.getElementById('pokemon-container');
const pokemon_number = 150;

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const main_types = Object.keys(colors)

const fetchPokemons = async() => {
    for (let i = 1; i<= pokemon_number; i++) {
       await getPokemon(i);
    }
}

const getPokemon = async id => {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon)
}

const createPokemonCard = (pokemon) => {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);

    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');
    
    const color = colors[type]
    pokemonEl.style.backgroundColor = color;

    innerHTML = `
       <div class="image-container">
            <img src='https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png'>
       </div>
       <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3>${name}</h3>
            <small class="type">Type: <span></span>${type}</small>
       </div>
    `;
    
    pokemonEl.innerHTML = innerHTML;
    container.appendChild(pokemonEl);
}
 

fetchPokemons();