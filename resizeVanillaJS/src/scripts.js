//

// Elements
const imagesDiv = document.querySelector("#images");
const fileInput = document.querySelector("#upload");
var imageToResize = document.querySelector("#imgToResize");
var resizedImage = document.querySelector("#resizedImage");
var slider = document.getElementById("myRange");

imagesDiv.style.visibility = "hidden";
imageToResize.style.display = "none";

// Global Variables
var resizingFactor = 0.5;

// Listeners
fileInput.addEventListener("change", async (e) => {
  const [file] = fileInput.files;

  imageToResize.src = await fileToDataUri(file);

  // resizing the image and displaying it
  imagesDiv.style.visibility = "visible";
  resizeImage();
});

function fileToDataUri(field) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result);
      resizeImage();
    });
    reader.readAsDataURL(field);
  });
}

slider.oninput = function () {
  resizingFactor = this.value / 100;
  resizeImage();
};

// Resizer function
function resizeImage() {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");

  var originalWidth = imgToResize.width;
  var originalHeight = imgToResize.height;

  var canvasWidth = originalWidth * resizingFactor;
  var canvasHeight = originalHeight * resizingFactor;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.drawImage(
    imgToResize, 0, 0,
    originalWidth * resizingFactor,
    originalHeight * resizingFactor
  );

  resizedImage.src = canvas.toDataURL();

  console.log(canvas.toDataURL())
  console.log(resizedImage)
}
