// Global Variables
var savedCities = []; 

renderCityButtons()

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
    savedCities.push(city)
    localStorage.setItem('Saved Cities', JSON.stringify(savedCities))

    //Calls Weather Info
    retrieveWeather(city)
})

// Can Click on Saved Cities to load local Weather 
$(document).on('click','.new-city', function(){
    var oldCity = $(this).text()
    retrieveWeather(oldCity)
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
        // Main Weather and All Ajax URL Variables
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

        $('#city-date').text(cityName + " (" + moment().format("L") + ")")
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
            
            // Sets Color of UV Index to UVI Scale Color
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
        $.ajax({
            url: fiveDayURL,
            method: 'GET',
        }).then(function(response){
            // Array captures the temperature at Midday
            console.log("response: ", response)
            var weatherArr = ["",]
            for (var i = 0; i < response.list.length; i++){
                if (response.list[i].dt_txt.indexOf("15:00:00") > 0){
                    weatherArr.push(response.list[i])
                }
            } 

            for (var i = 1; i < 6; i++){
                // Five Day Variables
                var nextDay;
                var futureTemp = Math.round((weatherArr[i].main.temp - 273.15) * 1.8 + 32);
                var futureHumid = weatherArr[i].main.humidity
                var futureIcon = weatherArr[i].weather[0].icon
                var futureIconURL = "https://openweathermap.org/img/wn/" + futureIcon + "@2x.png"
                console.log(weatherArr[i])

                // Targets the Sections of the 5 Day Forecast
                if (moment().format('h:mm:ss a') < moment().format('MMMM Do YYYY 09:00:00')){
                    nextDay = moment().add(i-1,'day').format('L')
                } else {
                    nextDay = moment().add(i,'day').format('L')
                }
                var dateCard = $('#day-'+ i)
                var dateTemp = $('#dTemp-' + i)
                var dateHumid = $('#dHumid-' + i)
                var weekIcon = $('#icon-' + i)

                dateCard.text(nextDay)
                dateTemp.text("Temperature: " + futureTemp + " °F")
                dateHumid.text("Humidity: " + futureHumid + "%")
                weekIcon.attr('src', futureIconURL)

            }
        })
    })
}

// Recreates any previous cities and appends them to document
function renderCityButtons(){
    var cityButtons = JSON.parse(localStorage.getItem('Saved Cities'))

    // Goes through Local Storage array and appends buttons to city list
    for (var i = 0; i < cityButtons.length; i++){
    var city = cityButtons[i]
    var newCityBtn = $('<button>')
    
    // Appends City Button
    newCityBtn.text(city)
    newCityBtn.addClass("new-city")
    $('.city-list').append(newCityBtn)
    savedCities.push(city)
    }
}