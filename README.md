# Movie Search App

This Movie Search App allows users to search for movies using the OMDB API and displays movie details in a user-friendly interface.

## Features

- Search Movies: Users can search for movies by typing a search term.
- Display Movie List: The app displays a list of movies matching the search term, including the movie poster and title.
  -View Movie Details: Clicking on a movie from the search list shows detailed information about the selected movie.
  -Initial Movie Display: On page load, the app displays a predefined set of movies.

## Technologies Used

HTML
CSS
JavaScript
OMDB API

## Installation

1. Clone the repository to your local machine.
2. Open the index.html file in your web browser.

## Usage

1. Type a movie name into the search box.
2. The app will display a list of movies that match the search term.
3. Click on any movie in the search list to view detailed information about that movie.
4. On page load, a predefined set of movies (e.g., "Batman") will be displayed.

## Code Overview

## HTML Elements

- movieSearchBox: The input box where users type the search term.
- searchList: The list that displays matching movies.
- resultGrid: The section where detailed movie information is displayed.
- moviesContainer: The container that displays the predefined set of movies on page load.

## CSS Styling

- Responsive: Responsive layout

## JavaScript Functions

- loadMovies(searchTerm): Fetches a list of movies matching the search term from the OMDB API.

- findMovies(): Gets the search term from the input box and calls loadMovies().
- displayMovieList(movies): Displays the list of movies returned by loadMovies().
- loadMovieDetails(): Adds click event listeners to movie list items to fetch and display detailed movie information.
- displayMovieDetails(details): Displays detailed information about a selected movie.
- displayMovies(): Fetches and displays a predefined set of movies on page load.

## Event Listeners

- window.addEventListener('click', (event)): Hides the search list when clicking outside the search box.
- movieSearchBox.addEventListener('input', findMovies): Calls findMovies() when the input value changes.

## API Call

const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=4037db5c`;
const res = await fetch(`${URL}`);
const data = await res.json();

## Future Enhancements

- Pagination: Add support for fetching and displaying additional pages of search results.
- Error Handling: Improve error handling and display user-friendly messages.
- Styling: Enhance the UI with better styling and animations.

# Acknowledgements

OMDB API for providing the movie data.
