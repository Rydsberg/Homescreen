var filename = "text.html";

var container7 = document.createElement("p");
container7.id = "text-box";

document.scripts[document.scripts.length - 1].parentNode.appendChild(container7);

function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, true ); // false for synchronous request
    xmlHttp.send();
    xmlHttp.onreadystatechange=function() {
        if (xmlHttp.readyState==4 && xmlHttp.status==200) {
            container7.innerHTML = xmlHttp.responseText;
            // if (container7.innerHTML.length <= 1) {
            //     container7.innerHTML = '<img src="/lerumslogga.svg" width="200"></img>';
            // }
        }
        
    }
}

setTimeout(location.reload, 60000*15);
httpGet("https://raw.githubusercontent.com/Rydsberg/infoscreen-page/master/"+filename);
