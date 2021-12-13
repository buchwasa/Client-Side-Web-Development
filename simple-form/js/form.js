function validateForm(event) {
    let name = document.getElementById("name").value;

    console.log("validation: " + name);
    if (name.length == 0) {
        console.log("failed");
        event.preventDefault();
        return;
    }

    console.log("passed");

    return true;
}

window.onload = () => {
    document.getElementById("form").onsubmit = validateForm;
}