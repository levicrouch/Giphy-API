// pseudo code

// when a user clicks the predefined buttons, the page shows several pictures of the animal selected
// user enters a new animal into the search box, a new button is created
// display 10 images
// images are static until you click them to animate. 
// Click again to stop the animation
// display rating for each image
// use ajax to query the giphy API
// use "document" to to listen for click events
// use prevent default to prevent the submit button for behaving weird

///////////////////////////////////////////////////////
// objects and variables
///////////////////////////////////////////////////////
// giphy API key
var apiKey = "q6hBQIsve5u8m6jAO8phsbX7SMEqcXDv";
var buttonClass = ".button-landing";
var arrDefaultButtons = ["kittens", "puppies", "hamsters", "sloth", "goats", "mini+pigs", "pandas", "hedgehog", "gecko", "otters", "beavers"];
var maxNumberOfImages = 10;

///////////////////////////////////////////////////////
// functions
///////////////////////////////////////////////////////

function getImgData() {
    // capture search data from button:
    var query = $(this).attr("data-query");
    console.log("query:", query);
    // var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=5";
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=" + maxNumberOfImages;
    var xhr = $.get(queryURL);
    xhr.done(function (data) {
        console.log("success got data", data);
        // grab url information of gif
        imgURL = data.data[0].images.downsized.url;
        console.log("imgURL:", imgURL);
        // place image in html document
        var img = $("<img>");
        img.addClass("downloaded-images");
        img.attr("src", imgURL);
        $(buttonClass).append(img);
    });

}


function renderButtons() {
    // verify that we are in the button div
    console.log("Start of renderButtons");
    // Deleting the buttons prior to adding new movies
    $(buttonClass).empty();
    // page loads with a few pre-defined buttons labelled with animal names and an input box
    // render the default buttons
    // <button type="button" class="btn btn-primary">Primary</button>
    for (i = 0; i < arrDefaultButtons.length; i++) {
        var b = $("<button>");
        b.addClass("btn btn-primary default-buttons");
        // b.addClass("default-buttons");
        b.attr("data-query", arrDefaultButtons[i]);
        b.text(arrDefaultButtons[i]);
        $(buttonClass).append(b);
    }




}
// Function for displaying the movie info
// Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
$(document).on("click", ".default-buttons", getImgData);

// Calling the renderButtons function to display the initial buttons
renderButtons();