// DOM load
document.addEventListener('DOMContentLoaded', (event) => {

	// Elements
	const imagesDiv = document.querySelector("#images");
	var imageToResize = document.querySelector("#imgToResize");
	var resizedImage = document.querySelector("#resizedImage");
	var imageText = document.querySelector("#imageText")
	var inputSlider = document.getElementById("range");
	var inputWidth = document.getElementById("width");
	var inputHeight = document.getElementById("height");
	var download = document.getElementById("download");

	// Variables
	var resizingFactor = 0.5;
	var originalWidth = 0;
	var originalHeight = 0;
	var resizingWidth = 400;
	var resizingHeight = 200;
	inputWidth.value = resizingWidth;
	inputHeight.value = resizingHeight;
	originalURL = "";
	newURL = "";

	// Listeners and global functions
	displayState = function (show) {
		if (show) {
			// Show image
			imagesDiv.style.visibility = "visible";
			imageText.innerHTML = originalURL;
			download.disabled = false;
		}
		else {
			// Go to original state
			imagesDiv.style.visibility = "hidden";
			imageToResize.style.display = "none";
			imageText.innerHTML = "No image";
			download.disabled = true;
		}
	}
	displayState(false);


	print = function (message) {
		console.log(message);
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
	updateValuePercentage = function () {
		resizingWidth = parseInt(originalWidth * resizingFactor);
		resizingHeight = parseInt(originalHeight * resizingFactor);
		print("Percentage  -  Original " + originalWidth + " x " + originalHeight + "  -  Original " + resizingWidth + " x " + resizingHeight);
		resizeImage();
	};
	updateValueFixed = function () {
		resizingWidth = inputWidth.value;
		resizingHeight = inputHeight.value;
		print("New fixed w x h: " + resizingWidth + " x " + resizingHeight);
		resizeImage();
	};
	download.onclick = function () {
		filename = "freeimageresizer_com_" + resizingWidth + "x" + resizingHeight + ".jpg";

		var element = document.createElement('a');
		element.setAttribute('href', newURL);
		element.setAttribute('download', filename);
		document.body.appendChild(element);
		element.click();

		console.log("Download.")
	}


	// Resizer function
	function resizeImage(onReady, onError) {
		// Draw canvas
		var image = document.createElement('img');
		image.onload = function () {
			// Define
			var canvas = document.createElement('canvas');
			var w = resizingWidth;
			var h = resizingHeight;
			originalWidth = image.width;
			originalHeight = image.height;
			canvas.width = w;
			canvas.height = h;
			var context = canvas.getContext('2d');

			// Draw new image
			context.drawImage(image, 0, 0, w, h);
			resizedImage.src = canvas.toDataURL('image/jpeg', 0.9);
			newURL = resizedImage.src;
			displayState(true);
		};

		// Assign image
		image.src = originalURL;
	};


	// --------------------------------------------------- //
	// FilePond Coding

	// Register the plugin
	FilePond.registerPlugin(FilePondPluginImageResize, FilePondPluginImagePreview);

	// Get a file input reference
	const input = document.querySelector('input[type="file"]');

	// const pond = FilePond.create(input);
	const pond = FilePond.create(input, {
		// CONFIG ------------
		// Only accept images
		acceptedFileTypes: ['image/*'],

		// FUNCTIONS ------------
		// Call back when image is added
		onaddfile: (err, fileItem) => {
			console.log("FP Add File Function called");

			// Assign image to variable
			const image = document.querySelector('img');
			image.src = URL.createObjectURL(fileItem.file);
			originalURL = image.src;

			// Update show status
			displayState(true);

			// Resize image
			resizeImage();
		},
		// File has been removed
		onremovefile: function (error, file) {
			console.log("FP Remove File Function called");

			// Update show status
			displayState(false)
		},
	});


	// DOM info
	console.log('DOM fully loaded and parsed');
});


