// Base options sizes Class Constructor
class presetSizeData {
    constructor(category, name, tag, prop, width, height) {
        this.category = category;
        this.name = name;
        this.tag = tag;
        this.prop = prop;
        this.width = width;
        this.height = height;
    }
}

// Add data in a variable
var presetSizeDataList = [];

presetSizeDataList.push(new presetSizeData(
    "Instagram", 
    "instagram_story", 
    "Story", 
    "9:16", 
    1080, 1920
));
presetSizeDataList.push(new presetSizeData(
    "Instagram", 
    "instagram_square", 
    "Square", 
    "1:1", 
    1080, 1080
));
presetSizeDataList.push(new presetSizeData(
    "Instagram", 
    "instagram_portrait", 
    "Portrait",  
    "4:5", 
    1080, 1350
));
presetSizeDataList.push(new presetSizeData(
    "Instagram", 
    "instagram_landscape", 
    "Landscape",  
    "1.91:1", 
    1080, 566
));
presetSizeDataList.push(new presetSizeData(
    "Facebook", 
    "facebook_post", 
    "Post",  
    "1.91:1", 
    1200, 628
));
presetSizeDataList.push(new presetSizeData(
    "Twitter", 
    "twitter_post", 
    "Post",  
    "16:9", 
    1200, 670
));
presetSizeDataList.push(new presetSizeData(
    "LinkedIn", 
    "linkedin_sharedimage", 
    "Shared Image",  
    "1.91:1", 
    1200, 628
));
presetSizeDataList.push(new presetSizeData(
    "Custom", 
    "custom", 
    "Custom", 
    "?:?",
    800, 600
));

// Console info
//console.log(presetSizeDataList);
//export { presetSizeDataList };
console.log("Preset size data loaded");