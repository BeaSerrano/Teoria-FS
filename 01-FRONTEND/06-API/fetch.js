// fetch ---> solicitudes HTTP ---> devuelve una promesa y la manejamos con then y catch

//sintaxis de fetch

    /* fetch(url, opcionales)
    .then((response)=>{
        // respuesta del servidor
    })
    .catch((error)=>{
        // manejar errores
    }) */

// ejemplo con poke api

const pokemonName = 'pikachu'; // aqui iria la logica de sacar los pokemons por id/name

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response)=>{
        // respuesta del servidor
        return response.json();
    })
    .then((data)=>{
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
    })
    .catch((error)=>{
        // manejar errores
        console.error(error)
    })