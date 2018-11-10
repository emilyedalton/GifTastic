// Initial array of cities
var cities = ["Seattle", "New York", "Detroit","Los Angles", "Milwaukee"];
//re render html to display. Function empties out gifPlace div, gets the name from the button and queries the url with that name/term 
function getCity() {
    $("#gifPlace").empty();
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
          // var gifDiv = $("<div>").attr("id", "gifStyle"+i);
          var gifDiv = $("<div>").addClass("gifStyle");

//storing the rating
          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var cityImage = $("<img>");
          cityImage.attr("src", results[i].images.fixed_height_still.url);
          cityImage.attr('data-still', results[i].images.fixed_height_still.url);
          cityImage.attr('data-animate', results[i].images.fixed_height.url);
          cityImage.attr('data-state', "still",results[i].images.fixed_height_still.url);  
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
  
    // Looping through the array of cities
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
  
  //   // The city from the textbox is then added to our array
    cities.push(city);
    // $("#city-input").reset();

   // Calling renderButtons which handles the processing of our movie array
   

  renderButtons();
   });

 $(document).on("click", ".city", getCity);

 
$(document).on("click", ".gif", function animate(){

  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
 
});

 
// Calling the renderButtons function to display the intial buttons
renderButtons();
