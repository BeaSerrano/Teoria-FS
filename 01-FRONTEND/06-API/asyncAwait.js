 // async ---> keyword para declarar una funcion asincrona
        /* async function () {
            // instruccion asincrona
        } */
    // await ---> keyword dentro de la funcion asincrona, detiene la funcion hasta que se cumple una promesa
        /* async function () {
            // await ....
        } */

// ejemplo con async / await poke api

const pokemonName = 'pikachu'; // aqui iria la logica de sacar los pokemons por id/name

async function getPokemonInfo(pokemonName) {
    try {
        // realiza solicitud con fetch a la api
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        // devuelve la respuesta a json dentro de data
        const data = await response.json();

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