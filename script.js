

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
        $("#city-name").text(response.name);
        $("#temperature").text("Temperature: " +tempKtoF(response.main.temp) + "°F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
        getUVIndex(apiKey, response.coord.lat, response.coord.lon);

    });

    const urlForecast = "https://api.openweathermap.org/data/2.5/forecast?";

    const queryurlForecast = urlForecast + query + city + apiKey;
    $.ajax({url: queryurlForecast, method:"GET"}).then(function(response){
        console.log(response);
        $("#date-day-one").text(response.list[3].dt_txt);
        $("#icon-day-one").attr("src", "http://openweathermap.org/img/wn/" + response.list[3].weather[0].icon  + "@2x.png");
        $("#temperature-day-one").text("Temperature: " +tempKtoF(response.list[3].main.temp) + "°F");
        $("#humidity-day-one").text("Humidity: " + response.list[3].main.humidity + "%");
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
        spanEl.addClass("badge badge-primary p-2")
        spanEl.text(response.value);
        $("#uv-index").text("UV Index: ").append(spanEl);
    });
};