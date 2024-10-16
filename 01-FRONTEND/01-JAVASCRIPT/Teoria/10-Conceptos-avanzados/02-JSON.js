//! JSON

// objeto que se representa con propiedad:valor separador por coma (como los object)
// los valores puedes incluir cualquir tipo de dato
// object {} // array[]

// ejemplo - pokemon api v2

    /* {
        "id": 1,
        "gene_modulo": 0,
        "possible_values": [
            0,
            5,
            10,
            15,
            20,
            25,
            30
        ],
        "highest_stat": {
            "name": "hp",
            "url": "https://pokeapi.co/api/v2/stat/1/"
        },
        "descriptions": [{
            "description": "Loves to eat",
            "language": {
                "name": "en",
                "url": "https://pokeapi.co/api/v2/language/9/"
            }
        }]
    } */

//! métodos de JSON

    //! JSON.parse()
        // convierte JSON a objeto

        let coche1 = '{"marca":"Seat","modelo":"Ibiza","electrico":false,"marchas":["automatico","manual"]}'

        console.log(coche1); // el JSON en string
        console.log(typeof coche1); // string

        let aObject = JSON.parse(coche1)

        console.log(aObject); // el JSON convertido a objeto
        console.log(typeof aObject); // object
        
        // accedemos al objeto JSON
        console.log(aObject.marchas[0]); // automatico

    //! JSON.stringify()
        // convierte objetos a JSON

        let coche2 = {
            marca : 'Seat',
            modelo : 'Ibiza',
            electrico : false,
            marchas : ['automatico', 'manual']
        }

        console.log(coche2); // saca el objeto
        console.log(typeof coche2); // object

        let aJSON = JSON.stringify(coche2)

        console.log(aJSON); // saca el objeto en JSON // '{"marca":"Seat","modelo":"Ibiza","electrico":false,"marchas":["automatico","manual"]}'
        console.log(typeof aJSON); // string