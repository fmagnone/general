// DOM load
document.addEventListener('DOMContentLoaded', (event) => {

	// Elements
	const imagesDiv = document.querySelector("#images");
	const imageResized = document.querySelector("#imageResized");
	const resizedImage = document.querySelector("#resizedImage");
	const imageText = document.querySelector("#imageText")
	const downloadContainer = document.getElementById("downloadContainer");
	const imagePrevContainer = document.getElementById("imagePrevContainer");
	const inputSlider = document.getElementById("range");
	const inputWidth = document.getElementById("width");
	const inputHeight = document.getElementById("height");

	// Variables
	var imageList = [];
	var resizingFactor = 0.5;
	var originalWidth = 0;
	var originalHeight = 0;
	var resizingWidth = 400;
	var resizingHeight = 200;
	inputWidth.value = resizingWidth;
	inputHeight.value = resizingHeight;
	originalURL = "";
	newURL = "";

	// Image Class Constructor
	class imageData {
		constructor(name, url, size_old, id_img, id_btn, id_file) {
			this.valid = true;
			this.name = name;
			this.url = url;
			this.id_img = id_img;
			this.id_btn = id_btn;
			this.id_file = id_file;
			this.size_old = size_old;
		}
	}
	saveImageData = function (name, url, size, id_file) {
		// Save image data into the list, 
		// saveImageData("Name", "Url");

		// Get current ID
		id = imageList.length;

		// Assign data
		var new_image = new imageData();
		new_image.name = name;
		new_image.url = url;
		new_image.id_file = id_file;
		new_image.id_img = "img_" + id;
		new_image.id_btn = "download_" + id;
		new_image.size_old = size;

		// Push data
		imageList.push(new_image);
		//console.log("New image added to list", id);

		return id;
	}
	removeImageData = function (id_file) {
		for (var id in imageList) {
			if (imageList[id].id_file == id_file) {
				imageList[id].valid = false;
				document.getElementById(imageList[id].id_img).remove();
				document.getElementById(imageList[id].id_btn).remove();
				//console.log("Image removed from list", id, id_file);
				return;
			}
		}
		console.error("Trying to remove a not found image.");
	}

	// Listeners and global functions
	addDownloadButton = function (id) {
		var new_button = document.createElement("button");
		new_button.id = imageList[id].id_btn;
		new_button.innerHTML = "Download image " + imageList[id].id_img + " - " + imageList[id].name;
		downloadContainer.appendChild(new_button);
	}
	addImageToDOM = function (fileItem, id) {
		// Add image to DOM
		var new_img = document.createElement("img");
		new_img.id = "img_" + id;
		new_img.src = URL.createObjectURL(fileItem.file);
		imagePrevContainer.appendChild(new_img);
	}
	displayState = function (show) {
		if (show) {
			// Show image
			imagesDiv.style.visibility = "visible";
			downloadContainer.style.visibility = "visible";
			imageText.innerHTML = originalURL;
		}
		else {
			// Go to original state
			imagesDiv.style.visibility = "hidden";
			downloadContainer.style.visibility = "hidden";
			imageText.innerHTML = "-";
		}
	}
	displayState(false);


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
		console.log("Percentage  -  Original " + originalWidth + " x " + originalHeight + "  -  Original " + resizingWidth + " x " + resizingHeight);

		// Resize last image added
		//let last = imageList.length - 1;
		//console.log(last);
		//if (last => 0) { resizeImage(imageList[last]); }
	};
	updateValueFixed = function () {
		resizingWidth = inputWidth.value;
		resizingHeight = inputHeight.value;
		console.log("New fixed w x h: " + resizingWidth + " x " + resizingHeight);
		//resizeImage();
	};
	/*
	// TODO 
	download.onclick = function () {
		filename = "freeimageresizer_com_" + resizingWidth + "x" + resizingHeight + ".jpg";
	
		var element = document.createElement('a');
		element.setAttribute('href', newURL);
		element.setAttribute('download', filename);
		document.body.appendChild(element);
		element.click();
	
		console.log("Downloaded")
	}*/


	// Call resizer function
	function resizeImage(imageData) {
		console.log("Resize call--", imageData);

		// Assign img to variable
		const imageToResize = document.getElementById(imageData.id_img);
		//image.src = URL.createObjectURL(fileItem.file); // old
		//originalURL = image.src; // old
		//imageToResize = imageData.url;
		//console.log(imageToResize, imageData.url);

		// Call the resizer
		canvas = downScaleImage(imageToResize, resizingFactor);
		imageResized.src = canvas.toDataURL('image/jpeg');
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

			// Assign image to list
			id = saveImageData(fileItem.file.name, URL.createObjectURL(fileItem.file), fileItem.fileSize, fileItem.id);

			// Add image to DOM
			addImageToDOM(fileItem, id);

			// Resize image and add to the list
			resizeImage(imageList[id]);

			// Add download button
			addDownloadButton(id);

			// Update show status
			displayState(true);
		},
		// File has been removed
		onremovefile: function (error, fileItem) {
			console.log("FP Remove File Function called");

			// Remove item from list and remove download button
			removeImageData(fileItem.id);

			// Update show status
			let off = true;
			for (let i in imageList) { if (imageList[i].valid == true) { off = false; } }
			if (off) { displayState(false) }
		},
	});


	// DOM info
	console.log('DOM fully loaded and parsed');
});


