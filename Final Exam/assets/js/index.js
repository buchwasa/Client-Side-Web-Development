let coin = "None";
let color = "#00000";

function query(path, parameters, callback) {
    let xml = new XMLHttpRequest();
    xml.open("POST", `https://api.livecoinwatch.com${path}`);
    xml.setRequestHeader("x-api-key", "11414008-fa92-436f-81dd-28c5fb1a525f");
    xml.setRequestHeader("content-type", "application/json")
    xml.onreadystatechange = function () {
        if (xml.readyState == 4) {
            if ((xml.status >= 200 && xml.status < 300) || (xml.status == 304)) {
                let parsedData = JSON.parse(xml.responseText);
                callback(parsedData);
            }
        }
    }

    xml.send(parameters);
}

function generateOptions() {
    query("/coins/list", JSON.stringify({
        "currency": "USD",
        "sort": "rank",
        "order": "ascending",
        "offset": 0,
        "limit": 100,
        "meta": false
    }), function (parsedData) {
        let names = [];
        for (let code of parsedData) {
            names.push(code["code"]);
        }

        names.sort();

        $("#search").prepend("<datalist id='crypto'>");
        for (let crypto of names) {
            $("#crypto").prepend(`<option value='${crypto}'>`);
        }
    });
}

function showDetails() {
    let cryptoSearch = $("#crypto-search").val().toUpperCase();
    if (cryptoSearch.length == 0) {
        return false;
    }

    $("#chart").remove();
    $(".container").prepend("<canvas id='chart'></chart>");
    query("/coins/single", JSON.stringify({
        "currency": "USD",
        "code": cryptoSearch,
        "meta": true
    }), function (parsedData) {
        color = parsedData["color"];
        coin = cryptoSearch;
        $("#crypto-info").removeAttr("hidden");
        $("#full-name").text("Name: " + parsedData["name"]);
        $("#current-price").text("Current Price: $" + parsedData["rate"].toFixed(2));
        $("#high").text("All Time High: $" + parsedData["allTimeHighUSD"].toFixed(2));
    });

    return false;
}

function showChart() {
    $(".container").removeAttr("hidden");
    let date = Date.now();
    let oneMonth = new Date();
    oneMonth.setMonth(oneMonth.getMonth() - 1);

    query("/coins/single/history", JSON.stringify({
        "currency": "USD",
        "code": coin,
        "start": oneMonth.getTime(),
        "end": date
    }), function (parsedData) {
        dates = [];
        rates = [];
        for (let info of parsedData["history"]) {
            rates.push(info["rate"]);
            dates.push(new Date(info["date"]).toDateString());
        }

        new Chart($("#chart"), {
            type: 'line',
            data: {
                labels: dates, //Even though this is hidden, it still has to be populated
                datasets: [{
                    label: 'Price History (1 Month)',
                    data: rates,
                    borderColor: color
                }]
            },
            options: {
                scales: {
                    x: {
                        display: false
                    }
                }
            }
        });
    });
}

$(document).ready(function () {
    generateOptions();
    $("#search-button").click(showDetails);
    $("#price-history").click(showChart);
});