async function handleSignUp(event){
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check whether the passwords match
    if (password !== confirmPassword) {
        document.getElementById("passwordError").innerText = "Passwords do not match.";
        return;
    }

    // Data to send to backend
    const signupData = {username: username, password: password };
    try{
        const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupData)
        });

        const data = await response.json();

        if (response.ok){
            localStorage.setItem("username", username);
            window.location.href = "/public/html/index.html";
        }else{
            alert(data.message || "Sign up failed.")
        }
    }catch (error){
        console.error(error);
        alert("Could not connect to server.")
    }
}