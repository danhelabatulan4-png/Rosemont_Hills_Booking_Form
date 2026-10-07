const form = document.getElementById("bookingForm");

const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");

const message = document.getElementById("message");


// Prevent selecting past dates
const today = new Date().toISOString().split("T")[0];

checkIn.min = today;
checkOut.min = today;


// Make sure check-out is after check-in
checkIn.addEventListener("change", function () {

  if (checkIn.value) {

    checkOut.min = checkIn.value;

    if (checkOut.value <= checkIn.value) {
      checkOut.value = "";
    }

  }

});


// Form submission
form.addEventListener("submit", function(event) {

  event.preventDefault();

  if (!form.checkValidity()) {

    message.textContent =
      "Please complete all required fields.";

    message.className = "error";

    return;
  }


  if (checkOut.value <= checkIn.value) {

    message.textContent =
      "Check-out date must be after the check-in date.";

    message.className = "error";

    return;
  }


  message.textContent =
  "Booking submitted successfully! Your reservation details have been received.";

message.className = "success";

form.reset();
});
