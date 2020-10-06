//AJAX Weather App JavaScript Code - powered by jQuery and OpenWeatherMap.org API

//executes function when the document is done loading
$(document).ready(function(){
    //checks local storage for existing city searches and will run renderCityList if local storage has a key name "cities"
    if(localStorage.getItem("cities") !== null){
        //this renders the stored city names to the aside city names
        renderCityList()   
    };
    //grabs the city that is active in the list
    let cityName = $(".active")[0].innerText;
    //api key from openweathermap.org
    const apiKey = "&appid=27ffb5b5dc6407d635a7bcd87cd32739";
    //parameter for city search by city name, state code and country code divided by comma, use ISO 3166 country codes.
    const query = "q=";
    //openweathermap.org request url for todays weather
    const urlWeather = "https://api.openweathermap.org/data/2.5/weather?";
    //combine url, query, and api key to get a query url
    const queryurlWeather = urlWeather + query + cityName + apiKey;
    //this function is a jQuery ajax request and promise to get the city weather data from openweathermap.org
    ajaxQuery(queryurlWeather, apiKey);
})
//adds an event listener to the id city-search-button that runs if the button is clicked
$("#city-search-button").on("click", function(){
    //this function gets the weather data for the city that was entered into the search field and updates the UI  
    getCityWeatherData();
});
//tutorial on jQuery detect enter press https://howtodoinjava.com/jquery/jquery-detect-if-enter-key-is-pressed/
//adds an event listener to enter press in the search city input box
$('#city-search-input').keypress(function(event){
    let keycode = (event.keyCode ? event.keyCode : event.which);
    //keycode 13 is the enter button
    if(keycode == '13'){
        //this function gets the weather data for the city that was entered into the search field and updates the UI 
        getCityWeatherData();  
    };
});
//this function gets the weather data for the city that was entered into the search field and updates the UI 
function getCityWeatherData(){
    //grabs city name from search input bar
    const city = $("#city-search-input").val();
    //adds city to the list
    addCityToList(city);
    //store city list to local storage
    storeCityList();
    //api key
    const apiKey = "&appid=27ffb5b5dc6407d635a7bcd87cd32739";
    //city name, state code and country code divided by comma, use ISO 3166 country codes.
    const query = "q=";
    //openweathermap.org request url for daily
    const urlWeather = "https://api.openweathermap.org/data/2.5/weather?";
    //combine url, query, and api key to get a query url
    const queryurlWeather = urlWeather + query + city + apiKey;
    //this runs the ajax query function with the queryurlWeather argument
    ajaxQuery(queryurlWeather, apiKey);
    //clears search input field after search for better user experience
    $("#city-search-input").val("");
}

