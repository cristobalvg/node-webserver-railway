import express from "express";
import hbs from 'hbs';
import path from 'path';
import 'dotenv/config';


const app = express();
const __dirname = path.resolve();
// const port = 8080;
const port = process.env.PORT;

// MUY IMPORTANTE: Entonces el puerto tiene que leerse las variables de entorno, porque en el hosting donde lo despleguemos me van a establecer el puerto de manera automática en los environment y el dotenv va a verificar por mí. Si no existe el puerto configurado, entonces va a usar el puerto que configuramos nosotros, pero si ya existe el puerto configurado, entonces va a utilizar el que me ofrezca mi hosting. Entonces nosotros no tenemos que hacer nada más. Así de sencillo, eso es todo.

// Otra cosa que tenemos que hacer para prepara nuestra app para producción(desplegar), aparte de las variables de entorno, es que necesito especificar en los scripts del package.json un comando que tiene que tener el nombre "start", Este nombre, así como esta le va a indicar a la mayoría de los hostings que están esperando aplicaciones de Node, que este es el comando que hay que ejecutar para levantar la aplicación cuando esté lista.
// Y cual es el comando que necesito ejecutar para levantarla? A: Pues simplemente es node app-92-Handlebars.js y si si estuviera en un path diferente y no en la raiz, bueno se le coloca la dirección de la carpeta como lo otros archivos. por ejemplo views/carpeta/app-92-Handlebars.js. Pero usualmente siempre se coloca en la raiz del directorio.

// Handlebars.js es una extensión de la Plantillas de bigote idioma creado por Chris Wanstrath. Handlebars.js y Mustache son lenguajes de plantillas sin lógica que mantenga la vista y el código separados como todos sabemos que deberían estar.

// Consulte el sitio oficial de documentos de Handlebars en https://handlebarsjs.com/ y la demostración en vivo en http://tryhandlebarsjs.com/.

// es básicamente una extensión de un template engine muy conocido o bueno, fue muy conocido

// hace mucho tiempo llamado Mostach y tiene ese nombre porque usa una doble llave que parece como un bigote.

// Eso es bastante usado en frameworks como Angular y librerías como React también usan algo muy parecido al mostach. Pero el Profe Fernando como nos dijo, usualmente lo trabaja con Mostach cuando tiene que hacer algo muy sencillo, pero bueno, es una preferencia personal nuevamente.

// Si ustedes bajan en la documentaciób, van a ver que aquí tienen la documentación de HBS para Express = https://github.com/pillarjs/hbs
// ahí aparece lo que es el adaptador para que Express Renderice nuestros vistas, por decirlo así, que van a hacer lo que nosotros queremos generar y mandarle al cliente. Sonará complicado, pero la verdad es bastante sencillo y vamos a poder reutilizar mucho código del html.

// después de instalar Handlebars.js ya estamos listos para utilizarlo y que exprese renderiza mis vistas. En pocas palabras, lo que yo quiero hacer es no servir estas páginas HTML que tenemos en la carpeta pública. Yo NO las quiero servir de esta manera, quiero que sean pre-renderizadas en mi backend y que esas vistas renderizadas se las mandemos como respuestas a los respectivos en endpoint. Entonces hay cosas que si yo no voy a renderizar como el CSS, los fonts.

// lo que tengo que hacer es decirle a Express Hey, yo voy a utilizar este Template Engine, por favor cuando yo te diga renderiza algo, utiliza Handlebars.js:

// Con esto express ya sabe por defecto que tiene que ir a la carpeta view a buscar los archivos html=>: Express se encarga de renderizar la vista, en este caso, se define que es un archivo hbs. Solo nos queda declarar la ubicación del archivo, y por defecto siempre buscara una carpeta con ese nombre(views)=>:
// Handlebars
// Los archivos HBS se importan con el view engine que renderiza la vista y se encarga de las rutas.
app.set('view engine', 'hbs');// 1 Argumento = es para establecerlo en express y el 2 arguemento = vas a utilizar el paquete hbs. Pero con sólo esto, yo en teoría ya puedo renderizar vistas sencillas. 

// La razón por la que puedes llamar los archivos de la carpeta assets dentro de las vistas parciales de handlebars, es porque Express necesita una carpeta estática de la cuál sacar imágenes, archivos, css y demás. Si observas tu archivo server.js podrás ver una línea que dice: =>:
// app.use(express.static(__dirname + '/public')); =>: Ésta línea lo que le indica al servidor, es que tome los archivos estáticos (bootstrap y style.css en este caso) de la carpeta, así cuando tu server llama el home, no es necesario que los archivos se encuentren en la misma carpeta que los partials .hbs, sino toma los archivos del directorio public que a su vez contiene la carpeta assets.

