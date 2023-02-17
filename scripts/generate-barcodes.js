#!/usr/bin/env node

/**
 * @file
 * generate-barcodes.js
 *
 * Creates SVG barcode images of files in the videos directory.
 * The generated barcodes represent the video filename (e.g, media01.mp4).
 */

const fs = require("fs");
const path = require("path");
const JsBarcode = require("jsbarcode");
const { DOMImplementation, XMLSerializer } = require("xmldom");

const videosPath = path.join(__dirname, "../public/videos");
const barcodePath = path.join(__dirname, "../barcodes");
if (!fs.existsSync(barcodePath)) {
  fs.mkdirSync(barcodePath);
}

const xmlSerializer = new XMLSerializer();
const document = new DOMImplementation().createDocument(
  "http://www.w3.org/1999/xhtml",
  "html",
  null
);
const svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");

fs.readdir(videosPath, (err, files) => {
  if (err) {
    console.error("Unable to read directory:", err);
    return;
  }

  const ignoreFiles = [".DS_Store", "README.md", "_idle.mp4"];

  Object.values(files).forEach((file) => {
    if (!ignoreFiles.includes(file)) {
      JsBarcode(svgNode, file, {
        xmlDocument: document,
        displayValue: false,
      });
      const svgText = xmlSerializer.serializeToString(svgNode);
      const barcodeFilename = file.replace(".mp4", ".svg");

      fs.writeFile(`${barcodePath}/${barcodeFilename}`, svgText, (error) => {
        if (error) {
          console.error("Unable to write to file:", error);
          return;
        }

        console.log(`File ${barcodeFilename} has been created.`);
      });
    }
  });
});
