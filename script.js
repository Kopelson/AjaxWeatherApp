

$("#city-search-button").on("click", function(){
    const city = $("#city-search-input").val();
    //api key
    const apiKey = "&appid=27ffb5b5dc6407d635a7bcd87cd32739";
    //city name, state code and country code divided by comma, use ISO 3166 country codes.
    const query = "q=";
    //openweathermap.org request url for daily
    const urlWeather = "https://api.openweathermap.org/data/2.5/weather?";
    //combine url, query, and api key to get a query url
    const queryurlWeather = urlWeather + query + city + apiKey;

    $.ajax({url: queryurlWeather, method:"GET"}).then(function(response){
        console.log(response);
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
        $.ajax({url: queryurlForecast, method:"GET"}).then(function(response){
            console.log(response);
            $("#date-day"+i).text(timeConverter(response.daily[i].dt));
            $("#icon-day"+i).attr("src", "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png");
            $("#temperature-day"+i).text("Temperature: " +tempKtoF(response.daily[i].temp.day) + "°F");
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
    $(".active").removeClass("active");
    let cityName = $(this).text();
    $(this).addClass("active")
    console.log(cityName);
}

$(document).on("click", ".list-group-item", renderNewWeatherReport);