(function checkAndSetAuthButton() {
    const authButtonContainer = document.getElementById("auth-button-container");
  
    if (!authButtonContainer) {
      console.error("Auth button container not found.");
      return; // Exit if container isn't loaded
    }
  
    const token = localStorage.getItem("authToken");
    console.log("Token:", token);
  
    if (token) {
      authButtonContainer.innerHTML = `
        <a href="/login.html">Logout</a>
      `;
      console.log("Logout button set.");
  
      document.getElementById("logoutButton").addEventListener("click", async () => {
        console.log("Logout button clicked.");
        localStorage.removeItem("authToken"); // Remove token from client storage
        console.log("Logged out successfully.");
        window.location.href = "/login.html"; // Redirect to the login page
      });
    } else {
      authButtonContainer.innerHTML = `
        <a href="/login.html">Login</a>
      `;
      console.log("Login button set.");
    }
  })();
  