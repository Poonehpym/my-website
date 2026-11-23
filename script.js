let button = document.getElementById("helloBtn");
let message = document.getElementById("message");

button.addEventListener("click", function () {
    message.textContent = "Salam! Thanks for visiting 🌸";
    console.log("Button was clicked!");
});