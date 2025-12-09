async function handleAddMovie(event){ // 
    // read all the inputs
    const defaultImageUrl = "https://cdn.vectorstock.com/i/500p/33/47/no-photo-available-icon-vector-40343347.jpg"; // default image URL when the user does not provide one
    
    const imageUrl = document.getElementById("movieIMG").value; 
    const title = document.getElementById("movieTitle").value;
    const status = document.getElementById("status").value;
    const rating = document.getElementById("rating").value;
    const date = document.getElementById("date").value;

    const username = localStorage.getItem("username");
    if (!username) {
        alert("No user is logged in. Please log in again.");
        window.location.href = "/public/html/loginPage.html";
        return;
    }

    //Making sure required inputs are in
    if (!title || !status){
        alert("Please fill out the required field: Title and Status.");
        return;
    }

    //what will be sent to backend 
    const movieData = {
        username: username,
        imageUrl: imageUrl,
        title: title,
        status: status,
        rating: rating,
        date: date
    };

    try{
        const response = await fetch("/api/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movieData)
        });
        const data = await response.json();

        if (response.ok){
            window.location.href = "/public/html/confirmPage.html";
        }else{
            alert(data.message || "Failed to add movie.");
        }
    } catch(error){
        console.error(error);
        alert("Could not connect to the server.");
    }
}
