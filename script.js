const form = document.getElementById("bookingForm");
const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");
const message = document.getElementById("message");

// Prevent selecting past dates
const today = new Date().toISOString().split("T")[0];

checkIn.min = today;
checkOut.min = today;

// Make check-out date follow the check-in date
checkIn.addEventListener("change", function () {
    checkOut.min = checkIn.value;

    if (checkOut.value && checkOut.value <= checkIn.value) {
        checkOut.value = "";
    }
});

// Form validation
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const requiredFields = form.querySelectorAll("[required]");
    let valid = true;

    requiredFields.forEach(function (field) {
        field.classList.remove("error-input");

        if (!field.value.trim()) {
            field.classList.add("error-input");
            valid = false;
        }
    });

    // Check-out must be after check-in
    if (
        checkIn.value &&
        checkOut.value &&
        checkOut.value <= checkIn.value
    ) {
        checkOut.classList.add("error-input");
        valid = false;
    }

    if (!valid) {
        message.textContent =
            "Please complete all required fields and check your dates.";
        message.className = "error";
        return;
    }

    message.textContent =
        "Booking details submitted successfully! We will check availability.";
    message.className = "success";

    form.reset();

    checkIn.min = today;
    checkOut.min = today;
});
