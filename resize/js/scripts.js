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

// Buttons click
//function buttonFromUrl() {
    //getClipboardContents();
//}
$(document).ready(function () {
    // Image from File
    $('#btnUploadFromFile').click(function(){ 
        $('#inputUploadFromFile').trigger('click'); 
        // TO BE DEVELOPED
    });
    // Image from URL
    $('#btnUploadFromUrl').click(function(){ 
        getClipboardContents();
    });
});
//inputUploadFromFile btnUploadFromFile

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

// Get Clipboard Contents and send a message
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
}