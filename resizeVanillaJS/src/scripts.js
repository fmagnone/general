//
//
//

// Elements
const imagesDiv = document.querySelector("#images");
const fileInput = document.querySelector("#upload");
//const updateBtn = document.querySelector("#update");
const slider = document.getElementById("myRange");
imagesDiv.style.visibility = "hidden";

// Global Variables
var resizingFactor = 0.5;
var imageToResize;
var resizedImage;

// Listeners
fileInput.addEventListener("change", async (e) => {
  const [file] = fileInput.files;

  // displaying the uploaded image
  imageToResize = document.querySelector("#imgToResize");
  imageToResize.src = await fileToDataUri(file);

  // resizing the image and displaying it
  resizedImage = document.querySelector("#resizedImage");
  resizeImage();

  // making the div containing the image visible
  imagesDiv.style.visibility = "visible";
});

function fileToDataUri(field) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
    reader.readAsDataURL(field);
  });
}

slider.oninput = function() {
  resizingFactor = this.value/100;
  resizeImage();
};

//updateBtn.onclick = function(){
//  resizeImage();
//};


// Resizer function
function resizeImage() {
  //console.log(resizingFactor, imgToResize);

  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");

  var originalWidth = imgToResize.width;
  var originalHeight = imgToResize.height;

  var canvasWidth = originalWidth * resizingFactor;
  var canvasHeight = originalHeight * resizingFactor;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.drawImage(
    imgToResize,
    0,
    0,
    originalWidth * resizingFactor,
    originalHeight * resizingFactor
  );

  resizedImage.src = canvas.toDataURL();
}