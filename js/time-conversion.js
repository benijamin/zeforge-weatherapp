function timeConversion(time_str) {
    // Convert a string like 10:05:23 PM to 24h format, returns like [22,5,23]
    var time = time_str.match(/(\d+):(\d+):(\d+) (\w)/);
    var hours = Number(time[1]);
    var minutes = Number(time[2]);
    var seconds = Number(time[3]);
    var meridian = time[4].toLowerCase();

    if (meridian == 'p' && hours < 12) {
      hours += 12;
    } else if (meridian == 'a' && hours == 12) {
      hours -= 12;
    }
    return [hours + ':' + minutes];
};

timeConversion();