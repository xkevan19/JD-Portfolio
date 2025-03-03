const fs = require("fs");
const path = require("path");

function generateImageData(directory) {
  const images = [];
  fs.readdirSync(directory).forEach((file) => {
    if (/\.(webp|jpg|jpeg|png|gif)$/i.test(file)) {
      const category = path.basename(directory);
      images.push({
        src: path.join(directory, file),
        category: category,
      });
    }
  });
  return images;
}

const imageDirectory = "img/";
const categories = fs
  .readdirSync(imageDirectory)
  .filter((file) => fs.statSync(path.join(imageDirectory, file)).isDirectory());
let allImages = [];
categories.forEach((category) => {
  allImages = allImages.concat(
    generateImageData(path.join(imageDirectory, category))
  );
});

const outputFilePath = path.join(imageDirectory, "gallery.json");

fs.writeFileSync(outputFilePath, JSON.stringify(allImages, null, 2));

console.log(`JSON data written to ${outputFilePath}`);
