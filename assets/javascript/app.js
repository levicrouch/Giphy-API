$(document).ready(function () {
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
    var imageClass = "#image-row";
    var arrDefaultButtons = ["kittens", "puppies", "hamsters", "sloth", "goats", "mini+pigs", "pandas", "hedgehog", "gecko", "otters", "beavers"];
    var maxNumberOfImages = 10;
    var inputID = "#add-query";
    var inputData = ".form-control";

    ///////////////////////////////////////////////////////
    // functions
    ///////////////////////////////////////////////////////

    function getImgData() {
        // capture search data from button:
        $(imageClass).empty();
        var query = $(this).attr("data-query");
        console.log("query:", query);
        // var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=5";
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=" + maxNumberOfImages;
        var xhr = $.get(queryURL);
        xhr.done(function (data) {
            console.log("success got data", data);
            // create object for giphy data
            // var giphyDataArray = data.data;
            // iterate through array and pull out the image URL
            for (i = 0; i < data.data.length; i++) {
                // grab url information of gif
                // var imgURL = giphyDataArray[i].images.downsized.url;
                var staticImgURL = data.data[i].images.fixed_height_still.url;
                var animatedImgURL = data.data[i].images.fixed_height.url;
                var gifTitle = data.data[i].title;
                var gifRating = data.data[i].rating;
                var giphyLink = data.data[i].bitly_url;                
                console.log("giphyLink:", giphyLink);

                // Add a rating for the image
                // add a thumbnail div to contain the image
                var columnDiv = $("<div>");
                columnDiv.addClass("col-sm-6 col-md-4 images");

                // Add a rating for the image
                // add a thumbnail div to contain the image
                var thumbnailDiv = $("<div>");
                thumbnailDiv.addClass("thumbnail");
                
                // place image in html document
                var img = $("<img>");
                // img.addClass("downloaded-images");
                img.attr("src", staticImgURL);
                img.addClass("downloaded-image img-responsive");
                img.attr("alt", gifTitle);
                img.attr("data-static", staticImgURL);
                img.attr("data-animate", animatedImgURL);
                img.attr("data-state", "static");
                // img.attr("class", "img-responsive");
                $(thumbnailDiv).append(img);
                

                // add a caption div to contain the image
                var captionDiv = $("<div>");
                captionDiv.addClass("caption");
                

                // add the title of the image to the caption div heading
                $(captionDiv).html("<h3>" + gifTitle + "</h3>");
                // add the rating of the image to the caption div heading
                $(captionDiv).append("<p>Rating: " + gifRating + "</p>");
                          
                $("#image-row").append(columnDiv);
                $(columnDiv).append(thumbnailDiv);
                $(thumbnailDiv).append(captionDiv);
                
                
            }

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

    // This function handles events where the add movie button is clicked
    $(inputID).on("click", function (event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var query = $(inputData).val().trim();
        console.log("query:", query);

        // The movie from the textbox is then added to our array
        arrDefaultButtons.push(query);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });
    // Function for displaying the movie info
    // Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
    $(document).on("click", ".default-buttons", imageClass, getImgData);

    // Calling the renderButtons function to display the initial buttons
    renderButtons();

    $(document).on("click", ".downloaded-image", animateGifs);

    function animateGifs() {
        console.log("in animateGifs ");
        // capture the current state of the image
        var state = $(this).attr("data-state");
        // grab the animated img url
        var animatedURL = $(this).attr("data-animate");
        // grab the static img url
        var staticURL = $(this).attr("data-static");

        // if the image is currently static, animate it
        if (state === "static") {
            // set the src property to the animated url
            $(this).attr("src", animatedURL);
            // set the state to animated
            $(this).attr("data-state", "animated");
        } else if (state === "animated") {
            // set the src property to the static url
            $(this).attr("src", staticURL);
            // set the state to static
            $(this).attr("data-state", "static");
        }
    }
});