window.addEventListener('DOMContentLoaded', (event) => {

    // More info 
    // https://gitbrent.github.io/PptxGenJS/docs/usage-pres-options/

    downloadBtn = document.getElementById("run");

    downloadBtn.onclick = function () {
        // Create a new Presentation and set metadata
        let pres = new PptxGenJS();
        pres.title = 'Calendar Slide in PowerPoint';
        pres.subject = '';
        pres.author = 'SlideCalendar Web App';
        pres.company = 'SlideCalendar.com';

        // Add a Slide
        let slide = pres.addSlide();

        // Add objects (Tables, Shapes, Images, Text and Media) to the Slide
        let textboxText = "Hello World from PptxGenJS!";
        let textboxOpts = { x: 1, y: 2, h: 2, color: "363636" };
        slide.addText(textboxText, textboxOpts);

        // Save the Presentation
        pres.writeFile();
    };

    // Auto download
    // downloadBtn.click();
})
