// Global Variables

// Once Search button is clicked, New Button with City name appears and summons Weather Info
$('.searchBtn').click(function(){
    //Variables
    var city = $('input').val().trim()
    var newCityBtn = $('<button>')
    
    // Appends City Button
    newCityBtn.text(city)
    newCityBtn.addClass("new-city")
    $('.city-list').append(newCityBtn)
    $('.cityName').val('')

    //Calls Weather Info
    retrieveWeather(city)
})

function addCityButton(){
    //Variables
    var city = $('input').val().trim()
    var newCityBtn = $('<button>')
    
    // Appends City Button
    newCityBtn.text(city)
    newCityBtn.addClass("new-city")
    $('.city-list').append(newCityBtn)
    $('.cityName').val('')
}

// Makes Ajax Call and Adds Weather Info to page
function retrieveWeather(city){
    var presentDay = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=35d620965257ee08417a39c348a90683"

    // First Ajax Call for Present Day
    $.ajax({
        url: presentDay,
        method: 'GET',
    }).then(function(response){
        // Variables
        var cityName = response.name 
        var temperature = Math.round((response.main.temp - 273.15) * 1.8 + 32);
        var humid = response.main.humidity
        var wind = response.wind.speed
        var weatherIcon = response.weather[0].icon;
        var iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
        var longitude = response.coord.lon 
        var latitude = response.coord.lat 
        var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&APPID=35d620965257ee08417a39c348a90683"
        var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=35d620965257ee08417a39c348a90683"
        var iconImg = $('<img>')
        iconImg.attr("src", iconURL)

        $('#city-date').text(cityName + " (" + moment().format("MMMM Do YYYY") + ")")
        $('#city-date').append(iconImg)
        $('#currentTemp').text("Temperature: " + temperature + " °F")
        $('#currentHumid').text("Humidity: " + humid + "%")
        $('#windSpd').text("Wind Speed: " + wind + " MPH")
        $('.weather').removeClass('hide')
        
        // Second Ajax Call for UV Index
        $.ajax({
            url: uvURL,
            method: 'GET',

        }).then(function(response){
            var uvInd = response.current.uvi
            $('#uvIndex').html("UV Index: <span>" +uvInd +"</span>")
            if (uvInd < 3) {
                $('span').addClass('uvLow')
            } else if (uvInd > 3 && uvInd < 6){
                $('span').addClass('uvMed')
            } else if (uvInd > 5 && uvInd < 8){
                $('span').addClass('uvHigh')
            } else if (uvInd > 7 && uvInd < 11) {
                $('span').addClass('uvVHigh')
            } else {
                $('span').addClass("uvExtreme")
            }

        })
    
        // Third Ajax Call for 5 Day Forecast
    })



}