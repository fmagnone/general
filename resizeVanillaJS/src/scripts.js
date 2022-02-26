//
//
//

// Elements
const imagesDiv = document.querySelector("#images");
const fileInput = document.querySelector("#upload");
const updateBtn = document.querySelector("#update");
const slider = document.getElementById("myRange");
imagesDiv.style.visibility = "hidden";

// Global Variables
var resizingFactor = 0.5;
var imageToResize;


// Listeners
fileInput.addEventListener("change", async (e) => {
  const [file] = fileInput.files;

  // displaying the uploaded image
  const imageToResize = document.querySelector("#imgToResize");
  imageToResize.src = await fileToDataUri(file);

  // resizing the image and displaying it
  const resizedImage = document.querySelector("#resizedImage");
  resizedImage.src = resizeImage(imageToResize, this);

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
};

updateBtn.onclick = function(){
  console.log("click")
};

//var output = document.getElementById("demo");
//output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
//slider.oninput = function() {
  //output.innerHTML = this.value;
//}

// Resizer function
function resizeImage(imgToResize) {
  console.log(imgToResize);
  console.log(resizingFactor);

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

  return canvas.toDataURL();
}