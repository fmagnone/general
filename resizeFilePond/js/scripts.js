
/*!
* Free Resize Image 
* Copyright 2022
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

// Get Contents
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

/*
window.addEventListener("dragenter", viewDrop);
window.addEventListener("dragleave", hideDrop);
var lastTarget = null;

function viewDrop(e) {
    // over the window
    lastTarget = e.target; // cache the last target here

    // unhide our dropzone overlay
    document.querySelector(".dropzone").style.visibility = "";
    document.querySelector(".dropzone").style.opacity = 1;
};
function hideDrop(e) {
    // leaving the window
    if (e.target === lastTarget || e.target === document) {
        document.querySelector(".dropzone").style.visibility = "hidden";
        document.querySelector(".dropzone").style.opacity = 0;
    }
};
function dropHandler(e) {
    // Hide drop windows
    hideDrop(e);

    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
    
    if (e.dataTransfer.items) {
        let dropped_files_count = e.dataTransfer.files.length;
        let dropped_files_names = [];

        console.log('File(s) dropped: ' + dropped_files_count);
        
        for (var i = 0; i < e.dataTransfer.files.length; i++) {
            dropped_files_names.push(e.dataTransfer.files[i].name);
            console.log('File ' + i + ' name = ' + e.dataTransfer.files[i].name);
        }
        alert_message('We catch ' + dropped_files_count + ' file(s) dopped with this info:<br/>' + dropped_files_names, 'success');

        // TO BE DEVELOPED

        // Use DataTransferItemList interface to access the file(s)
        
        //for (var i = 0; i < e.dataTransfer.items.length; i++) {
        //    // If dropped items aren't files, reject them
        //    if (e.dataTransfer.items[i].kind === 'file') {
        //        var file = e.dataTransfer.items[i].getAsFile();
        //        console.log('... file reject [' + i + '].name = ' + file.name);
        //    }
        //}
        
    } else {
        console.log("Error uploading?");
        alert_message('We find some error uploading? Please try again', 'danger');
        
        // Use DataTransfer interface to access the file(s)
        //for (var i = 0; i < e.dataTransfer.files.length; i++) {
        //    console.log('... file B [' + i + '].name = ' + e.dataTransfer.files[i].name);
        //}
        
    }
}
function dragOverHandler(e) {
    //console.log('File(s) is now in drop zone');
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
}
*/

// --------------------------------------------------- //
// FilePond Coding

// Register the plugin
FilePond.registerPlugin(FilePondPluginImageResize, FilePondPluginImagePreview);

// Get a file input reference
const input = document.querySelector('input[type="file"]');

// Create a FilePond instance
//const pond = FilePond.create(input);

// const pond = FilePond.create(input);
const pond = FilePond.create(input, {
    server: {
        url: '/',
        timeout: 7000,
        process: './process',
        revert: './revert',
        restore: './restore/',
        load: './load/',
        fetch: './fetch/',
    },
});


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