$(document).ready(function () {
    ///////////////////////////////////////////////////////
    // objects and variables
    ///////////////////////////////////////////////////////
    // giphy API key
    var apiKey = "q6hBQIsve5u8m6jAO8phsbX7SMEqcXDv";
    var buttonClass = ".button-landing";
    var imageRowID = "#image-row";
    var arrDefaultButtons = ["kittens", "puppies", "hamsters", "sloth", "goats", "mini+pigs", "pandas", "hedgehog", "gecko", "otters", "beavers"];
    var maxNumberOfImages = 10;
    var inputID = "#add-query";
    var inputData = ".form-control";

    ///////////////////////////////////////////////////////
    // functions
    ///////////////////////////////////////////////////////

    function getImgData() {
        // capture search data from button:
        $(imageRowID).empty();
        var query = $(this).attr("data-query");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=" + maxNumberOfImages;
        var xhr = $.get(queryURL);
        xhr.done(function (data) {
            // iterate through array and pull out the image URL
            for (i = 0; i < data.data.length; i++) {
                // grab url information of static gif
                var staticImgURL = data.data[i].images.fixed_height_still.url;
                // grab animated gif url
                var animatedImgURL = data.data[i].images.fixed_height.url;
                // grab the title, rating, and giphy url of the gif
                var gifTitle = data.data[i].title;
                var gifRating = data.data[i].rating;
                var giphyLink = data.data[i].bitly_url;

                // add a column div to contain the thumbnail div
                var columnDiv = $("<div>");
                columnDiv.addClass("col-sm-6 col-md-4 images");
                // add a thumbnail div to contain the image, caption and rating
                var thumbnailDiv = $("<div>");
                thumbnailDiv.addClass("thumbnail");

                // place image in html document
                var img = $("<img>");
                // set the img src to the static image
                img.attr("src", staticImgURL);
                // set the class property
                img.addClass("downloaded-image img-responsive");
                img.attr("alt", gifTitle);
                // set the data-static property to the static url
                img.attr("data-static", staticImgURL);
                // Set the data-animate property to the animated image url
                img.attr("data-animate", animatedImgURL);
                // Set the default state to static
                img.attr("data-state", "static");
                // add the image div into the thumbnail div
                $(thumbnailDiv).append(img);
                // add a caption div to contain the image
                var captionDiv = $("<div>");
                captionDiv.addClass("caption");
                // add the title of the image to the caption div heading
                $(captionDiv).html("<h3>" + gifTitle + "</h3>");
                // add the rating of the image to the caption div heading
                $(captionDiv).append("<p>Rating: " + gifRating + "</p>");
                // add the image row, column div, and caption div to the thumbnail div
                $(imageRowID).append(columnDiv);
                $(columnDiv).append(thumbnailDiv);
                $(thumbnailDiv).append(captionDiv);


            }

        });

    }

    function renderButtons() {
        // verify that we are in the button div
        // Deleting the buttons prior to adding new buttons
        $(buttonClass).empty();
        // page loads with a few pre-defined buttons labelled with animal names and an input box
        // render the default buttons populated with the values from the arrDefaultButtons
        for (i = 0; i < arrDefaultButtons.length; i++) {
            var b = $("<button>");
            b.addClass("btn btn-primary default-buttons");
            b.attr("data-query", arrDefaultButtons[i]);
            b.text(arrDefaultButtons[i]);
            $(buttonClass).append(b);
        }
    }

    // This function handles events where the add inputID button is clicked
    $(inputID).on("click", function (event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var query = $(inputData).val().trim();
       // The query term from the textbox is then added to our array
        arrDefaultButtons.push(query);

        // Calling renderButtons which handles the processing of our query array
        renderButtons();
    });
    // Function for displaying the default query info
    // Using $(document).on to capture click events
    $(document).on("click", ".default-buttons", imageRowID, getImgData);

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