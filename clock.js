var container3 = document.createElement("p");
var container2 = document.createElement("p");
var time_offset = 1; // UTC time offset under vintertiden, 1 (UTC+01) i sverige. Problem med tidszon just nu
// var summer_time_offset = 2; // 2 i sverige eftersom att vi observerar UTC+02 under sommartiden
var week_days = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
var leet = ["1337!"] // :D

const timezone_request_url = "https://api.timezonedb.com/v2.1/get-time-zone?key=" + atob("WElaMU81UTlSUVE2") + "&by=zone&zone=Europe/Stockholm&format=json&fields=gmtOffset";

// var getZoneRequest = new XMLHttpReqeust();

function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, true ); // false for synchronous request
    xmlHttp.send();
    xmlHttp.onreadystatechange=function() {
        if (xmlHttp.readyState==4 && xmlHttp.status==200) {
            time_offset = JSON.parse(xmlHttp.responseText).gmtOffset/3600;
        }
        
    }
}

httpGet(timezone_request_url);

container3.id = "clock-time";
container2.id = "date-time";
document.scripts[document.scripts.length - 1].parentNode.appendChild(container3);

document.scripts[document.scripts.length - 1].parentNode.appendChild(container2);



Date.prototype.getWeek = function () {
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
}
/*
Date.prototype.stdTimezoneOffset = function () {
    // var jan = new Date(this.getFullYear(), 0, 1);
    // var jul = new Date(this.getFullYear(), 6, 1);
    // return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    var pre_date = [2, 31];
    var post_date = [9, 27];

    var date = new Date();
    var cur_date = [date.getMonth(), date.getDate()];

    if (cur_date[0] < pre_date[0] || cur_date[0] > post_date[0]) {
        if (cur_date[1] < pre_date[1] || cur_date[1] > post_date[1]) {
            return time_offset;
        }
    }
    return summer_time_offset;

}*/

/*
Date.prototype.isDstObserved = function () {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}
*/

function startTime() {
    //var today = luxon.DateTime.fromObject({zone: 'Europe/Stockholm'})
    var today = new Date(); // "2018-04-10 14:00"
    var h = today.getUTCHours();
    var m = today.getUTCMinutes();
    var s = today.getUTCSeconds();
    var w = today.getWeek();
    var d = today.getUTCDay();
    var da = today.getUTCDate();
    var mo = today.getUTCMonth();
    var yr = today.getUTCFullYear();
    //var timeOffset = today.stdTimezoneOffset();
    /*var h = today.hour;
    var m = today.minute;
    var s = today.second;
    var w = today.weekNumber;
    var d = today.weekday;
    var da = today.day;
    var mo = today.month;*/
    da = ((da < 10) ? "0" + da : da).toString();
    var dastr = parseInt(mo.toString() + da);
    h+=time_offset;
    if (mo + 1 == 12) {
        document.getElementById("ornament").style.display = "block";
    }
    //console.log(dastr);

   // var isCetObserved = false;
    //if (dastr >= 927 && dastr <= 231) {
    //    isCetObeserved = true;
    //}

    /*if (h + time_offset == 13 && m == 37) {
        s = (s < 10) ? "0" + s : s;
        container3.innerHTML = leet[Math.floor(Math.random() * leet.length)] + ":" + s + ", " + da + "/" + (mo + 1);
    } else {*/
        m = (m < 10) ? "0" + m : m + "";
        s = (s < 10) ? "0" + s : s + "";

        
        //container3.innerHTML =
        //h+time_offset + ":" + m + ":" + s + mo;
        window.hrMin = h + ":" + m  // %3A ???!! kanske
        window.daDate = yr + "-" + (mo + 1) + "-" + da;
        container3.innerHTML = h + ":" + m + ":" + s + ", " + da + "/" + (mo + 1);
        if (h === 13 && m === "37") {
            container3.innerHTML = "1337!:" + s + ", " + da + "/" + (mo + 1);
        }
    // }
    container2.innerHTML = week_days[d] + ' - v' + w;
}
startTime();
setInterval(startTime, 1000);