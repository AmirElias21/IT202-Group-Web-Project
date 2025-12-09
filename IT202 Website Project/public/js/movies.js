function moviesPage() {
    // Change the username based on the user
    const username = localStorage.getItem("username");
    const heading = document.getElementById("indexUsername");

    if (username && heading){
        heading.textContent = `Hello ${username}`;
    }

    // the "+" will redirect to the add movie page 
    const addMovieDiv = document.querySelector(".addMovie");
    if (addMovieDiv){
        addMovieDiv.addEventListener("click", () => {
            window.location.href = "/public/html/addMovie.html"; // heads to addMovie page
            
        });
    }

    const doneButton = document.getElementById("doneButton");
    if (doneButton) {
        doneButton.addEventListener("click", () => {
            localStorage.removeItem("username");
            window.location.href = "/public/html/loginPage.html";
        });
    }

    // Load the movies from backend 
    loadMovies();
}

async function loadMovies(){
    const DEFAULT_POSTER = "https://cdn.vectorstock.com/i/500p/33/47/no-photo-available-icon-vector-40343347.jpg";
    const movieListDiv = document.getElementById("movieList");
    const username = localStorage.getItem("username");

    if (!username) { // no user logged in
        movieListDiv.textContent = "No user logged in.";
        return;
    }

    try{ // fetch movies from backend
        const response = await fetch(`/api/movies?username=${encodeURIComponent(username)}`);

        if (!response.ok){
            movieListDiv.textContent = "Failed to Load Movies.";
            return;
        }

        const movies = await response.json(); // array of movie objects for THIS user
        movieListDiv.innerHTML = "";

        movies.forEach((movie)=> { // create a card for each movie
            const card = document.createElement("div");
            card.className = "movieCard";

            const img = document.createElement("img");
            img.src = movie.imageUrl || DEFAULT_POSTER;
            img.alt = movie.title;

            const title = document.createElement("p");
            title.textContent = movie.title;

            const status = document.createElement("p");
            status.textContent = `Status: ${movie.status}`;

            const rating = document.createElement("p");
            rating.textContent = `Rating: ${movie.rating}`;

            const date = document.createElement("p");
            date.textContent = `Date: ${movie.date}`;

            // Delete Btn
            const delBtn = document.createElement("button");
            delBtn.textContent = "Delete";
            delBtn.className = "deleteButton";
            delBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                deleteMovie(movie.id);
            });

            // adding elements/data to the card
            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(status);
            card.appendChild(rating);
            card.appendChild(date);
            card.appendChild(delBtn);

            movieListDiv.appendChild(card);

        });

    } catch(error){ // handles errors
        console.error(error);
        movieListDiv.textContent = "Could not connect to server.";
    }
}

async function deleteMovie(movieId) {
    const confirmDelete = confirm("Are you sure you want to delete this movie?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(`/api/movies/${movieId}`, {
            method: "DELETE"
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            alert(data.message || "Failed to delete movie.");
            return;
        }

        // Reloads the list after deleting the movie
        loadMovies();
    } catch (error) {
        console.error(error);
        alert("Could not connect to server.");
    }
}


    
