if (!localStorage.getItem("user")) {
    window.location.href = "login.html"; // Redirect to login page if not logged in
}

const API_KEY = "f61ec75499e39b406421c1391a3db0e2";  

document.getElementById("searchBtn").addEventListener("click", function() {
    let movieTitle = document.getElementById("searchInput").value.trim();
    if (movieTitle) {
        searchMovie(movieTitle);
    }
});

async function searchMovie(title) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results.length > 0) {
            displayMovies(data.results);
        } else {
            document.getElementById("movieResults").innerHTML = "<p class='text-center'>No results found</p>";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayMovies(movies) {
  let movieResults = document.getElementById("movieResults");
  movieResults.innerHTML = "";

  let rowDiv;
  movies.forEach((movie, index) => {
      if (index % 4 === 0) {
          rowDiv = document.createElement("div");
          rowDiv.classList.add("row", "mb-4");
          movieResults.appendChild(rowDiv);
      }

      let colDiv = document.createElement("div");
      colDiv.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4"); // 4 per row on large screens, 2 per row on smaller screens

      let poster = movie.poster_path 
          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` 
          : "https://via.placeholder.com/200x300";

      colDiv.innerHTML = `
          <div class="card text-white bg-dark">
              <img src="${poster}" class="card-img-top" alt="${movie.title}">
              <div class="card-body text-center">
                  <h5 class="card-title">${movie.title}</h5>
                  <p class="card-text">⭐ ${movie.vote_average.toFixed(1)}</p>
                  <button class="btn btn-info details-btn" data-id="${movie.id}">ℹ️ More Info</button>
                  <button class="btn btn-warning add-btn">➕ Add to Watchlist</button>
              </div>
          </div>
      `;

      colDiv.querySelector(".details-btn").addEventListener("click", function() {
          localStorage.setItem("lastSearchQuery", document.getElementById("searchInput").value);
          window.location.href = `movie.html?id=${movie.id}`;
      });

      colDiv.querySelector(".add-btn").addEventListener("click", function() {
          addMovieToWatchlist(movie);
      });

      rowDiv.appendChild(colDiv);
  });
}


function addMovieToWatchlist(movie) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (!watchlist.some(m => m.id === movie.id)) {
        watchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
    displayWatchlist();
}

function displayWatchlist() {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    let watchlistContainer = document.getElementById("watchlistContainer");

    watchlistContainer.innerHTML = ""; // Clear previous content

    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = "<p class='text-center text-white'>Your watchlist is empty.</p>";
        return;
    }

    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    watchlist.forEach(movie => {
        let poster = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` 
            : "https://via.placeholder.com/200x300";

        let colDiv = document.createElement("div");
        colDiv.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4");

        colDiv.innerHTML = `
            <div class="card text-white bg-dark">
                <img src="${poster}" class="card-img-top" alt="${movie.title}">
                <div class="card-body text-center">
                    <h5 class="card-title">${movie.title}</h5>
                    <button class="btn btn-danger remove-btn" data-id="${movie.id}">Remove</button>
                </div>
            </div>
        `;

        colDiv.querySelector(".remove-btn").addEventListener("click", function() {
            removeMovieFromWatchlist(movie.id);
        });

        rowDiv.appendChild(colDiv);
    });

    watchlistContainer.appendChild(rowDiv);
}

// Function to remove movie from watchlist
function removeMovieFromWatchlist(movieId) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist = watchlist.filter(movie => movie.id !== movieId);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    displayWatchlist();
}

// Load watchlist when page opens
document.addEventListener("DOMContentLoaded", displayWatchlist);

// Function to remove movie from watchlist
function removeMovieFromWatchlist(movieId) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist = watchlist.filter(movie => movie.id !== movieId);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    displayWatchlist();
}


function removeMovieFromWatchlist(id) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist = watchlist.filter(movie => movie.id !== id);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    displayWatchlist();
}

document.addEventListener("DOMContentLoaded", displayWatchlist);
document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem("user"); // Remove user session
    window.location.href = "login.html"; // Redirect to login page
});
