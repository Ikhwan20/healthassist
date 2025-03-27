// Register Form Submission
document.querySelector('#registerForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const name = document.querySelector('#name').value;
    const username = document.querySelector('#username').value;
    const gender = document.querySelector('#gender').value;
    const email = document.querySelector('#email').value;
    const birthday = document.querySelector('#birthday').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;
    const phoneNumber = document.querySelector('#phoneNumber').value;

    // Password confirmation check
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const formData = { name, username, gender, email, birthday, password, phoneNumber };

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Registration successful! Please log in.');
            window.location.href = 'login.html';
        } else {
            const errorMsg = await response.text();
            alert(`Registration failed: ${errorMsg}`);
        }
    } catch (error) {
        console.error('Error registering user:', error);
        alert('An error occurred. Please try again later.');
    }
});

// Login Form Submission
document.querySelector('#loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            // Redirect based on user type
            const data = await response.json(); // Assuming backend sends JSON with user type
            if (data.userType === 'admin') {
                window.location.href = '/admin/dashboard.html';
            } else {
                window.location.href = '/appointments.html';
            }
        } else {
            const errorMsg = await response.text();
            alert(`Login failed: ${errorMsg}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
    }
});
