const fs = require('fs');

const SVGPath = './svg_images/';
const SVGtoJSONOutputFile = './json_output/svgtojson-output.json'
const JSONImagesDataArrayFile = './json_output/imagesDataArray.json'

const structuralElementList = ['defs', 'g', 'svg', 'symbol', 'use'];
const styleElementList = ['style'];

const imageDataArray = [];

const readFile = (file) => {
    try {
        const data = fs.readFileSync(file, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
    }
}

function convertSVGtoJSON(SVGFileContent, SVGFilename) {
    const { parseSync } = require('svgson')
    const JSONImage = parseSync(SVGFileContent);
    JSONImage.filename = SVGFilename;
    return JSONImage;
}

function saveJSONOutput(JSONImage) {
    JSONImageToString = JSON.stringify(JSONImage);

    if (fs.existsSync(SVGtoJSONOutputFile)) {
        fs.unlinkSync(SVGtoJSONOutputFile);
    }

    try {
        fs.appendFileSync(SVGtoJSONOutputFile, JSONImageToString)
    } catch (err) {
        console.error(err);
    }
}

function saveImagesDataArray(ImagesDataArray) {
    JSONImagesDataArray = JSON.stringify(ImagesDataArray);

    if (fs.existsSync(JSONImagesDataArrayFile)) {
        fs.unlinkSync(JSONImagesDataArrayFile);
    }

    try {
        fs.appendFileSync(JSONImagesDataArrayFile, JSONImagesDataArray)
    } catch (err) {
        console.error(err);
    }
}

// This function will create the styles array using regex and an auxiliar iterator.
// styles array example:
// 0: {class: 'st0', color: '#BF8334'}
// 1: {class: 'st1', color: '#BF2F2F'}
// 2: {class: 'st2', color: '#D2F4F5'}
const fillColorFillClassesArray = (child, colorFillClassesArray) => {
    const colorFillClassesString = child.children[0].value;
    const regEx = /\.([a-zA-Z0-9-]+){fill:([#a-zA-Z0-9]+);}/g;
    const colorFillClassesIterator = colorFillClassesString.matchAll(regEx);
    for (const iterator of colorFillClassesIterator) {
        colorFillClassesArray.push({ class: iterator[1], color: iterator[2] });
    }
    return colorFillClassesArray;
}

// This function will receive the path child and send the class and the d parameters.
// childAttributes example:
// { class: "st1", d: "M813.88,239..."}
// Note: Before retrieving child attributes, the function sanitizes the d parameter that may contain line breaks. 
const retrieveChildAttributes = (child) => {
    const lineBreaksRegEx = /[\n\t]/g;
    const cleanD = child.attributes.d.replace(lineBreaksRegEx, "");
    const childAttributes = { class: child.attributes.class, d: cleanD };
    return childAttributes;
};

// This recursive function will navigate through child/children until finding the path.
// Then, the function will call to retrieveChildAttributes with the path child.
const findPath = (child) => {
    if (child.name === 'path') {
        return retrieveChildAttributes(child);
    } else if (child.children && child.children.length > 0) {
        for (const nestedChild of child.children) {
            const result = findPath(nestedChild);
            if (result) {
                return result;
            }
        }
    }
};

const createImagesDataArray = () => {
    const JSONOutput = JSON.parse(readFile(SVGtoJSONOutputFile));
    JSONOutput.forEach((image) => {
        const imageName = image.filename;
        const imageChildrenArray = image.children;
        let colorFillClassesArray = [];
        let pathClassesArray = [];
        // forEach child in image
        imageChildrenArray.forEach((child) => {
            // if child.name is a style child, we fill the colorFillClassesArray
            if (styleElementList.find(elem => elem === child.name)) {
                fillColorFillClassesArray(child, colorFillClassesArray);
            }

            // if child.name is a structural child (e.g.: g or defs, we fill the pathClassesArray)
            if (structuralElementList.find(elem => elem === child.name)) {
                const pathData = findPath(child);
                pathClassesArray.push(pathData);
            }
        });
        const imageData = {
            imageName: imageName,
            styles: colorFillClassesArray,
            paths: pathClassesArray
        }
        imageDataArray.push(imageData);
    });
    return imageDataArray;
}

function main() {
    // We avoid searching in subfolders, we only search on the specified path.
    const dirents = fs.readdirSync(SVGPath, { withFileTypes: true });
    const filesNames = dirents.filter(dirent => dirent.isFile()).map(dirent => dirent.name);
    let JSONArray = [];
    filesNames.forEach(SVGFile => {
        const FilenameWithPath = SVGPath + SVGFile;
        const SVGFileContent = readFile(FilenameWithPath);
        const JSONImage = convertSVGtoJSON(SVGFileContent, SVGFile);
        JSONArray.push(JSONImage);
    })
    saveJSONOutput(JSONArray);
    const ImagesDataArray = createImagesDataArray();
    saveImagesDataArray(ImagesDataArray);
}

main();