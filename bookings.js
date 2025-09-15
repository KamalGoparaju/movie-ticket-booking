const bookingsList = document.getElementById("bookingsList");
let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

function loadBookings() {
  bookingsList.innerHTML = "";

  if (bookings.length === 0) {
    bookingsList.innerHTML = "<p>No bookings yet!</p>";
    return;
  }

  bookings.forEach((b, index) => {
    const div = document.createElement("div");
    div.classList.add("booking-card");

    div.innerHTML = `
      <h3>${b.movie}</h3>
      <p><strong>Seats:</strong> ${b.seats.join(", ")}</p>
      <p><strong>Total Price:</strong> ₹${b.totalPrice}</p>
      <p><strong>Booking ID:</strong> ${b.bookingId}</p>
      <button onclick="viewTicket('${b.bookingId}')">View Ticket</button>
      <button onclick="deleteBooking(${index})">Delete</button>
    `;

    bookingsList.appendChild(div);
  });
}

function viewTicket(bookingId) {
  window.location.href = `ticket.html?bookingId=${bookingId}`;
}

function deleteBooking(index) {
  if (confirm("Are you sure you want to delete this booking?")) {
    bookings.splice(index, 1);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    loadBookings();
  }
}

// Initial Load
loadBookings();
