document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("jwt"); // Assume the JWT is stored in localStorage
  
    if (!token) {
      alert("You are not logged in!");
      window.location.href = "login.html";
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/api/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const appointment = await response.json();
  
        document.getElementById("appointment-details").innerHTML = `
          <p><strong>${appointment.title}</strong></p>
          <p>${appointment.date}</p>
          <p>${appointment.time}</p>
        `;
      } else {
        document.getElementById("appointment-details").innerText = "No appointment found.";
      }
    } catch (error) {
      console.error("Error fetching appointment:", error);
    }
  });
  