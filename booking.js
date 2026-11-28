const services = [
    { name: "ناخن", price: 500000 },
    { name: "براشینگ", price: 350000 },
    { name: "رنگ و لایت", price: 1500000 },
    { name: "میکاپ", price: 800000 },
    { name: "کراتین مو", price: 2000000 },
    { name: "شینیون", price: 700000 }
];

const serviceList = document.getElementById("serviceList");
const timeList = document.getElementById("timeList");
const bookingForm = document.getElementById("bookingForm");
const customerName = document.getElementById("customerName");
const phoneNumber = document.getElementById("phoneNumber");
const bookingError = document.getElementById("bookingError");
const bookingSuccess = document.getElementById("bookingSuccess");

let selectedService = "";
let selectedTime = "";

services.forEach(function (service) {
    const label = document.createElement("label");
    label.className = "service-option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "service";
    radio.value = service.name;

    const text = document.createTextNode(
        service.name + " - " + service.price.toLocaleString("fa-IR") + " تومان"
    );

    radio.addEventListener("change", function () {
        selectedService = radio.value;
        bookingError.textContent = "";
        bookingSuccess.textContent = "";
    });

    label.appendChild(radio);
    label.appendChild(text);
    serviceList.appendChild(label);
});

for (let hour = 10; hour <= 17; hour++) {
    [0, 30].forEach(function (minutes) {
        const time = String(hour).padStart(2, "0") + ":" +
            String(minutes).padStart(2, "0");
        const button = document.createElement("button");
        button.type = "button";
        button.className = "time-btn";
        button.dataset.time = time;
        button.textContent = time.replace(/\d/g, function (digit) {
            return "۰۱۲۳۴۵۶۷۸۹"[digit];
        });

        button.addEventListener("click", function () {
            selectedTime = time;
            document.querySelectorAll(".time-btn").forEach(function (timeBtn) {
                timeBtn.classList.remove("selected");
            });
            button.classList.add("selected");
            bookingError.textContent = "";
            bookingSuccess.textContent = "";
        });

        timeList.appendChild(button);
    });
}

bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    bookingError.textContent = "";
    bookingSuccess.textContent = "";

    if (!selectedService) {
        bookingError.textContent = "لطفاً یک خدمت را انتخاب کنید.";
        return;
    }

    if (!selectedTime) {
        bookingError.textContent = "لطفاً یک ساعت را انتخاب کنید.";
        return;
    }

    const name = customerName.value.trim();
    if (!name) {
        bookingError.textContent = "لطفاً نام خود را وارد کنید.";
        return;
    }

    const englishPhone = phoneNumber.value
        .replace(/[۰-۹]/g, function (digit) {
            return String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit));
        })
        .replace(/[٠-٩]/g, function (digit) {
            return String("٠١٢٣٤٥٦٧٨٩".indexOf(digit));
        });

    if (!/^09\d{9}$/.test(englishPhone)) {
        bookingError.textContent =
            "شماره تلفن باید ۱۱ رقم باشد و با 09 شروع شود.";
        return;
    }

    const bookedButton = Array.from(document.querySelectorAll(".time-btn"))
        .find(function (button) {
            return button.dataset.time === selectedTime;
        });

    if (bookedButton) {
        bookedButton.disabled = true;
        bookedButton.classList.remove("selected");
        bookedButton.classList.add("booked");
    }

    bookingSuccess.textContent =
        "رزرو شما با موفقیت انجام شد - " +
        name + "، " + selectedService + "، ساعت " +
        selectedTime.replace(/\d/g, function (digit) {
            return "۰۱۲۳۴۵۶۷۸۹"[digit];
        });

    bookingForm.reset();
    phoneNumber.value = "";
    selectedService = "";
    selectedTime = "";
});
