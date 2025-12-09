async function handleLogIn(event){
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const loginData = {username: username, password: password}

    // Sending login data to backend to check whether it exists
    try{
        const response = await fetch("/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData),
        });
        const data = await response.json();
        if (response.ok){
            // Login was successful so redirect to movie list page
            // storing the username
            localStorage.setItem("username", username);
            window.location.href = "/public/html/index.html";
        } else{
            // Backend says login failed
            document.getElementById("loginError").innerText = "Invalid username or password.";
        }
    } catch (error){
        console.error()
        document.getElementById("loginError").innerText = `could not connect`;
    }

}