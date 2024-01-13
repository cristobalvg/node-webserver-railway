// La creación de package.json es necesario cuando ya tenemos, más de 1 o 2 archivos en nuestra App y también nos va a servir cuando necesitemos desplegar nuestras aplicaciones por ciertos comandos que se especifican ahí.

// Si tienes problemas con el __dirname te dejo acá lo que me sirvió
// En corto, este es el código que agregué al principio del código en app.js:

// import * as url from 'url';
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// La explicación del tema acá: https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/

// Recomiendo mucho leerlo. Además también dejo acá parte de la documentación oficial respecto al tema: https://nodejs.org/docs/latest-v15.x/api/esm.html#esm_no_filename_or_dirname

// Estudiante Piero
// A mi me funciono con esto:

import path from 'path';
const __dirname = path.resolve(); // El parámetro resolve() = (method) path.PlatformPath.resolve(...paths: string[]): string=>: más a la derecha se considera {to}. Otros parámetros se consideran una matriz de {from}.

// A partir del parámetro {desde} más a la izquierda, resuelve {a} en una ruta absoluta.

// Si {to} aún no es absoluto, los argumentos {from} se anteponen en orden de derecha a izquierda, hasta que se encuentre una ruta absoluta. Si después de usar todas las rutas {de} todavía no se encuentra ninguna ruta absoluta, también se usa el directorio de trabajo actual. La ruta resultante se normaliza y las barras diagonales finales se eliminan a menos que la ruta se resuelva en el directorio raíz.

// @param paths: una secuencia de rutas o segmentos de ruta.

// @throws: {TypeError} si alguno de los argumentos no es una cadena.

import express from 'express';

const app = express()
const port = 8080

// NOTA APARTE: El CORS fue un "sistema" que se creó para limitar los "sitios" desde donde se puede llamar a una API y colocar cabeceras de validación. Para tus preguntas puedes leer el siguiente link: https://developer.mozilla.org/es/docs/Web/HTTP/Access_control_CORS

// Te paso el link de express donde explican las mejores practicas de seguridad: https://expressjs.com/es/advanced/best-practice-security.html

// El tema del cors se menciona, y eventualmente si es necesario añadiré más información sobre el porque tengo planes de hacer actualizaciones fuerte en este curso.

// Si quieres configurar a detalle el CORS, puedes verlo aquí en la documentación oficial de Express

// https://expressjs.com/en/resources/middleware/cors.html

// Es importante que también explores y practiques, es la mejor forma de generar la memoria muscular y asimilar todo.

// Respecto a tus preguntas



// P: El uso de 'cors' es necesario solo para peticiones que involucran dominios diferentes:

// Habilitar el CORS te puede ayudar a colocar una capa de seguridad en tu aplicación de Node para prevenir peticiones de dominios que no quieres o bien colocar en lista blanca dominios de los cuales permitirás las peticiones hacia tu backend, también puedes bloquear todo de cualquier dominio si tu Aplicación de desplegada en Node consume los mismos servicios del mismo node.

// Necesitas habilitar el CORS especialmente si tu aplicación de Frontend y tu backend no están en el mismo dominio.

// Yo no veo nada de lo que acabo de hacer en index.html Por qué? Porque a pesar de que yo lo cree en la carpeta pública, de alguna manera yo tengo que decirle aquí a mi aplicación de express hoy haz publica esa capeta y para hacer eso tengo que ejecutar el siguiente middleware. Entonces, para servir contenido estático, hacemos lo siguiente:

// Servir contenido estático:
// propiedad extension de express.static = Establecer extensiones de archivo alternativas. Cuando se configura, si no se encuentra un archivo, las extensiones dadas se agregarán al nombre del archivo y se buscarán. El primero que exista será servido. Ejemplo: ['html', 'htm']. El valor predeterminado es falso.
// Podemos agregar la propiedad 'extensions' pasándole como valor las extensiones del recurso, en este caso 'html'. Acá les dejo la documentación: https://expressjs.com/en/4x/api.html#express.static
// (De esta forma ya no es necesario definir una ruta por cada archivo  usando el sendFile, al menos para este ejercicio.)
// Normalmente el index.html, es el archivo que buscará el navegador web por defecto, en caso de que no especifiquemos el nombre del archivo en el url.

// Si estuviéramos en IIS (microsoft), lo que buscaría sería el default.aspx, pero lo normal es el index.html
app.use( express.static('./public', { extensions: ['html'] })); // use = así se sirven los middleware. Voy a decirle a Express toma la carpeta pública y especificamos la ruta. Además si se ejecuta este middleware llamando la respuesta el =>:
// app.get('/', (req, res) => {
    // res.send('Hello World!')
// }); => nunca se va a ejecutar, para que lo tengamos presente que la parte de la carpeta pública, sus archivos tiene prioridad sobre las otra rutas que estemos o hayamo definido. En Pocas palabras , si la ruta no se encuentra en la carpeta public, va a empezar a intentar ejecutar el resto que no esté en la carpeta public, compara si existe la ruta y si no, termina cayendo en este otro lugar =>:
// app.get('*', (req, res) => {
//     res.send('404 | Page not found')
// });

// Si queremos mostrar un contenido estatico como una landing page y cualquier persona que entre a esa ruta, queremos servir(renderizar) ese contenido de la página.
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// });

