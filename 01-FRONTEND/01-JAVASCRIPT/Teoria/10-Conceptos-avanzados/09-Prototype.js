//! Prototype

    // POO ---> Programación Orientada a Objetos ---> inglés = OOP
    // Lenguaje de programación multiparadigma: funcional, POO, ...
    // Los objetos en JS tienen prototipos para heredar propiedades y métodos de otros objetos
    // Los prototipos en Js permiten herencias

    
    //! funcion constructora con propiedades y metodos

    function Persona(nombre, edad) {
        // propiedades
        this.nombre = nombre;
        this.edad = edad;
        // metodo
        this.presentacion = function () {
            console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años`);
        }
    }

    //! prototipo de metodo con funcion constructora

    // funcion constructora de propiedades
    function Persona(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    // método en forma de prototype
        // usar la función constructora Persona
        // añadir prototype
        // añadir método propio con su función y su instrucción
    Persona.prototype.presentacion = function () {
        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años`);
    }

    // creaci´pon de dos objetos Liviu y Laura
    let Liviu = new Persona('Liviu', 20);
    let Laura = new Persona('Laura', 22);
    let Elena = new Persona('Elena', 26)

    console.log(Liviu.presentacion()); // Hola, soy Liviu y tengo 20 años
    console.log(Laura.presentacion()); // Hola, soy Laura y tengo 22 años
    // console.log(presentacion()); // referenceError - presentacion not defined

    //! herencia de prototipos ---> cadenas de prototipos

    // heredamos en la funcion
    function Estudiante(nombre, edad, bootcamp) {
        Persona.call(this, nombre, edad);
        this.bootcamp = bootcamp;
    }

    // heredamos en el objeto
        // creo un objecto con el prototipo Persona
        Estudiante.prototype = Object.create(Persona.prototype);
        // creamos el prototipo Estudiante
        Estudiante.prototype.contructor = Estudiante;

    // crear un metodo en forma de prototipo
    Estudiante.prototype.saludar = function () {
        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años y estudio ${this.bootcamp}`);
    }

    let estudiante1 = new Estudiante('Ángel', 23, 'Desarrollo web')
    console.log(estudiante1);
    console.log(estudiante1.saludar());


    //! clases en javascript
        // la keyword 'class' que hace que JS imite a lenguaje POO
        // prototype + class

        class Animales {
            // creamos las propiedades con los parámetros
            constructor(nombre, color){
                this.nombre = nombre;
                this.color = color;
            }
            // creamos método
            sonar(){
                return `Hola, soy un ${this.nombre} de color ${this.color} y hago sonidos`
            }
        }

        let animal1 = new Animales('gato', 'gris');
        console.log(animal1);

    //! herencia en clases
        // hereda el class Animals y se lo añade a una nueva class

        class Perros extends Animales {
            // heredamos propiedades de Animales y añadimos otra
            constructor(nombre, color, raza){
                super(nombre, color);
                this.raza = raza;
            }
            // nuevo metodo para Perros
            ladrar(){return `Guau!`}
        }

        let Uma = new Perros('perro', 'blanco', 'border collie')
        console.log(Uma.ladrar()); // Guau!