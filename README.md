# AJAX Weather App

## Description
 <p>This weather app focuses on using OpenWeatherMap.org API to retrieve weather data for cities across the United States.
 This application also features Bootstrap and jQuery to update and change the UI, and local storage to save custom city searches.
 A jQuery AJAX (Asynchronous JavaScript And XML) requet - $.ajax() - is used to send a GET request to OpenWeatherMap's API.
 Then the API sends back a JSON (JavaScript Object Notation) object that can be combed through to grab specific weather data for the desired city.</p> 

## Table of Contents

* [Overview](#overview)
* [Credits](#credits)
* [License](#license)

## Overview
Project Link: https://kopelson.github.io/ajaxWeatherApp/

![overview](https://user-images.githubusercontent.com/57735283/95258455-a5271900-07da-11eb-8493-18c27100543b.PNG)

### Responsive Design
![responsive](https://user-images.githubusercontent.com/57735283/95257999-fa165f80-07d9-11eb-9e26-51c2c18cc9a6.gif)

<p>Bootstrap's grid system allows for the application to be responsive and mobile friendly</p>

### Search by City
![search](https://user-images.githubusercontent.com/57735283/95258003-fbe02300-07d9-11eb-979a-a5a8c303a52d.gif)

<p>Users can search by city using the search input. If the city exists in OpenWeatherMap database, the city name will be added to the list. 
 Users can click the search icon or press enter to begin the search. </p>

### Error Handler
![errorHandler](https://user-images.githubusercontent.com/57735283/95258025-039fc780-07da-11eb-93b8-fc79c30d6100.gif)

<p>If the user searches a city that doesn't exisit in OpenWeatherMap database, an alert will notify the user and the city name will not be added to the list.
 The search input is also cleared after each request </p>

### Clear City List
![clear](https://user-images.githubusercontent.com/57735283/95258006-fe427d00-07d9-11eb-9dc4-ad55e4d06f4f.gif)

<p>The clear red button will remove all cities from the list and delete local storage. The user then can customize the search list 
 by searching new desired cities weather info. If the user does not supply any city names after clearing the list, the default cities will repopulate after a
 window refresh.</p>

### Store Custom City List
![localstorage](https://user-images.githubusercontent.com/57735283/95258015-013d6d80-07da-11eb-845e-39c3c0250d03.gif)

<p>Local storage is used to save user searches. When the window first loads the default city names will appear in the list. This list is then saved to local storage
 to be reused when the window is reopened. Everytime the user searches a city, the name of the city will be capitalized, saved in the list, and local storage is 
 updated with the list of city names.</p>

## Credits

### OpenWeatherMap.org
  * API documentation https://openweathermap.org/api

### jQuery
  * jQuery website https://jquery.com/

### Bootstrap
  * Bootstrap website https://getbootstrap.com/
  
### Trilogy Education Services
  * Thanks Trilogy for project idea

### Tutorials
  * How convert a UNIX Time Stamp using Date https://www.w3schools.com/jsref/jsref_obj_date.asp

## License

### MIT License

Copyright (c) 2020 Ken Kopelson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Badges
<a href="https://img.shields.io/badge/CSS-9.7%25-purple"><img alt="CSS usage" src="https://img.shields.io/badge/CSS-9.7%25-purple"></a> <a href="https://img.shields.io/badge/HTML-34.6%25-red"><img alt="HTML usage" src="https://img.shields.io/badge/HTML-34.6%25-red"></a> <a href="https://img.shields.io/badge/JavaScript-55.7%25-yellow"><img alt="Javascript usage" src="https://img.shields.io/badge/JavaScript-55.7%25-yellow"></a> <a href="https://img.shields.io/badge/Frameworks-Bootstrap-blue"><img alt="Bootstrap framework" src="https://img.shields.io/badge/Frameworks-Bootstrap-blue"></a> <a href="https://img.shields.io/badge/Frameworks-jQuery-blue"><img alt="jQuery framework" src="https://img.shields.io/badge/Frameworks-jQuery-blue"></a>