// Yo no veo nada de lo que acabo de hacer en index.html Por qué? Porque a pesar de que yo lo cree en la carpeta pública, de alguna manera yo tengo que decirle aquí a mi aplicación de express hoy haz publica esa capeta y para hacer eso tengo que ejecutar el siguiente middleware:

// en la raíz de mi proyecto creamos la carpeta public, se le pone el nombre de public, porque aquí es contenido público que cualquiera que sepa el URL va a poderlo ver. Entonces eso es exactamente lo que queremos hacer en este momento dentro de la carpeta pública, vamos a crear un nuevo archivo llamado index.html

// Si queremos que funcione otra ruta aparte de las especificadas, tenemos que definirla:
app.get('/hola-mundo', (req, res) => {
    res.send('Hello World I AM DEVELOPER!');
});

// Podemos agregar la propiedad 'extensions' = app.use( express.static('./public', { extensions: ['html'] })); pasándole como valor las extensiones del recurso, en este caso 'html'. Acá les dejo la documentación: https://expressjs.com/en/4x/api.html#express.static
// (De esta forma ya no es necesario definir una ruta por cada archivo  usando el sendFile, al menos para este ejercicio.)

// Difinimos una ruta por cada archivo, para que la url de la página cargue sin tener explícitamente la extensión .html
app.get('/index', (req, res) => {
    res.sendFile( __dirname + '/public/index.html');
});

app.get('/generic', (req, res) => {
    res.sendFile( __dirname + '/public/generic.html');
});

app.get('/elements', (req, res) => {
    res.sendFile( __dirname + '/public/elements.html');
});

// Podemos definir la ruta que no especifiquemos y muestre un mensaje de error cuando vaya a una ruta que no esta especificada y no encuentra ningún manejador para la ruta:
// app.get('*', (req, res) => {
//     res.send('404 | Page not found')
// }); // => en lugar de servir este contenido directamente, que es algo que estamos creando en este momento, podríamos mandarle algo que se encuentre en la ruta pública redireccionado o hacer cualquier otra cosa. En este caso lo que voy a hacer es que voy a mandar algo que se encuentra en './public/404.html'=>:
// app.get('*', (req, res) => {
//     res.send('./public/404.html'); //<= voy a recargar y tengo en la página del navegador ./public/404.html Por qué? Porque literalmente le dije que simplemente cambiara el texto. Yo no tengo que hacer el res.send, porque el send está mandando esta información(/public/404.html). 
// }); //<= Lo que yo tengo que hacer es mandar el sendFile =>:
app.get('*', (req, res) => { //<= ¿Porque el app.use puede llegar a chocar con el app.get? A: Porque el app.use es para middlewares.
    res.sendFile( __dirname + '/public/404.html'); //<=: __dirname retorna el PATH completo donde está corriendo tu aplicación. Un middleware, es por decirlo así una función que se ejecuta antes de cualquier otro servicio, y puede detener la ejecución de otras funciones si es necesario.
    // Nos marca un error de que el Path tiene que ser absoluto y para construir eso basta con agregar el __dirname, especifico los detalle de __dirname arriba de este archivo app-express-cont-estatico.js
}); //=>: y ya ven que ya tenemos dos páginas establecidas una página 404 que me va a atajar cualquier error y ya estoy sirviendo contenido estático.
// Eso también funciona para todos los subdirectorios que ustedes pongan en la carpeta pública. Por ejemplo, aquí podríamos crearnos un directorio llamado stylesheets y dentro de CSS voy a crear un archivo llamado style.css y cambiamos su color de fondo y se renderizó el contenido y ya vemos los cambios. 

// IMPORTANTE!! =>: Entonces de esta manera pueden servir cualquier contenido estático, aquí en la carpeta public del directorio podríamos poner imágenes, podríamos poner iconos, lo que sea que pongamos acá(carpeta public) es visto y es público por cualquier usuario que conozca el URL, por lo cual tenemos que TENER MUCHO CUIDADO.

// Y otra cosa es que si ustedes no tienen el archivo index.html, por ejemplo le pusieran otro nombre index2 pero no es index html.html y recargamos en el navegador web. Entonces van a ver que no lo logra encontrar, aunque yo regrese y aprete en el enlace Ir al home que creamos,no está, no encuentra el archivo. Entonces la persona tendría que escribir index2.html en la url de la página para poder ver ese archivo. Ok, entonces mucho ojo.


// Usualmente en express va a intentar buscar automáticamente el archivo index.html para renderizarlo cuando caemos en esta petición en la carpeta pública=>: app.use( express.static('./public'));

// Nota aparte: Por que cuando se carga la pagina por defecto http://localhost:3000 se carga automáticamente lo que esta en el archivo index.html y no es necesario escribir http://localhost:3000/index.html por que no se carga por ejemplo home.html? esto está configurado por defecto así?
// A: es un estándar... normalmente todos los hostings buscan el index.html para servir ese archivo por defecto en el path especificado. Si es un apache que corre PHP, también funciona el index.php / Si es JSP, funciona index.jsp /Si es ASP, funciona el default.asp Y así, depende del código del backend, pero el index.html es el que siempre buscará por defecto primero.


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// Webserver es un servidor únicamente para presentar contenido HTML, CSS y JavaScript... páginas web por decirlo así...

// Un RESTServer, es un servidor que se encarga de la comunicación mediante peticiones HTTP Request desde cualquier lado del mundo hasta tu servidor y tu servidor retorna información de tus bases de datos (usualmente).
