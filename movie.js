const API_KEY = "f61ec75499e39b406421c1391a3db0e2"; 

// Get movie ID from URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

async function getMovieDetails(movieId) {
    if (!movieId) {
        document.getElementById("movieDetails").innerHTML = "<p class='text-center'>No movie selected.</p>";
        return;
    }

    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const movie = await response.json();

        displayMovieDetails(movie);
    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
}

function displayMovieDetails(movie) {
    let poster = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
        : "https://via.placeholder.com/500x750";

    document.getElementById("movieDetails").innerHTML = `
        <div class="card bg-dark text-white">
            <img src="${poster}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
                <h3 class="card-title">${movie.title}</h3>
                <p><strong>⭐ Rating:</strong> ${movie.vote_average.toFixed(1)}</p>
                <p><strong>🗓 Release Date:</strong> ${movie.release_date}</p>
                <p>${movie.overview}</p>
            </div>
        </div>
    `;

    document.getElementById("addToWatchlist").addEventListener("click", function() {
        addMovieToWatchlist(movie);
    });
}

function addMovieToWatchlist(movie) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (!watchlist.some(m => m.id === movie.id)) {
        watchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert(`${movie.title} added to Watchlist!`);
    } else {
        alert(`${movie.title} is already in your Watchlist.`);
    }
}

// Back Button Functionality
document.getElementById("backBtn").addEventListener("click", function() {
    let lastSearchQuery = localStorage.getItem("lastSearchQuery");
    if (lastSearchQuery) {
        window.location.href = `index.html?search=${encodeURIComponent(lastSearchQuery)}`;
    } else {
        window.location.href = "index.html";
    }
});

// Fetch and display movie details on page load
getMovieDetails(movieId);
