
document.addEventListener('DOMContentLoaded', (event) => {

  // Elements and Variables
  const imagesDiv = document.querySelector("#images");
  const fileInput = document.querySelector("#upload");
  var imageToResize = document.querySelector("#imgToResize");
  var resizedImage = document.querySelector("#resizedImage");
  var deleteBtn = document.querySelector("#deleteBtn")
  var slider = document.getElementById("myRange");

  var resizingFactor = 0.5;


  // Listeners and global functions
  originalState = function () {
    imagesDiv.style.visibility = "hidden";
    imageToResize.style.display = "none";
    deleteBtn.disabled = true;
    fileInput.value = "";
  };


  fileInput.addEventListener("change", async (e) => {
    const [file] = fileInput.files;

    // Call await fileToDataUri()
    imageToResize.src = await fileToDataUri(file);
    console.log("Images is resized");

    // Resizing the image
    resizeImage();

    // Displaying it
    imagesDiv.style.visibility = "visible";
    deleteBtn.disabled = false;
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


  deleteBtn.onclick = function () {
    originalState();
  };
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
  }


  originalState();

  
  console.log('DOM fully loaded and parsed');
});