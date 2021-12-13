const greet = () => {
    const name = document.getElementById("name");
    const salutation = document.getElementById("salutation");
    
    salutation.innerHTML = "<b>Hello</b> " + name.value;
}

document.getElementById("greet").onclick = greet;