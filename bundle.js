const jsonFilename = './json_output/imagesDataArray.json'

const imagesDataArray = fetch(jsonFilename).then((response) => response.json());

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// This function searches for an image in the imagesDataArray.
function searchImage(searchedImage, imageDataArray) {
    const result = imageDataArray.find(image => image.imageName === searchedImage)
    return result;
}

// This function prints an image in a canvas.
function printImage(imageData, ctx) {

    imageData.paths.forEach(path => {

        const newPath = new Path2D(path.d);

        if (path.class) {
            const pathClass = path.class;
            const classColor = imageData.styles.find((elem) => elem.class === pathClass);
            const color = classColor.color;

            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.fill(newPath);
            ctx.stroke(newPath);
        }
    })
}

imagesDataArray.then(res => {
    const imageName = "08.svg";
    const searchedImage = searchImage(imageName, res)
    if (searchedImage != null) {
        printImage(searchedImage, ctx);
    }
    else console.log("Image does not exists.");
})