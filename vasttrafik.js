var vastContainer = document.getElementById("vasttrafik");
var shouldTestEmpty = false;
// window.hrMin = "15:30";
// window.daDate = "2019-12-10";

var melon = "YVY5alFrVkZSRFZ3ZDBodk5WcGFjM0JzYjJGSWRFOVhWVE0wWVRwWlZ6YzVkR0ZtY0RGYVdYWnlXV2syTmsxNGIxQjJSbkJHU1hkaA==";

var apple = "QXV0aG9yaXphdGlvbg==";

function update() {
    var xhr_auth = new XMLHttpRequest();
    xhr_auth.onreadystatechange = process_auth;
    xhr_auth.open("POST", "https://cors.svaren.dev/https://api.vasttrafik.se:443/token", true);
    xhr_auth.setRequestHeader(atob(apple), "Basic " + atob(melon));
    xhr_auth.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr_auth.send("grant_type=client_credentials");

    var xhr_v = new XMLHttpRequest();

    function process_auth() {
        if (xhr_auth.readyState == 4) {
            var token = JSON.parse(xhr_auth.responseText).access_token;
            xhr_v.onreadystatechange = process_new;
            xhr_v.open("GET", "https://api.vasttrafik.se/bin/rest.exe/v2/departureBoard?id=9021014017122000&date=" + window.daDate + "&time=" + window.hrMin + "&timeSpan=120&maxDeparturesPerLine=1&needJourneyDetail=0&format=json", true);
            xhr_v.setRequestHeader("Authorization", "Bearer " + token);
            xhr_v.send();
        }
    }

    function process_new() {
        if (xhr_v.readyState == 4) {
            vastContainer.innerHTML = "";
            var json = JSON.parse(xhr_v.responseText).DepartureBoard.Departure;
            if (shouldTestEmpty) json = null;
            var busses = [];
            // console.log(json);
            if (json) {
                if (json.length > 1) {

                    for (var i = 0; i < json.length; i++) {
                        var bus = json[i];
                        if (bus.rtTime === bus.time) { bus.rtTime = undefined; }
                        var checkApp = bus.booking ? true : false;
                        busses.push({ line: bus.sname, direction: bus.direction, time: bus.time, newTime: bus.rtTime, color: bus.bgColor, checkApp: checkApp });
                    }
                } else {
                    if (json.rtTime === json.time) json.rtTime = undefined;
                    var checkApp = json.booking ? true : false;
                    busses.push({ line: json.sname, direction: json.direction, time: json.time, newTime: json.rtTime, color: json.bgColor, checkApp: checkApp });
                }
            } else {
                vastContainer.innerHTML = "<nobusses>Inga avgångar</nobusses>";
                return;
            }
            for (var j = 0; j < busses.length; j++) {
                var curr_bus = busses[j];
                vastContainer.innerHTML += '<div class="bus">'+(curr_bus.checkApp ? '<infoicon></infoicon>' : "") + '<linebadge style="background-color: ' + curr_bus.color + ';">' + curr_bus.line + '</linebadge>' + curr_bus.direction + "<span" + (curr_bus.newTime ? ' class="vast-late" ' : "") + '>' + curr_bus.time + '</span>' + (curr_bus.newTime ? '<span style="color:red; margin-right: 10px;">' + curr_bus.newTime + "</span>" : "") + '</div>';
            }
        }
    }
}

update();
setInterval(update, 60000);