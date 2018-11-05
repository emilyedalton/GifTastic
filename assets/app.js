// Initial array of cities
var cities = ["Seattle", "New York", "Los Angles", "Milwaukee"];

//re render html to display 
function getCity() {
    $("#gifDiv").empty();
    var city = $(this).attr("data-name");
    console.log("this is city" + city);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      city + "&api_key=ZgSjtsjt3JvDb8oe215Oo2PRzvpJDXoG&limit=10";
     
    //create AJAX call 
      $.ajax({
      url: queryURL,
      method: "GET"
    }) .then(function(response) {
        
        var results = response.data;
//iterating through each of the gifs returned from the API and creating a DIV for them
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");
//storing the rating
          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var cityImage = $("<img>");
          cityImage.attr("src", results[i].images.fixed_height.url);
          cityImage.attr('data-still', results[i].images.fixed_height_still.url);
          cityImage.attr('data-animate', results[i].images.fixed_height.url);
          cityImage.attr('data-state', results[i].images.fixed_height_still.url);  
          cityImage.addClass("gif",results[i].images.fixed_height_still.url)
         
          gifDiv.prepend(p);
          gifDiv.prepend(cityImage);

          $("#gifPlace").prepend(gifDiv);
        }
      });
    }

console.log(getCity)
// Function for displaying buttons
function renderButtons() {

    // Deleting the cities prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();
  
    // Looping through the array of movies
    for (var i = 0; i < cities.length; i++) {
  
      // Then dynamicaly generating buttons for each city in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class
      a.addClass("city");
      // Added a data-attribute
      a.attr("data-name", cities[i]);
      // Provided the initial button text
      a.text(cities[i]);
      // Added the button to the HTML
      $("#buttons-view").append(a);
    }
  }
  
  // // This function handles events where one button is clicked
  $("#add-city").on("click", function(event) {
    event.preventDefault();
  
  //   // This line grabs the input from the textbox
    var city = $("#city-input").val().trim();
  
  //   // The movie from the textbox is then added to our array
    cities.push(city);
  
   // Calling renderButtons which handles the processing of our movie array
  renderButtons();
   });
  
  // // Function for displaying the movie info
  // // We're adding a click event listener to all elements with the class "movie"
  // // We're adding the event listener to the document itself because it will
  // // work for dynamically generated elements
  // // $(".movies").on("click") will only add listeners to elements that are on the page at that time
 $(document).on("click", ".city", getCity);
 
 $(".gif").on("click", function() {
    var still =$(this).attr("data-state");
    if (still ==="still")
    { var animatedGif = $(this).attr("data-animate");
    $(this).attr("src", animatedGif);
 }
});
// Calling the renderButtons function to display the intial buttons
renderButtons();

