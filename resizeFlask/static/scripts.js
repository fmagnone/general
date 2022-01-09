/*!
* Free Resize Image - Copyright 2022
*
*
*/

// General variables

// Buttons Action Detection
$(document).ready(function () {
    // Image from File button or general box
    $('#uploadBox').click(function () { getManualUploadContents(); });
    $('#btnUploadFromFile').click(function () { getManualUploadContents(); });

    // Image from URL button
    $('#btnUploadFromUrl').click(function () { getClipboardContents(); });
});

// Ctrl + V Detection
$(document).ready(function () {
    var ctrlDown = false,
        ctrlKey = 17,
        cmdKey = 91,
        vKey = 86

    $(document).keydown(function (e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
    }).keyup(function (e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
    });

    $(".no-copy-paste").keydown(function (e) {
        if (ctrlDown && (e.keyCode == vKey)) return false;
    });

    $(document).keydown(function (e) {
        if (ctrlDown && (e.keyCode == vKey)) {
            getClipboardContents();
        }
    });
});

// Alert Message
var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
var duration = 5000;
function alert_message(message, type) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = ('<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
    
    if(alertPlaceholder) { 
        alertPlaceholder.append(wrapper);
        setTimeout(function () { wrapper.parentNode.removeChild(wrapper);; }, duration);
    };
}

// Get Contents Manual Upload
function getManualUploadContents() {
    $('#inputUploadFromFile').trigger('click');

    // Select File
    const inputElement = document.getElementById("inputUploadFromFile");
    inputElement.addEventListener("change", handleFiles, false);
    function handleFiles() {
        const fileList = this.files;

        // Get file information
        const uploaded_files_count = fileList.length;
        let uploaded_files_names = [];
        console.log("Files uploaded: ", uploaded_files_count)
        for (let i = 0, uploaded_files_count = fileList.length; i < uploaded_files_count; i++) {
            const file = fileList[i];
            uploaded_files_names.push(file.name);
            console.log('File ' + i + ' name = ' + file.name);
        }
        alert_message('We catch ' + uploaded_files_count + ' file(s) dopped with this info:<br/>' + uploaded_files_names, 'success');
    }
};
// Get Contents Clipboard Upload
async function getClipboardContents() {
    let pasted_data = "(no data)";

    try {
        // Read image data
        const img = await navigator.clipboard.read();

        // Read text data
        const text = await navigator.clipboard.readText();
        pasted_data = text;

        console.log('Pasted content: ', img);
        console.log('Pasted content: ', text);

        if (text != "") {
            alert_message('We catch some text from Ctrl+V with this info:<br/>' + pasted_data, 'success');
        }
        else {
            alert_message('We catch something with Ctrl+V but is not an URL... Please copy your URL and try again!', 'danger');
        }

    } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
        alert_message('Sorry, in this case we are not allowed to catch the data, please try another method!', 'danger')
    }
};


// Get Content Drag and Drop - FilePond Plugin
FilePond.registerPlugin(
    FilePondPluginImageResize, 
    FilePondPluginImagePreview
);

const input = document.querySelector('input[id="filePondUpload"]');

// Create a FilePond instance and post files to /upload
FilePond.create(input, {
    server: {
        url: 'http://127.0.0.1:5000/',
        timeout: 7000,

        process: {
            url: './',
            method: 'POST',
            withCredentials: true,
            headers: {},
            timeout: 7000,
            onload: null,
            onerror: null,
            ondata: null,
        },
        revert: {
            url: '',
            method: 'POST',
            //withCredentials: true,
            headers: {},
        },
    },

    // Call back when image is added
    imageResizeTargetWidth:256,
    onaddfile:(err, fileItem) =>{
        console.log(err,fileItem.getMetadata('resize'));
    },
    onpreparefile:(fileItem, output) =>{
        const img = new Image();
        img.src = URL.createObjectURL(output);
        console.log(img.src);
        document.body.appendChild(img);
    },

});




//console.log(pond);



//import * as FilePond from 'filepond';

// FilePond.registerPlugin(FilePondPluginImageResize, FilePondPluginImagePreview);
/*
const input = document.querySelector('input[type="file"]');

const pond = FilePond.create(input, {
    server: {
        url: 'http://127.0.0.1:5000',
        timeout: 7000,
    },
    process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
        // fieldName is the name of the input field
        // file is the actual file object to send
        const formData = new FormData();
        formData.append(fieldName, file, file.name);

        const request = new XMLHttpRequest();
        request.open('POST', 'url-to-api');

        // Should call the progress method to update the progress to 100% before calling load
        // Setting computable to false switches the loading indicator to infinite mode
        request.upload.onprogress = (e) => {
            console.log(e);
            progress(e.lengthComputable, e.loaded, e.total);
        };

        // Should call the load method when done and pass the returned server file id
        // this server file id is then used later on when reverting or restoring a file
        // so your server knows which file to return without exposing that info to the client
        request.onload = function () {
            if (request.status >= 200 && request.status < 300) {
                // the load method accepts either a string (id) or an object
                load(request.responseText);
            } else {
                // Can call the error method if something is wrong, should exit after
                error('oh no');
            }
        };

        request.send(formData);

        // Should expose an abort method so the request can be cancelled
        return {
            abort: () => {
                // This function is entered if the user has tapped the cancel button
                request.abort();

                // Let FilePond know the request has been cancelled
                abort();
            },
        };
    },
});
*/




/* url: 'http://127.0.0.1:5500/resizeFilePond/tmp/file.jpg',*/
// const pond = FilePond.create(input);

// Create a FilePond instance
//const pond = FilePond.create(input);
//console.log(input);


/*
FilePond.setOptions({
    server:{
        url: 'http://127.0.0.1:5500',
        timeout: 7000,
        process: {
            url: './process',
            method: 'POST',
            withCredentials: false,
            headers: {},
            timeout: 7000,
            onload: null,
            onerror: null,
            ondata: null,
        },
    },
});
*/




////////
// Get Content 
// Upload method without framework
/*
const handleImageUpload = event => {
    const files = event.target.files
    const formData = new FormData()
    formData.append('myFile', files[0])
  
    fetch('/saveImage', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.path)
    })
    .catch(error => {
      console.error(error)
    })
  }
  
  document.querySelector('#fileUpload').addEventListener('change', event => {
    handleImageUpload(event)
  })
  */



// Uppy