function ajaxQuery(queryurl,apiKey){
//jQuery ajax request and promise to get the city weather data from openweathermap.org
$.ajax({url: queryurl, method:"GET"}).then(function(response){
    //selects id city-name and fills the text with city name and todays date
    $("#city-name").text(response.name + " " + timeConverter(response.dt));
    //selects id icon and adds the attribute src and the weather icon data
    $("#icon").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
    //selects id temperature and fills the text with temperature data that converted to Fahrenheit through the tempKtoF function 
    $("#temperature").text("Temperature: " +tempKtoF(response.main.temp) + "°F");
    //selects id humidity and fills the text with humidity data
    $("#humidity").text("Humidity: " + response.main.humidity + "%");
    //selects id wind-speed and fills the text with wind speed data
    $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
    //runs getUVIndex function that takes in coordinates lat and lon to get the areas uv index 
    //also fills in the uv-index text with a number and a colored border depending on severity
    getUVIndex(apiKey, response.coord.lat, response.coord.lon);
    //runs getDailyForecast function that takes in coordinates lat and lon to get the 5 day forecast of the area
    //also fills in the 5 day forecast underneath the day weather report
    getDailyForecast(apiKey, response.coord.lat, response.coord.lon);
}, // this handles ajax request errors, ie 404 Not Found and alerts the user and refreshes UI
    function() {
        //ths alerts the user that the city they entered is invalid
        alert("Sorry we could not find that City! Please search for a different city.");
        //selects the ul element and removes the last entered city
        $("ul").children().last().remove();
        //stores the city list
        storeCityList();
        //renders the new city list
        renderCityList();
        //grabs the city that is active in the list
        let cityName = $(".active")[0].innerText;
        //api key from openweathermap.org
        const apiKey = "&appid=27ffb5b5dc6407d635a7bcd87cd32739";
        //parameter for city search by city name, state code and country code divided by comma, use ISO 3166 country codes.
        const query = "q=";
        //openweathermap.org request url for todays weather
        const urlWeather = "https://api.openweathermap.org/data/2.5/weather?";
        //combine url, query, and api key to get a query url
        const queryurlWeather = urlWeather + query + cityName + apiKey;
        //this function is a jQuery ajax request and promise to get the city weather data from openweathermap.org
        ajaxQuery(queryurlWeather, apiKey);
});
};
//this converts temperature data that comes in Kelvin to Fahrenheit
function tempKtoF(temp){
//convert Kelvin to Fahrenheit by using this equation (K − 273.15) × 9/5 + 32 = F
let fahrenheit = (temp - 273.15) * 9/5 + 32;
//assigns fahrenheit to go to 2 decimal places
fahrenheit = fahrenheit.toFixed(2);
//returns temperature in Fahrenheit
return fahrenheit;
};
//this gets UV index of a latitude and longitude location and returns a colored badge with the UV index number
function getUVIndex(apiKey, lat, lon){
    //url for UV index api from OpenWeatherMap.org
    const url = "https://api.openweathermap.org/data/2.5/uvi?";
    //stores the latitude parameter for the api request
    const latString = "lat=" + lat;
    //stores the longitude parameter for the api request
    const lonString = "lon=" + lon;
    //combines the variables to create the url for the ajax request 
    const queryurl = url + latString + "&" + lonString + apiKey;
    //this is a jQuery ajax request and promise to get the city UV Index from openweathermap.org
    $.ajax({url: queryurl, method:"GET"}).then(function(response){
        //creates a span element
        let spanEl = $("<span></span>");
        //adds a class to the span element
        spanEl.addClass("badge p-2")
        //adds the uv index to the text of the span element
        spanEl.text(response.value);
        //adds a class depending on the UV value low (green), moderate (yellow), high (orange), very high (red)
        if(response.value < 3){
            spanEl.addClass("badge-success");
        } else if (response.value < 6 && response.value >= 3){
            spanEl.addClass("badge-warning");
        } else if (response.value < 8 && response.value >= 6){
            spanEl.addClass("badge-orange");
        } else {
            spanEl.addClass("badge-danger");
        };
        //the selected id uv-index text now reads "UV Index: " and appends the span colored badge with the UV index number
        $("#uv-index").text("UV Index: ").append(spanEl);
    });
};
//this gets weather data for the 5 day forecast
function getDailyForecast(apiKey, lat, lon) {
    //assigns the URL for the 5 day forecast api
    const urlForecast = "https://api.openweathermap.org/data/2.5/onecall?";
    //stores the latitude parameter for the api request
    const latString = "lat=" + lat;
    //stores the longitude parameter for the api request
    const lonString = "lon=" + lon;
    //combines the variables to create the url for the ajax request 
    const queryurlForecast = urlForecast + latString + "&" + lonString + apiKey;
    //this for loop runs through 5 times for each day in the 5 day forecast
    for(let i = 1; i < 6; i++){
        //this is a jQuery ajax request and promise to get the city 5 day forecast data from openweathermap.org
        $.ajax({url: queryurlForecast, method:"GET"}).then(function(response){
            //selects id date-day + current iteration and changes the text to the date of the current iteration
            $("#date-day"+i).text(timeConverter(response.daily[i].dt));
            //selects id icon-day + current iteration and changes the attribute src to the current iterations icon
            $("#icon-day"+i).attr("src", "https://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png");
            //selects id temperature-day + current iteration and changes the text to the temperature of the current iteration
            $("#temperature-day"+i).text("Temp: " +tempKtoF(response.daily[i].temp.day) + "°F");
            //selects humidity-day + current iteration and changes the text to the humidity of the current iteration
            $("#humidity-day"+i).text("Humidity: " + response.daily[i].humidity + "%");
        });
    };
};
//Tutorial on Date https://www.w3schools.com/jsref/jsref_obj_date.asp
//this converts UNIX timestamps to a readable format
function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let year = a.getFullYear();
    let month = a.getMonth()+1;
    let date = a.getDate();
    //this changes the time stamp to a date form at (MM/DD/YYYY)
    let time = "(" + month + '/' + date+ '/' + year + ")";
    //returns a formatted string of the time stamp
    return time;
  };
//this function changes the active selector on the city list and renders the weather for the selected city
function renderNewWeatherReport(){
    //this removes the active class from the list item
    $(".active").removeClass("active");
    //this adds the active class to the selected list item
    $(this).addClass("active")
    //this grabs the selected city name
    let cityName = $(this).text();
    //api key from openweathermap.org
    const apiKey = "&appid=27ffb5b5dc6407d635a7bcd87cd32739";
    //city name, state code and country code divided by comma, use ISO 3166 country codes.
    const query = "q=";
    //openweathermap.org request url for daily
    const urlWeather = "https://api.openweathermap.org/data/2.5/weather?";
    //combine url, query, and api key to get a query url
    const queryurlWeather = urlWeather + query + cityName + apiKey;
    //this function is a jQuery ajax request and promise to get the city weather data from openweathermap.org
    ajaxQuery(queryurlWeather, apiKey);
}
//this function adds the city name to the city list and makes it active 
function addCityToList(name){
    //this creates a new li element
    let liEl = $("<li></li>");
    //this changes the new li element text to the city name
    liEl.text(name);
    //this adds the class to the new li element
    liEl.addClass("list-group-item");
    //this removes the active class from the list item
    $(".active").removeClass("active");
    //this adds the active class to the new li element
    liEl.addClass("active")
    //this appends the new li element to the selected id list-group 
    $(".list-group").append(liEl);
}
//this saves the city list to local storage
function storeCityList(){
    //this initializes the cityList array
    let cityList = [];
    //this grabs each li element innerText which should be city names and pushes them to the cityList array
    $("li").each(function(){
        cityList.push($(this)[0].innerText);
    });
    //store cityList array to local storage
    localStorage.setItem("cities", cityList);
}
//this renders the local storage item "cities" to the city list
function renderCityList(){
    //empty out the list-group class which contains all the city names
    $(".list-group").empty();
    //this grabs a string of city names from local storage
    let cityList = localStorage.getItem("cities");
    //this stores the city names into septate indexes in cityArr
    let cityArr = cityList.split(",");
    //this adds each city to a new li element in the city list ul
    cityArr.forEach(function(city){
        addCityToList(city);
    });
};
//this clears out all the cities on the city list UI and clears localStorage of all data
function clearCityList(){
    //clears the ul element with the class list-group
    $(".list-group").empty();
    //clears out local storage
    localStorage.clear();
};
//this adds an event listener to the whole document and listens for clicks on list-group-item element class which should be city names and renders a new weather report
$(document).on("click", ".list-group-item", renderNewWeatherReport);