$(document).ready(function () {
    var cities = [];

    function displayCityInfo() {


        var city = $(this).attr("data-name");

        if (city === undefined) {
            city = $("#city-input").val().trim();
        }

        //console.log(city);

        var APIKey = "dddd3014021c071f0fb2a18ec4e1d3da"

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {


            //console.log(queryURL);

            //console.log(response);

            var iconcode = response.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

            var icon = $('<img>').attr('src', iconurl);
            var cityName = $(".city").text(response.name).append(icon);
            var wind = $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
            var humidity = $(".humidity").text("Humidity: " + response.main.humidity + "%");
            var temp = $(".temp").text("Temperature: " + response.main.temp + " F");




        });

    };


    function display5DaysInfo() {


        var cityDay = $(this).attr("data-name");

        if (cityDay === undefined) {
            cityDay = $("#city-input").val().trim();
        }

        console.log(cityDay);

        var APIKey5Days = "dddd3014021c071f0fb2a18ec4e1d3da"

        var queryURL5Days = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityDay + "&units=imperial" + "&appid=" + APIKey5Days;

        $.ajax({
            url: queryURL5Days,
            method: "GET"
        }).then(function (response) {
            $("#forecast").empty();

            console.log(queryURL5Days);

            console.log(response);

            for (let i = 0; i < response.list.length; i += 8) {




                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                // console.log(dayName)

                var iconcode = response.list[i].weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

                
                var newDiv = $("<div>").addClass("card-body five-day col-md-2.4");
                var d = new Date(response.list[i].dt * 1000);
                var dayName = $("<h4>").text(days[d.getDay()]);
                var humidityDay = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%");
                var tempDay = $("<p>").text("Temperature: " + response.list[i].main.temp + " F");
                var icon = $('<img>').attr('src', iconurl);

                $("#forecast").append(newDiv);
                newDiv.append(dayName);
                newDiv.append(icon);
                newDiv.append(tempDay);
                newDiv.append(humidityDay);
            
        

                


                console.log(i)
                console.log(response.list[i].main.temp);
                console.log(response.list[i].main.humidity);
            
            }



        });

    };

    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < cities.length; i++) {


            var newBtn = $("<button>");

            newBtn.addClass("btn btn-style");

            newBtn.attr("data-name", cities[i]);

            newBtn.text(cities[i]);

            $("#buttons-view").append(newBtn);
        };
    };


    $(".btn").on("click", function (event) {
        event.preventDefault();

        var city = $("#city-input").val().trim();


        cities.push(city);
        renderButtons();

        displayCityInfo();
        display5DaysInfo();

    });

    $(document).on("click", ".btn-style", displayCityInfo);
    $(document).on("click", ".btn-style", display5DaysInfo);

    renderButtons();

});