const fs = require('fs');

const SVGPath = './svg_images/';
const JSONPath = './json_output/';

const readSVGFile = (SVGPath, SVGFile) => {
    try {
        const data = fs.readFileSync(SVGPath + SVGFile, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
    }
}

function convertSVGtoJSON(SVGFileContent) {
    const { parseSync } = require('svgson')
    return parseSync(SVGFileContent);
}

function saveJSONOutput(JSONPath, JSONImage, SVGFilename) {
    JSONImageToString = JSON.stringify(JSONImage);
    try {
        fs.writeFileSync(JSONPath + SVGFilename + '.json', JSONImageToString);
    } catch (err) {
        console.error(err);
    }
}

function main() {
    const dir = fs.readdirSync(SVGPath);
    dir.forEach(SVGFile => {
        const SVGFilename = SVGFile.replace('.svg', '');
        const SVGFileContent = readSVGFile(SVGPath, SVGFile);
        const JSONImage = convertSVGtoJSON(SVGFileContent);
        saveJSONOutput(JSONPath, JSONImage, SVGFilename);
    });
}


main();