const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=4037db5c`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
    let searchTerm = (movieSearchBox.value).trim();
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if (movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=4037db5c`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}

window.addEventListener('click', (event) => {
    if (event.target.className != "form-control") {
        searchList.classList.add('hide-search-list');
    }
});


async function displayMovies() {
    const moviesContainer = document.getElementById('show-movie');
    moviesContainer.innerHTML = ''; // Clear any existing content

    try {
        // Directly fetch movie list using a predefined search term
        const searchTerm = 'batman'; // Replace 'example' with your desired search term
        const response = await fetch(`https://omdbapi.com/?s=${searchTerm}&page=1&apikey=4037db5c`);
        const data = await response.json();

        // Check if movies are found
        if (data.Response === "True") {
            // Fetch movie details in parallel
            const movieDetailsPromises = data.Search.map(movie =>
                fetch(`https://omdbapi.com/?i=${movie.imdbID}&apikey=4037db5c`).then(res => res.json())
            );

            const moviesDetails = await Promise.all(movieDetailsPromises);

            // Generate HTML content
            const moviesHTML = moviesDetails.map(movieDetails => {
                const moviePoster = (movieDetails.Poster !== "N/A") ? movieDetails.Poster : "image_not_found.png";
                return `
                    <div class="fixcontainer">
                        <div class="movie-image">
                            <img src="${moviePoster}" alt="${movieDetails.Title}">
                        </div>
                        <div class="movie-details">
                            <h3>${movieDetails.Title}</h3>
                            <p>${movieDetails.Year}</p>
                        </div>
                    </div>
                `;
            }).join('');

            // Update the DOM once
            moviesContainer.innerHTML = moviesHTML;
        } else {
            moviesContainer.innerHTML = '<p>No movies found</p>';
        }
    } catch (error) {
        console.error('Error fetching movie data:', error);
        moviesContainer.innerHTML = '<p>An error occurred while fetching movie data.</p>';
    }
}

// Call the function directly
displayMovies();
