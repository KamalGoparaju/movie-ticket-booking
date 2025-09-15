// seats.js

// Generate seats dynamically (100 seats = 10 rows × 10 seats)
function generateSeats() {
  const seatsContainer = document.getElementById("seatsContainer");
  seatsContainer.innerHTML = ""; // clear if already present

  const rows = 10;   // A–J
  const cols = 10;   // 1–10

  for (let i = 0; i < rows; i++) {
    const rowLetter = String.fromCharCode(65 + i); // A, B, C...

    for (let j = 1; j <= cols; j++) {
      const seat = document.createElement("div");
      seat.classList.add("seat");
      seat.textContent = rowLetter + j;
      seat.onclick = () => toggleSeat(seat);
      seatsContainer.appendChild(seat);
    }
  }
}

// Toggle seat selection
function toggleSeat(seat) {
  if (seat.classList.contains("booked")) {
    alert("This seat is already booked!");
    return;
  }
  seat.classList.toggle("selected");
}

// Confirm booking
function confirmSeats() {
  const selectedSeats = document.querySelectorAll(".seat.selected");
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat!");
    return;
  }

  selectedSeats.forEach(seat => {
    seat.classList.remove("selected");
    seat.classList.add("booked");
  });

  alert("Your seats have been booked!");
}

// Reset bookings
function resetBookings() {
  const bookedSeats = document.querySelectorAll(".seat.booked");
  bookedSeats.forEach(seat => {
    seat.classList.remove("booked");
  });
  alert("All bookings have been reset!");
}

// Run on page load
window.onload = generateSeats;
