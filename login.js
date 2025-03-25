document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "Noor Mohammad" && password === "1234") {
        localStorage.setItem("user", username); // Save user session
        window.location.href = "index.html"; // Redirect to homepage
    } else {
        alert("Invalid username or password!");
    }
});
