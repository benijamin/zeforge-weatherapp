// API key: b9d14019e09145a3c952a8276f548682

$(document).ready(function() {
    
    //const iconElement = document.querySelector(".weather-icon");

    var city = [];
    // Get weather information for entered city from API
    $('#submitCity').click(function(e) {
        e.preventDefault();
        var cityField = $('#enterCity').val();
        if(cityField !== '') {
            $.ajax({
                type: 'GET',
                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + cityField + '&APPID=b9d14019e09145a3c952a8276f548682&units=metric',
                dataType: 'jsonp',
                success: function(data) {
                    var iconCode = data.weather[0].icon;
                    var iconUrl = 'img/icons/' + iconCode + '.png';                  
                    city.push(cityField);
                    $('.location > h4').empty().text(data.name + ', ' + data.sys.country);
                    $(".weather-icon").html("<img src='" + iconUrl  + "'>");
                    $('.temperature-value > p').empty().text(Math.floor(data.main.temp) + " °C");
                    $('.weather-description > p > strong').empty().text(data.weather[0].description);
                    $('.pressure-value > p > strong').empty().append(data.main.pressure + " hPa");
                    $('.humidity-value > p > strong').empty().append(data.main.humidity + " %");
                    $('.min-temperature-value > p > strong').empty().append(data.main.temp_min + " °C");
                    $('.max-temperature-value > p > strong').empty().append(data.main.temp_max + " °C");
                    $('.wind-speed-value > p > strong').empty().append(data.wind.speed + " m/s");
                    $('.wind-direction-value > p > strong').empty().append(data.wind.deg + " °");
                    $('#enterCity').val('');
                    $('.empty-error p').remove();
                }
            })
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