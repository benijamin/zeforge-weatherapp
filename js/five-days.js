// API key: b9d14019e09145a3c952a8276f548682

$(document).ready(function() {
    
    //const iconElement = document.querySelector(".weather-icon");

    // Get forecast for entered city from API
    $('#submitCity').click(function(e) {
        e.preventDefault();
        var cityField = $('#enterCity').val();
        //var daysField = $('#enterDays').val();
        if(cityField !== ''/* && daysField !== ''*/) {
            $.ajax({
                type: 'GET',
                url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityField + '&cnt=40&APPID=b9d14019e09145a3c952a8276f548682&units=metric',
                dataType: 'jsonp',
                success: function(data) {
                    $("#enterCity").val('');
                    $(".city1").val('');
                    $("#forecast-weather").show();
                    //var iconCode = data.weather[0].icon;
                    //var iconUrl = 'img/icons/forecast' + iconCode + '.png';
                    var table = '';
                    for(var i = 6; i < data.list.length; i+=8) {
                        table += "<tr>";
                        table += "<td>" + data.list[i].dt_txt.split(' ')[0];
                        table += "<td><img src='img/icons/forecast/" + data.list[i].weather[0].icon + ".png'></td>";
                        //table += "<td><img src=" + iconUrl  + "></td>";
                        table += "<td>" + Math.floor(data.list[i].main.temp) + " °C</td>";
                        table += "<td>" + data.list[i].weather[0].description + "</td>";
                        table += "<td>" + data.list[i].main.pressure + " hPa</td>";
                        table += "<td>" + data.list[i].main.humidity + " %</td>";
                        table += "<td>" + data.list[i].main.temp_min + " °C</td>";
                        table += "<td>" + data.list[i].main.temp_max + " °C</td>";
                        table += "<td>" + data.list[i].wind.speed + " m/s</td>";
                        table += "<td>" + data.list[i].wind.deg + " °</td>";
                    }

                $("#forecast-weather").append('<thead><tr><td>Date</td><td>Weather</td><td>Temperature</td><td>Description</td><td>Pressure</td><td>Humidity</td><td>Min. Temperature</td><td>Max. Temperature</td><td>Wind Speed</td><td>Wind Direction</td></tr></thead>');
                $("#forecast-weather").append(table);
                $(".city1").empty().append(data.city.name);

                var unixSunrise = data.city.sunrise;
                var unixSunset = data.city.sunset;
                var dateSunrise = new Date(unixSunrise * 1000);
                var dateSunset = new Date(unixSunset * 1000);
                tSunr = dateSunrise.toTimeString();
                tSuns = dateSunset.toLocaleTimeString();
                timeSunrise = timeConversion(tSunr);
                timeSunset = timeConversion(tSuns);

                if(timeSunrise !== ' ' && timeSunset !== ' ') {
                $(".sunrise").empty().append('Sunrise: ' + timeSunrise + ' | ');
                $(".sunset").empty().append('Sunset: ' + timeSunset);
                } else {
                    $(".sunrise").empty().append('No Sunrise/Sunset Data!');
                    $('body').append('<style>.sunrise{color:#FF5050}</style>');
                }

                $('#forecast-weather thead').addClass('blue');
                $('#forecast-weather tr:even').addClass('light-blue');
                $('#forecast-weather tr:odd').addClass('lighter-blue');

                //$('.city').append(daysField);
                //$("#enterDays").val('');
                //$('.empty-error p').remove();

                $('#enterCity').click(function(e) {
                    $("#forecast-weather").empty();
                    $(".city1").empty();
                    $(".sunrise").empty();
                    $(".sunset").empty();

                });
                $("#enterCity").val('');

                }
            });
        } else {
            $("#enterCity").attr("placeholder", "Please enter City Name!");
            $('body').append('<style>#enterCity::placeholder{color:#FF5050}</style>');
            /*
            $(function() {
                $('#submitCity').on('click', function() {
                $('<p>Please enter City Name!</p>').appendTo('.empty-error');
                });
            });
            */
        }                         
    });
});