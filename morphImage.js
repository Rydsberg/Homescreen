var banan = atob("a2V5PUFJemFTeUR0ZV9FejJoa2VDNGRFdl9CMVcwMVlPakRNNHMxTHJTaw==");

var yuzu = "https://www.googleapis.com/drive/v3/files?q=%2716rkDmklBF9qAcJ3JfMILY1gvP9qW93Lc%27%20in%20parents&" + banan;

var morphImage = document.createElement("img");
morphImage.id = "morph-image";
document.scripts[document.scripts.length - 1].parentNode.appendChild(morphImage);



function process() {
    if (xhr_img.readyState == 4) {
        var json_resp = JSON.parse(xhr_img.responseText);
        console.log(json_resp);

        var date = new Date();


        for (var i = 0; i < json_resp.files.length; i++) {
            var file = json_resp.files[i];

            day = file.name.split(".")[0];

            if (date.getDate() + "" == day) {
                morphImage.src = "https://drive.google.com/thumbnail?id=" + file.id + "&sz=w1280";
            }
        }
        // https://drive.google.com/thumbnail?id=1an4ITGebvWDY31qeG71mCGwwm3IGCVvU&sz=w1280
        // console.log("Current day: " + day + " % " + resp.length + " = " + day%resp.length)
        // morphImage.src = resp[day%resp.length];
    }
}

var xhr_img = new XMLHttpRequest();
xhr_img.onreadystatechange = process;
xhr_img.open("GET", yuzu, true);
xhr_img.send();
