# WeatherApp

For this project, I created a weather app that could retrieve a city's weather using a weather API and the user's input. 

<img src = "Screenshots\basePage.JPG" alt="Starting Page" width = "1000px" height = "500px">

The User is initally greeted with a simple page with just a banner and an input section with a search button. They can enter the name of
any city they want to keep track of the weather in. They can either search the city by either pressing the search button or hitting the 
enter button once the fill out the input. 

<img src = "Screenshots\First_City_Entered.JPG" alt = "Results of Search" width = "1000px" height = "500px">
<img src = "Screenshots\Reload_with_saved_cities.JPG" alt = "Page Upon Reload" width = "1000px" height = "500px">

Once the city data has been retrieved via the AJAX call, the results are shown in the side area. The current day is prominently presented to the user and the Five Day forecast is displayed underneath. Additionally, the city name is appended to the page in the form of a button so the user may switch between previously saved cities by clicking on their buttons. The city names are saved in an array which is found in the local storage and pulled from when the page initially loads. 

The user may clear the saved cities by clicking the "clear cities" button at the bottom of the page. This will clear both the current buttons and local storage, as well as reload the page. 

If you'd like to view the app yourself, please visit https://mckoyc94.github.io/WeatherApp/