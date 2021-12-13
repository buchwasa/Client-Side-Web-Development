function count_words(evt) {
    let inputText = document.getElementById("inputText").value;
    let foundMatches = 0;
    let matches = inputText.matchAll(/\w+/g);
    for (let _ of matches) {
        foundMatches++;
    }

    document.getElementById("numberOfWords").value = foundMatches;
}

window.onload = function (evt) {
    if (document && document.getElementById) {
        document.getElementById('btnConvert').onclick = count_words;
    }
}
