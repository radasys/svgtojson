const JSONFILENAME = './json_output/imagesDataArray.json'

const IMAGESDATAARRAY = fetch(JSONFILENAME).then((response) => response.json());

const CANVAS = document.getElementById("canvas");
const CTX = CANVAS.getContext("2d");

// This function searches for an image in the IMAGESDATAARRAY.
function searchImage(searchedImage, imageDataArray) {
    const RESULT = imageDataArray.find(image => image.imageName === searchedImage)
    return RESULT;
}

// This function prints an image in a CANVAS.
function printImage(imageData, CTX) {

    imageData.paths.forEach(path => {

        const NEWPATH = new Path2D(path.d);

        if (path.class) {
            const PATHCLASS = path.class;
            const CLASSCOLOR = imageData.styles.find((elem) => elem.class === PATHCLASS);
            const COLOR = CLASSCOLOR.color;

            CTX.beginPath();
            CTX.fillStyle = COLOR;
            CTX.strokeStyle = COLOR;
            CTX.fill(NEWPATH);
            CTX.stroke(NEWPATH);
        }
    })
}

IMAGESDATAARRAY.then(res => {
    const IMAGENAME = "12.svg";
    const SEARCHEDIMAGE = searchImage(IMAGENAME, res)
    if (SEARCHEDIMAGE != null) {
        printImage(SEARCHEDIMAGE, CTX);
    }
    else console.log("Image does not exists.");
})