// TODO: Requerir lo que es Handlebars, especialmente cuando quiera utilizar parciales = import hbs from 'hbs'; =>: Es momento de utilizar parciales para reutilizar código que tengo en un template. Usualmente esto es útil cuando tienen componentes que ustedes notan que se repiten mucho. Por ejemplo, todo este header en mis demás pantallas también es el mismo. Entonces puedo crearme un parcial que se llame header y cuando yo necesito poner más headers, simplemente lo mando a llamar y se acabó el asunto. Eso incluye estos argumentos que le pasamos al template que vienen del controlador que creamos con un objeto literal en el res.render:
hbs.registerPartials(__dirname + '/views/partials', (err) => {}); // <=: Usamos el guión __, dirname para saber todo el path donde se encuentra desplegada mi aplicación. El '/views/partials' <= aquí estamos apuntando a la carpet views y dentro de la carpeta views, apuntamos a la carpeta partials
//<= El 1 argumento viene el path y noten que aquí también está usando el path completo. El 2 argumento viene un callback, por si acaso sucede un error.

// Servir contenido estático.
app.use( express.static('public'));

// Difinimos una ruta por cada archivo, para que la url de la página cargue sin tener explícitamente la extensión .html
app.get('/index', (req, res) => {
    res.sendFile( __dirname + '/public/index.html');
});

// La idea de los Handlebars es que tengamos separado lo que es la vista, el modelo y el controlador, el patrón MVC que imagino que más de uno conoce.

// lo que voy a hacer es crear una nueva carpeta llamada views. Se tiene que llamar así si estamos utilizando la configuración por defecto de Handlebars, Handlebars cuando yo le pida que rendirize una vista, la va a buscar en este directorio(views). Se puede cambiar? A: Sí, y está en la documentación.
app.get('/', (req, res) => { //<= En este caso, esta función sería el controlador mandándole algún argumento desde aquí y poder tomarlo y atraparlo para renderizado de manera condicional en el HTML:
    res.render('home', {
        nombre: 'Fernando Herrera',
        titulo: 'Curso de Node'//<= Estos argumentos, ahora son enviados a la hora de renderizar esta vista(<= 'home.hbs').
    });//<= En nuestro controlador, cómo hacemos para mandar información de aquí y atraparla en el template(archivo home.hbs), para que sea renderizado y que el cliente piense que siempre existió eso y así se renderizó la página. Cómo le mandamos un argumento? A: En el res.render puedo mandar un segundo argumento que son las opciones. Estas opciones es básicamente todo lo que ustedes quieren mandar como argumento.
    
    //<= Entonces, en lugar de hacerle el send. de Hola Mundo, lo que voy a hacer es renderizar esa vista para eso sería =>: res.render() => render para renderisar la vista y dentro el nombre de la vista. Voy a grabar los cambios, regresamos a la aplicación recargo y en teoría vamos a verla toda funcionando literalmente. pero qué beneficio tenemos? El primero es que a pesar de que estamos rederizando todo el HTML ahora nosotros tendríamos la capacidad de reutilizar ciertos bloques de código. Por ejemplo, la etiquete <head></head> se utiliza mucho, el <header></header> o el <nav></nav> o el <fotter></fotter> es algo que se usa mucho en todas las pantallas. Entonces podríamos reutilizar eso para no tener que volver a escribir una y otra vez y tenerse centralizado mí menú para cambiarlo fácilmente.
});

app.get('/generic', (req, res) => {
    // res.sendFile( __dirname + '/public/generic.html');
    res.render('generic', {
        nombre: 'Fernando Herrera',
        titulo: 'Curso de Node'//<= Estos argumentos, ahora son enviados a la hora de renderizar esta vista(<= 'generic.hbs').
    });
});

app.get('/elements', (req, res) => {
    // res.sendFile( __dirname + '/public/elements.html');
    res.render('elements', {
        nombre: 'Fernando Herrera',
        titulo: 'Curso de Node'//<= Estos argumentos, ahora son enviados a la hora de renderizar esta vista(<= 'elements.hbs').
    });//<= Y todo sigue funcionando exactamente como yo esperaba. Los mismos estilos, la misma aplicación, sólo que ya soy estoy reutilizando muchos componentes y esa es una de las ventajas de trabajar aquí con Handlebars.js o un template engine en general.

    // La ventaja es que si ustedes miran el código fuente, al hacer click en inspeccionar en la página. Van a notar al revisar el código fuente, que esto ya viene renderizado desde el servidor, el servidor recibió esta información. Aquí no van a ver comentarios de que aquí tiene el otro elemento. Ya todo eso viene así, procesado desde el lado del servidor y le mando todo lo que el cliente necesitaba ver para que construyera la página lista para él.
    
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});