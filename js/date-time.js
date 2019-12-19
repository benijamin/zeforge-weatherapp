function showLocalDateTime() {    
    var date = new Date();
        var localdateStr =
        ("00" + date.getDate()).slice(-2) + "." +
        ("00" + (date.getMonth() + 1)).slice(-2) + "." +
        date.getFullYear() + '.';
        var localtimeStr =
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);
    $('#date').text(localdateStr);
    $('#time').text(localtimeStr);
}

showLocalDateTime();

/*
function ShowLocalDate() {
    var dateNow = new Date();
    var localdate = (dateNow.getDate() + '.' + (dateNow.getMonth()+1) + '.' + dateNow.getFullYear());
    var localtime = (dateNow.getHours() + ':' + dateNow.getMinutes() + ':' + dateNow.getSeconds());
    $('#date').text(localdate);
    $('#time').text(localtime);
}

ShowLocalDate();
*/
