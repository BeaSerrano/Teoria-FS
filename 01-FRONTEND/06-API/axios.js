// axios ---> 
// si elejimos la instalacion npm install axios hay que importarlo
// import axios from 'axios'

// ejemplo con axios poke api

const pokemonName = 'pikachu'; // aqui iria la logica de sacar los pokemons por id/name

async function getPokemonInfo(pokemonName) {
    try {
        // realiza solicitud con libreria axios
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        // devuelve la respuesta a json dentro de data
        const data = await response.data;
        console.log(data);

        // obtener los datos --- montamos el html de lo que va dentro de la card del pokemon
        const pokemonInfo = `
            <h2>${data.name}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Altura: ${data.height}</p>
            <p>Peso: ${data.weight}</p>
            <p>Habilidades: ${data.abilities.map(elemento => elemento.ability.name).join(', ')}</p>
        `;

    // mostrar datos en el html ---> dentro de <div id="pokemon-info">
    document.getElementById('pokemon-info').innerHTML = pokemonInfo;
    } catch (error) {
        // manejar errores
        console.error(error)
    }
}
// ejecutar la funcion
getPokemonInfo(pokemonName)