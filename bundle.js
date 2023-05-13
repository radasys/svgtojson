const JSONFilename = './json_output/imagesDataArray.json'

const imagesDataArray = fetch(JSONFilename).then((response) => response.json());

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const selectImage = (imageFilename, imageDataArray) => {
    
}

// This function will print an image in a canvas.
function printImage(imageData, ctx) {

    pathClassesArray.forEach(path => {

        const newPath = new Path2D(path.d);

        if (path.class) {
            const pathClass = path.class;
            const classColor = colorFillClassesArray.find((elem) => elem.class === pathClass);
            const color = classColor.color;

            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.fill(newPath);
            ctx.stroke(newPath);
        }
    })
}

