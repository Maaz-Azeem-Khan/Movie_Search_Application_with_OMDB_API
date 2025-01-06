document.getElementById('searchButton').addEventListener('click', function() {
    const movieTitle = document.getElementById('movieTitle').value;
    if (!movieTitle) {
        alert('Please enter a movie title');
        return;
    }

    const apiKey = 'de122a60'; 
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}`;


    document.getElementById('movieResults').innerHTML = '';
    document.getElementById('errorMessage').innerHTML = '';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'False') {
                document.getElementById('errorMessage').innerHTML = 'No movies found';
            } else {
                fetchMovieDetails(data.Search);
            }
        })
        .catch(error => {
            document.getElementById('errorMessage').innerHTML = 'Error fetching data from OMDB API';
        });
});

function fetchMovieDetails(movies) {
    const movieResults = document.getElementById('movieResults');


    movies.forEach(movie => {
        const apiKey = 'de122a60';
        const detailUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`;

        fetch(detailUrl)
            .then(response => response.json())
            .then(details => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');

                const movieHTML = `
                    <h3>${details.Title} (${details.Year})</h3>
                    <img src="${details.Poster !== 'N/A' ? details.Poster : 'https://via.placeholder.com/150'}" alt="${details.Title}">
                    <p>${details.Plot || 'No description available'}</p>
                `;

                movieElement.innerHTML = movieHTML;
                movieResults.appendChild(movieElement);
            })
            .catch(error => {
                console.error("Error fetching movie details:", error);
                const errorElement = document.createElement('div');
                errorElement.classList.add('movie');
                errorElement.innerHTML = `<p>Could not fetch details for ${movie.Title}.</p>`;
                movieResults.appendChild(errorElement);
            });
    });
}

