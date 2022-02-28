// DOM load
document.addEventListener('DOMContentLoaded', (event) => {

  // Elements and Variables
  const imagesDiv = document.querySelector("#images");
  const fileInput = document.querySelector("#upload");
  var imageToResize = document.querySelector("#imgToResize");
  var resizedImage = document.querySelector("#resizedImage");
  var deleteBtn = document.querySelector("#deleteBtn")
  var inputSlider = document.getElementById("range");
  var inputWidth = document.getElementById("width");
  var inputHeight = document.getElementById("height");
print = function (message) {
    console.log(message);
  };
  var resizingFactor = 0.5;
  var originalWidth = 0;
  var originalHeight = 0;
  var resizingWidth = 400;
  var resizingHeight = 200;
  inputWidth.value = resizingWidth;
  inputHeight.value = resizingHeight;

  // Listeners and global functions
  displayState = function () {
    imagesDiv.style.visibility = "visible";
    deleteBtn.disabled = false;
  }
  originalState = function () {
    imagesDiv.style.visibility = "hidden";
    imageToResize.style.display = "none";
    deleteBtn.disabled = true;
    fileInput.value = "";
  };
  originalState();


  print = function (message) {
    console.log(message);
  };
  deleteBtn.onclick = function () {
    originalState();
  };
  inputSlider.oninput = function () {
    resizingFactor = this.value / 100;
    updateValuePercentage();
  };
  inputWidth.onchange = function () {
    resizingWidth = this.value;
    updateValueFixed();
  };
  inputHeight.onchange = function () {
    resizingHeight = this.value;
    updateValueFixed();
  };
  updateValuePercentage = function() {
    resizingWidth = parseInt(originalWidth * resizingFactor);
    resizingHeight = parseInt(originalHeight * resizingFactor);
    print("Percentage  -  Original " + originalWidth + " x " + originalHeight + "  -  Original " + resizingWidth + " x " + resizingHeight);
    resizeImage(onReady, onError);
  };
  updateValueFixed = function() {
    resizingWidth = inputWidth.value;
    resizingHeight = inputHeight.value;
    print("New fixed w x h: " + resizingWidth + " x " + resizingHeight);
    resizeImage(onReady, onError);
  };
  

  fileInput.addEventListener("change", async (e) => {
    const [file] = fileInput.files;

    // Call await fileToDataUri()
    imageToResize.src = await fileToDataUri(file);
    //console.log("Images is resized");

    // Resizing the image
    //resizeImage();

    diplayState();
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


  


  // Resizer function
  /*function resizeImage() {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    var originalWidth = imgToResize.width;
    var originalHeight = imgToResize.height;

    var canvasWidth = originalWidth * resizingFactor;
    var canvasHeight = originalHeight * resizingFactor;
    //console.log(originalWidth, resizingFactor);

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    context.drawImage(
      imgToResize, 0, 0,
      originalWidth * resizingFactor,
      originalHeight * resizingFactor
    );

    resizedImage.src = canvas.toDataURL();

    //console.log(canvas.toDataURL())
    //console.log(resizedImage)
  }*/





  imageUrl = "france.jpg"

  function resizeImage(onReady, onError) {
    var image = document.createElement('img');
    image.onload = function () {
      var canvas = document.createElement('canvas');
      var w = resizingWidth;
      var h = resizingHeight;
      originalWidth = image.width;
      originalHeight = image.height;
      canvas.width = w;
      canvas.height = h;

      // Draw new image
      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, w, h);
      resizedImage.src = canvas.toDataURL('image/jpeg', 0.9);
      displayState();
    };

    image.src = imageUrl;
  };


  // Usage example:
  function onReady(dataUrl) {
    var dstImage = document.querySelector('#dst-image');
    dstImage.src = dataUrl;
  };
  function onError(message) {
    console.error(message);
  };
  

  

  //resizeImage(onReady, onError);


  console.log('DOM fully loaded and parsed');
});