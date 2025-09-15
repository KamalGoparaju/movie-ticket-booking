// Sample movies
const movies = [
  { title: "Avengers: Endgame", genre: "Action", img: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg" },
  { title: "The Hangover", genre: "Comedy", img: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg" },
  { title: "Interstellar", genre: "Sci-Fi", img: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg" },
  { title: "The Pursuit of Happyness", genre: "Drama", img: "https://m.media-amazon.com/images/I/71sVWS7WllL._AC_SY679_.jpg" }
];

// Load movies dynamically
function loadMovies() {
  const movieList = document.getElementById("movieList");
  movieList.innerHTML = "";

  movies.forEach(m => {
    const div = document.createElement("div");
    div.className = "movie-card";
    div.innerHTML = `
      <img src="${m.img}" alt="${m.title}" />
      <h3>${m.title}</h3>
      <p>${m.genre}</p>
      <button onclick='bookMovie("${m.title}")'>Book Now</button>
    `;
    movieList.appendChild(div);
  });
}

// Booking redirect
function bookMovie(title) {
  localStorage.setItem("selectedMovie", title);
  window.location.href = "seats.html";
}

// Reset bookings
function resetBookings() {
  localStorage.removeItem("bookings");
  alert("All bookings have been reset!");
  window.location.reload();
}

// Load movies on page load
document.addEventListener("DOMContentLoaded", loadMovies);
