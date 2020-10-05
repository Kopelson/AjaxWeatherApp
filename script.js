$(document).ready(function(){
    //render city list if in local storage
    if(localStorage.getItem("cities") !== null){
        renderCityList()   
    };
    //grabs the city that is active in the list
    let cityName = $(".active")[0].innerText;
    //api key from openweathermap.org
    const apiKey = "&appid=27ffb5b5dc6407d635a7bcd87cd32739";
    //city name, state code and country code divided by comma, use ISO 3166 country codes.
    const query = "q=";
    //openweathermap.org request url for daily
    const urlWeather = "https://api.openweathermap.org/data/2.5/weather?";
    //combine url, query, and api key to get a query url
    const queryurlWeather = urlWeather + query + cityName + apiKey;
    //this is a jQuery ajax request and promise to get the city weather data from openweathermap.org
    $.ajax({url: queryurlWeather, method:"GET"}).then(function(response){
        $("#city-name").text(response.name + " " + timeConverter(response.dt));
        $("#icon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
        $("#temperature").text("Temp: " +tempKtoF(response.main.temp) + "°F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
        getUVIndex(apiKey, response.coord.lat, response.coord.lon);
        getDailyForecast(apiKey, response.coord.lat, response.coord.lon);
    });
})

$("#city-search-button").on("click", function(){
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
    //this is a jQuery ajax request and promise to get the city weather data from openweathermap.org
    $.ajax({url: queryurlWeather, method:"GET"}).then(function(response){
        $("#city-name").text(response.name + " " + timeConverter(response.dt));
        $("#icon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
        $("#temperature").text("Temperature: " +tempKtoF(response.main.temp) + "°F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
        getUVIndex(apiKey, response.coord.lat, response.coord.lon);
        getDailyForecast(apiKey, response.coord.lat, response.coord.lon);
    });
});

function tempKtoF(temp){
//(K − 273.15) × 9/5 + 32 = F
let fahrenheit = (temp - 273.15) * 9/5 + 32;
fahrenheit = fahrenheit.toFixed(2);
return fahrenheit;
};

function getUVIndex(apiKey, lat, lon){
    const url = "https://api.openweathermap.org/data/2.5/uvi?";
    const latString = "lat=" + lat;
    const lonString = "lon=" + lon;
    const queryurl = url + latString + "&" + lonString + apiKey;
    //this is a jQuery ajax request and promise to get the city UV Index from openweathermap.org
    $.ajax({url: queryurl, method:"GET"}).then(function(response){
        let spanEl = $("<span></span>");
        spanEl.addClass("badge p-2")
        spanEl.text(response.value);
        //This adds a class depending on the UV value low (green), moderate (yellow), high (orange), very high (red)
        if(response.value < 3){
            spanEl.addClass("badge-success");
        } else if (response.value < 6 && response.value >= 3){
            spanEl.addClass("badge-warning");
        } else if (response.value < 8 && response.value >= 6){
            spanEl.addClass("badge-orange");
        } else {
            spanEl.addClass("badge-danger");
        };
        $("#uv-index").text("UV Index: ").append(spanEl);
    });
};

function getDailyForecast(apiKey, lat, lon) {
    const urlForecast = "https://api.openweathermap.org/data/2.5/onecall?";
    const latString = "lat=" + lat;
    const lonString = "lon=" + lon;
    const queryurlForecast = urlForecast + latString + "&" + lonString + apiKey;

    for(let i = 1; i < 6; i++){
        //this is a jQuery ajax request and promise to get the city 5 day forecast data from openweathermap.org
        $.ajax({url: queryurlForecast, method:"GET"}).then(function(response){
            $("#date-day"+i).text(timeConverter(response.daily[i].dt));
            $("#icon-day"+i).attr("src", "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png");
            $("#temperature-day"+i).text("Temp: " +tempKtoF(response.daily[i].temp.day) + "°F");
            $("#humidity-day"+i).text("Humidity: " + response.daily[i].humidity + "%");
        });
    }
}

//Tutorial on Date https://www.w3schools.com/jsref/jsref_obj_date.asp
function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let year = a.getFullYear();
    let month = a.getMonth()+1;
    let date = a.getDate();
    let time = "(" + month + '/' + date+ '/' + year + ")";
    return time;
  };

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
    //this is a jQuery ajax request and promise to get the city weather data from openweathermap.org
    $.ajax({url: queryurlWeather, method:"GET"}).then(function(response){
        $("#city-name").text(response.name + " " + timeConverter(response.dt));
        $("#icon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
        $("#temperature").text("Temp: " +tempKtoF(response.main.temp) + "°F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
        getUVIndex(apiKey, response.coord.lat, response.coord.lon);
        getDailyForecast(apiKey, response.coord.lat, response.coord.lon);
    });
}

function addCityToList(name){
    let liEl = $("<li></li>");
    liEl.text(name);
    liEl.addClass("list-group-item");
    //this removes the active class from the list item
    $(".active").removeClass("active");
    //this adds the active class to the selected list item
    liEl.addClass("active")
    $(".list-group").append(liEl);
}

function storeCityList(){
    let cityList = [];
    //this grabs each li element innerText which should be city names and pushes them to the cityList array
    $("li").each(function(){
        cityList.push($(this)[0].innerText);
    });
    //store cityList array to local storage
    localStorage.setItem("cities", cityList);
}

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

function clearCityList(){
    //clears the ul element with the class list-group
    $(".list-group").empty();
    //clears out local storage
    localStorage.clear();
};
//this adds an event listener to the whole document and listens for clicks on list-group-item element class which should be city names and renders a new weather report
$(document).on("click", ".list-group-item", renderNewWeatherReport);