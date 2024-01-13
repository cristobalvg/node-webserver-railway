import express from "express";

import path from 'path';
const __dirname = path.resolve();

const app = express();
const port = 8080;

app.use( express.static('/public')); // use = así se sirven los middleware. Voy a decirle a Express toma la carpeta pública y especificamos la ruta.

app.get('/', (req, res) => {
    res.send( __dirname + './public/index.html')
})

app.listen( port, () => {
    console.log(`Example app listening on port ${port}`);
})
