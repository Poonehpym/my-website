let button = document.getElementById("calcBtn");
let result = document.getElementById("result");

button.addEventListener("click", function () {
    let bill = Number(document.getElementById("bill").value);
    let service = Number(document.getElementById("service").value);
    let people = Number(document.getElementById("people").value);

    if (bill <= 0 || people <= 0) {
        result.textContent = "Please enter a bill and at least 1 person.";
        return;
    }

    let total = bill + (bill * service / 100);
    let perPerson = Math.round(total / people);

    result.textContent = "Each person pays: " + perPerson.toLocaleString() + " Toman";
});