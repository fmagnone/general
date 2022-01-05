/*!
* 
* 
* 
*/
// JavaScript Coding
// General variables


// Alert messages
var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
var duration = 4000;

function alert_message(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    alertPlaceholder.append(wrapper)

    setTimeout(function () { wrapper.parentNode.removeChild(wrapper);; }, duration);
}

// Buttons actions
$(document).ready(function () {
    // Image from File button or general box
    $('#uploadBox').click(function () { getManualUploadContents(); });
    $('#btnUploadFromFile').click(function () { getManualUploadContents(); });

    // Image from URL button
    $('#btnUploadFromUrl').click(function () { getClipboardContents(); });
});


// Ctr + V pressed
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

// Get Contents and send a message
function getManualUploadContents() {
    $('#inputUploadFromFile').trigger('click');
    // TO BE DEVELOPED


    alert_message('Manual upload contents to be developed.<br/>', 'secondary');
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
        alert_message('We catch a Ctrl+V with this info.<br/>' + pasted_data, 'success');
    } catch (err) {
        alert_message('Sorry, in this case we are not allowed to catch the data, please try another method!', 'danger')
        console.error('Failed to read clipboard contents: ', err);
    }
};


/* lastTarget is set first on dragenter, then compared with during dragleave. */
var lastTarget = null;

window.addEventListener("dragenter", viewDrop);
window.addEventListener("dragleave", hideDrop);

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
    console.log('File(s) dropped');
    hideDrop(e);

    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
    
    // TO BE DEVELOPED
    if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < e.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (e.dataTransfer.items[i].kind === 'file') {
                var file = e.dataTransfer.items[i].getAsFile();
                console.log('... file reject [' + i + '].name = ' + file.name);
            }
        }
    } else {
        // Use DataTransfer interface to access the file(s)
        for (var i = 0; i < e.dataTransfer.files.length; i++) {
            console.log('... file B [' + i + '].name = ' + e.dataTransfer.files[i].name);
        }
    }
}
function dragOverHandler(e) {
    //console.log('File(s) is now in drop zone');
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
}