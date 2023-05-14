# SVG to JSON

Este programa, utilizando la librería svgson, transforma archivos SVG a JSON.

Luego, busca las etiquetas style y path en el archivo JSON para crear un array de objetos, donde cada imagen es un objeto con el siguiente formato:

```
{
    "imageName": "00.svg",
    "styles": [
      { "class": "st0", "color": "#BF8334" },
      { "class": "st1", "color": "#BF2F2F" }
    ],
    "paths": [
      {
        "d": "M0,0h15..."
      },
      {
        "class": "st0",
        "d": "M813.88,2"
      },
      {
        "class": "st1",
        "d": "M689.64"
      }
}
```

## Cómo usarlo

Cloná el código de este proyecto, o descargá el .ZIP y descomprimilo en alguna carpeta de tu computadora.

Tenés que tener instalado Node.js y yarn. Generalmente, si tenés instalado Node.js tenés instalado npm, que es un gestor de paquetes para Node. Haciendo ```npm install --global yarn``` instalarás yarn.

Luego, corrés:

```
yarn install
```

Esto instalará las dependencias del proyecto.

Finalmente, corré ```node index.js``` y en la carpeta json_output se generarán dos archivos: 
- svgtojson-output.json (que es la salida de la conversión de svgson).
- imagesDataArray.json (que es el array de imágenes con el formato de arriba).
