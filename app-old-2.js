import http from 'node:http';

const server = http.createServer( (req, res) => {

    // res.writeHead(200, { 'Content-Type': 'application/json' })
    // res.setHeader('Content-Disposition', 'attachment; filename=lista.csv'); //<= Esto lo que le va a añadir en los headers, es decirle al navegador web, esto va a ser un archivo que se va a descargar y este es el nombre del archivo.

    // res.writeHead(200, { 'Content-Type': 'application/csv' });//csv = un archivo delimitado por comas.
    // Para que esto quede mejor tendríamos que escribir, que queremos que sea un attachment:
    

    res.write('Hola Mundo');
    // res.write( 'id; nombre\n' );
    // res.write( '1; Fernando\n' );
    // res.write( '2; Maria\n' );
    // res.write( '3; Juan\n' );
    // res.write( '4; Pedro\n' ); // Luego recargamos la página y se descarga un archivo, pero un archivo sin tipo, sin extensión, ya que la pc no reconece que es una archivo csv, a pesar de que se lo dijimos. Pero el navegador web interpreta que es de application/csv , sabe que por lo menos lo tiene que descargar.  Entonces lo tenemos que enviar como un attachment.

    res.end(); // <= Para decirle a node que ya terminamos de escribir esta respuesta, los hacemos con res.end(); porque si no nuestro backend se queda esperando una respuesta.
    
})

// Después de haber invocado está función de createServer, poner lo siguiente:
.listen( 8080 ); //<= Y especificar el puerto en el cual queremos que este corriendo nuestra aplicación, usualmente el pueto 80 está ocupado, entonces debemos tratar de usar uno que no esté ocupado como el puerto 8080, que usado para pruebas web.
console.log('Escuchando el puerto', 8080);

// Webserver es un servidor únicamente para presentar contenido HTML, CSS y JavaScript... páginas web por decirlo así...

// Un RESTServer, es un servidor que se encarga de la comunicación mediante peticiones HTTP Request desde cualquier lado del mundo hasta tu servidor y tu servidor retorna información de tus bases de datos (usualmente)
