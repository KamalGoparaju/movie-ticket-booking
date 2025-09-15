// Get movie info from URL
const params = new URLSearchParams(window.location.search);
const movieName = params.get("movie") || "Unknown Movie";
const movieDate = params.get("date") || "Unknown Date";
const movieTime = params.get("time") || "Unknown Time";

// Show movie info
document.getElementById("movieTitle").innerText = movieName;
document.getElementById("movieDate").innerText = movieDate;
document.getElementById("movieTime").innerText = movieTime;

// Seat grid configuration
const rows = 10; // Rows A-J
const cols = 10; // Seats 1-10 per row
let selectedSeats = [];

// Load bookings from localStorage
let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

// Get booked seats for this movie (with date & time)
let bookedSeats = bookings
  .filter(b => b.movie === movieName && b.date === movieDate && b.time === movieTime)
  .flatMap(b => b.seats);

const seatGrid = document.getElementById("seatGrid");

// Generate seats layout
function generateSeats() {
  seatGrid.innerHTML = "";

  for (let r = 0; r < rows; r++) {
    const rowLabel = String.fromCharCode(65 + r); // A-J
    for (let c = 1; c <= cols; c++) {
      const seatNum = rowLabel + c;
      const seat = document.createElement("div");
      seat.classList.add("seat");

      // Check if seat is booked
      if (bookedSeats.includes(seatNum)) {
        seat.classList.add("booked");
      } else {
        seat.classList.add("available");
        seat.onclick = () => toggleSeat(seat, seatNum);
      }

      seat.innerText = seatNum;
      seatGrid.appendChild(seat);
    }
  }

  updateBookingInfo();
}

// Toggle seat selection
function toggleSeat(seat, seatNum) {
  if (seat.classList.contains("selected")) {
    seat.classList.remove("selected");
    seat.classList.add("available");
    selectedSeats = selectedSeats.filter(s => s !== seatNum);
  } else {
    seat.classList.remove("available");
    seat.classList.add("selected");
    selectedSeats.push(seatNum);
  }
  updateBookingInfo();
}

// Update selected seats count and price
function updateBookingInfo() {
  document.getElementById("totalSeats").innerText = selectedSeats.length;
  document.getElementById("totalPrice").innerText = selectedSeats.length * 150;
}

// Confirm booking
function checkout() {
  if (selectedSeats.length === 0) return alert("Select at least one seat!");

  const bookingId = "BMS" + Math.floor(Math.random() * 1000000);
  const newBooking = {
    movie: movieName,
    date: movieDate,
    time: movieTime,
    seats: selectedSeats,
    bookingId,
    totalPrice: selectedSeats.length * 150
  };

  bookings.push(newBooking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  // Mark seats as booked for this movie
  bookedSeats.push(...selectedSeats);

  // Show Virtual Ticket
  document.getElementById("ticketId").innerText = bookingId;
  document.getElementById("ticketMovie").innerText = movieName;
  document.getElementById("ticketDate").innerText = movieDate;
  document.getElementById("ticketTime").innerText = movieTime;
  document.getElementById("ticketSeats").innerText = selectedSeats.join(", ");
  document.getElementById("ticketPrice").innerText = newBooking.totalPrice;
  document.getElementById("ticketOverlay").style.display = "flex";

  // Reset selected seats
  selectedSeats = [];
  generateSeats();
}

// Close ticket popup
function closeTicket() {
  document.getElementById("ticketOverlay").style.display = "none";
}

// Reset bookings for this movie (with date & time)
function resetSeats() {
  bookings = bookings.filter(b => !(b.movie === movieName && b.date === movieDate && b.time === movieTime));
  localStorage.setItem("bookings", JSON.stringify(bookings));
  bookedSeats = [];
  selectedSeats = [];
  generateSeats();
}

// Initial render
generateSeats();
