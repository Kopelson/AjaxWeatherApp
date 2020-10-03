

$("#city-search-button").on("click", function(){
    const city = $("#city-search-input").val();
    //api key
    const apiKey = "&appid=27ffb5b5dc6407d635a7bcd87cd32739";
    //city name, state code and country code divided by comma, use ISO 3166 country codes.
    const query = "q=";
    //openweathermap.org request url
    const url = "https://api.openweathermap.org/data/2.5/weather?";
    //combine url, query, and api key to get a query url
    const queryurl = url + query + city + apiKey;

    $.ajax({url: queryurl, method:"GET"}).then(function(response){
        console.log(response);
        $("#city-name").text(response.name);
        $("#temperature").text("Temperature: " +tempKtoF(response.main.temp) + "°F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
        getUVIndex(apiKey, response.coord.lat, response.coord.lon);

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