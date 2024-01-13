// La creación de package.json es necesario cuando ya tenemos, más de 1 o 2 archivos en nuestra App y también nos va a servir cuando necesitemos desplegar nuestras aplicaciones por ciertos comandos que se especifican ahí.

// Este => http.createServer([options][, requestListener]) nos ayuda mucho a crear rápidamente un servidor http, no necesariamente para las personas que están acostumbradas o ya han trabajado con node y han usado express, no necesariamente es que express es la única manera de crearse restServer o un webServer, ya que tenemos en node este http.createServer([options][, requestListener]) y debemos conocer que existe.

import express from 'express';

const app = express()
const port = 8080

// A diferencia de create server, express tenemos que difinir las rutas, porque si no no las va a poder encontrar. Entonces express es perfecto para hacer validaciones.
app.get('/', (req, res) => {
    res.send('Hello World!')
}); //<= Usa el res.write(), cuando quieres mandar al navegador web algo en forma de un archivo de texto / Usas res.send(), para retornar un JSON a tu navegador (principio de de servicios REST).

// Si queremos que funcione otra ruta aparte de las especificadas, tenemos que definirla:
app.get('/hola-mundo', (req, res) => {
    res.send('Hello World I AM DEVELOPER!')
});

// Podemos definir la ruta que no especifiquemos y muestre un mensaje de error cuando vaya a una ruta que no esta especificada y no encuentra ningún manejador para la ruta:
app.get('*', (req, res) => {
    res.send('404 | Page not found')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

// Webserver es un servidor únicamente para presentar contenido HTML, CSS y JavaScript... páginas web por decirlo así...

// Un RESTServer, es un servidor que se encarga de la comunicación mediante peticiones HTTP Request desde cualquier lado del mundo hasta tu servidor y tu servidor retorna información de tus bases de datos (usualmente).
