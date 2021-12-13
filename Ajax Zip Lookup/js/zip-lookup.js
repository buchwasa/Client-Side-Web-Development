'use strict';

function queryZip(event) {
    let xml = new XMLHttpRequest();
    let zip = event.target.value;
    xml.onreadystatechange = function() {
        if (xml.readyState == 4) {
		    if ((xml.status >= 200 && xml.status < 300) || (xml.status == 304)) {
                let parsedData = JSON.parse(xml.responseText);
                let firstPlace = parsedData["places"][0];
                let city = firstPlace["place name"];
                let state = firstPlace["state"];

                document.getElementById("city").value = city;
                document.getElementById("state").value = state;
            }
        }
    }

    xml.open("GET", `http://api.zippopotam.us/us/${zip}`);
    xml.send();
}

function init() {
    'use strict';
    document.getElementById('zip').onchange = queryZip;
}

window.onload = init;