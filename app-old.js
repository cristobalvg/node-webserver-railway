// La creación de package.json es necesario cuando ya tenemos, más de 1 o 2 archivos en nuestra App y también nos va a servir cuando necesitemos desplegar nuestras aplicaciones por ciertos comandos que se especifican ahí.

// Este => http.createServer([options][, requestListener]) nos ayuda mucho a crear rápidamente un servidor http, no necesariamente para las personas que están acostumbradas o ya han trabajado con node y han usado express, no necesariamente es que express es la única manera de crearse restServer o un webServer, ya que tenemos en node este http.createServer([options][, requestListener]) y debemos conocer que existe.

import http from 'node:http';

// Esto es un callback que se va a disparar con ciertos argumentos request(req = petición), es toda la información que estamos solicitando, la url, los headers, argumentos, todo lo que es la request, es decir la solicitud a mí webServer se encuentra aquí(req = Cualquier cosa que sea que esté intentando acceder a un recurso de nuestro servidor, en el puerto que especifiquemos, entonces viene y va a pasar por la req = request) / response(res = respuesta), es lo que mí servidor le va a responder al cliente, cuando procesemos la request.

// El callback es la función que manejaran las peticiones y el listen es para escuchar y configurar el puerto.
// un servidor web es un programa que procesa la aplicación del lado del servidor, y un hosting es un servicio de alojamiento online. Usualmente el hosting por debajo tiene su servidor web en el caso de que quieras montar una página web, pero un hosting no es lo mismo que servidor web.

// primero se recibe el request y luego el response, nunca al revés
const server = http.createServer( (req, res) => { //<= Hay muchas cosas que podemos hacer con la request, pero tenemos el inconveniente de que es mucho trabajo que tenemos que realizar y eso que solamente estamos con una ruta. Ahora imaginemos el caso que tuvieramos, más de 20 rutas o aplicar validaciones y todo eso lo da complejidad a nuestro servidor y por eso crearon el framework de express. Express es el framework más popular a la hora de crear web servers y Rest APIs, aunque hay otro, pero express es el más probado y popular.

    console.log(req);//<= Es posible que solo muestre en la consola un nivel de encadenamiento de los objetos, pero normalmente debe ofrecerte los datos del header sin problema al desestructurar.

    // Si nosotros cambiamos la forma en que se responden las cosas, los clientes o los navegadores web o quién sea que consuma nuestros servicios, va a saber que tipo de respuesta es y sabrá que hacer en base a esa respuesta con los headers:
    // res.writeHead(200, { 'Content-Type': 'text/plain' })//<= Esto significaría que estoy retornado un archivo de texto de tipo plano.

    // res.writeHead(200, { 'Content-Type': 'application/json' }); //<= Esto significaría que estoy retornado un archivo de aplicación de tipo json. En resúmen, nosotros podemos responder lo que nosotros queramos mediante los headers.

    res.setHeader('Content-Disposition', 'attachment; filename=lista.csv'); //<= Esto lo que le va a añadir en los headers, es decirle al navegador web, esto va a ser un archivo que se va a descargar y este es el nombre del archivo.

    res.writeHead(200, { 'Content-Type': 'application/csv' });//csv = un archivo delimitado por comas.
    // Para que esto quede mejor tendríamos que escribir, que queremos que sea un attachment:
    

    res.write( 'id; nombre\n' );
    res.write( '1; Fernando\n' );
    res.write( '2; Maria\n' );
    res.write( '3; Juan\n' );
    res.write( '4; Pedro\n' ); // Luego recargamos la página y se descarga un archivo, pero un archivo sin tipo, sin extensión, ya que la pc no reconece que es una archivo csv, a pesar de que se lo dijimos. Pero el navegador web interpreta que es de application/csv , sabe que por lo menos lo tiene que descargar.  Entonces lo tenemos que enviar como un attachment.

    // Si queremos podemos retornar una data en formato JSON:
    // const persona = {
    //     id: 1,
    //     nombre: 'Fernando'
    // } //<= le pasamos este objeto a la res.write para retornar el JSON:
    // res.write(persona); //<= Esto nos marca un error, porque esto objeto literal no es herealizable al .write, porque el cual pide un string. Entonces tenemos que serializarlo con stringify res.write( JSON.stringify(persona)), pero tenemos que cambiar el tipo de texto plano en el header, porque nos va seguir enviando que es un archivo de type/plain y tenemos que cambiarlo por: res.writeHead(200, { 'Content-Type': 'application/json' })

    // Nosotros podríamos cambiar el tipo de mensaje o status de 200 ok, de la siguiente manera:

    // status 200 = todo está ok
    // status 404 = not found = no encontrado
    // status 201 = que acabamos de crear un registro o acabamos de crear algo. En postamn nos dice: The request has been fulfilled and resulted in a new resource being created = La solicitud se cumplió y resultó en la creación de un nuevo recurso.

    // res.writeHead(201) // writeHead = in spanish => Envía un encabezado de respuesta a la solicitud. El código de estado es un código de estado HTTP de 3 dígitos, como 404. El último argumento, los encabezados, son los encabezados de respuesta. Opcionalmente, se puede proporcionar un mensaje de estado legible por humanos como segundo argumento.

    // Los encabezado también son utiles cuando mandemos tokens, cuando queremos mandar un token de acceso, lo podemos mandar por los headers, el token sería la key del header y el valor del token, sería el valor del header.

    // Los encabezados pueden ser una matriz donde las claves y los valores están en la misma lista. No es una lista de tuplas. Por lo tanto, las compensaciones con números pares son valores clave y las compensaciones con números impares son los valores asociados. La matriz tiene el mismo formato que request.rawHeaders.
    
    // Devuelve una referencia a ServerResponse, para que las llamadas se puedan encadenar.
    
    // res.write('404 | Page not found');//<= Estamos escribiendo esta respuesta.
    // Para decirle a node que ya terminamos de escribir esta respuesta, los hacemos con res.end(); porque si no nuestro backend se queda esperando una respuesta.
    res.end();

})
// Después de haber invocado está función de createServer, poner lo siguiente:
.listen( 8080 ); //<= Y especificar el puerto en el cual queremos que este corriendo nuestra aplicación, usualmente el pueto 80 está ocupado, entonces debemos tratar de usar uno que no esté ocupado como el puerto 8080, que es usado para pruebas web.
console.log('Escuchando el puerto', 8080);

// Webserver es un servidor únicamente para presentar contenido HTML, CSS y JavaScript... páginas web por decirlo así...

// Un RESTServer, es un servidor que se encarga de la comunicación mediante peticiones HTTP Request desde cualquier lado del mundo hasta tu servidor y tu servidor retorna información de tus bases de datos (usualmente).
