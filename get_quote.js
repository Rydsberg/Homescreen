var now = new Date();
var day = Math.floor(now/8.64e7);

var container12 = document.createElement("p");
container12.id = "quote-text";
document.scripts[document.scripts.length - 1].parentNode.appendChild(container12);

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = process;
xhr.open("GET", "/quotes.txt", true);
xhr.send();

function process()
{
  if (xhr.readyState == 4) {
    var resp = xhr.responseText.split("\n");
    
    console.log("Current day: " + day + " % " + resp.length + " = " + day%resp.length)
    container12.innerHTML = resp[day%resp.length];

    var dayMonth = now.getDate() + "/" + (now.getMonth()+1);
    console.log("Current date: " + dayMonth);

    switch (dayMonth) {
        case "4/4":
            container12.innerHTML = "May the fourth be with you!";
            break;
        case "7/4":
            container12.innerHTML = "Grattis Maja!";
            break;
        case "24/12":
            container12.innerHTML = "God jul!";
            break;
        case "1/1":
            container12.innerHTML = "Gott nytt år!";
            break;
        case "14/3":
            container12.innerHTML = "3,14159265358979...";
            break;
        case "23/11":
            container12.innerHTML = "0 1 1 2 3 5 8 13 21 34...";
            break;
    }
  }
}