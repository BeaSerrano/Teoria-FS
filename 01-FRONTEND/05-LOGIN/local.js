// localStorage y sessionStorage

    // guarda datos de un formulario en forma de propiedad : valor  // registro = {email:'bemail@gmail.com'}

    // sessionStorage ---> los datos sobreviven a una recarga de la página ---> inicio sesión, recargo y sesión sigue inciada
    // localStorage ---> los datos sobreviven a un reinicio del navegador ---> inicio sesión, cierro navegador y sesión sigue inciada al volver a abrir

    //!-- sessionStorage

        // traer el formulario + unirlo al boton submit + crear una función para que no recargue la página al enviar el formulario
        document.getElementById("loginForm").addEventListener("submit", function (event) {
            event.preventDefault();

            // recogemos el input email
            let email = document.getElementById("email").value;

            // verificar que el correo es válido
            if (emailValid(email)) {
                // almacenar el email en sessionStorage
                localStorage.setItem("email", email)
                // redirigir a contenido.html
                window.location.href = "contenido.html"
            } else {
                alert('Por favor, introduce un email válido')
            };
        });

        // funcion para email valido
        function emailValid(email) {
            let emailRegex = /\S+@\S+\.\S+/;
            return emailRegex.test(email);
        }