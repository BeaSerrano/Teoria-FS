//! Template strings ---> `` ---> backticks

    // crear cadenas de texto
    // string interpolation ---> encapsular una variable ---> ${variable}

    // encapsular variables

    let nombre = 'Laura';
    let instrumento = 'Guitarra';
    let presentacion = `Hola, me llamo ${nombre} y toco la ${instrumento}`
    console.log(presentacion);

    // multilinea

    let frase = `
    hola
    me llamo Bea,
    os doy clase y
    a veces vosotros
    a mi
    `

    console.log(frase);