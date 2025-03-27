1. Install Node.js and npm
Ensure that Node.js and npm are installed on your system. You can download and install them from the Node.js official website.

2. Install Dependencies
Open a terminal or command prompt in the project directory and run:

npm install

This will install all the required dependencies listed in the package.json file.

3. Set Up the Database

Start XAMPP and ensure that the Apache and MySQL services are running.
Open phpMyAdmin in your web browser (usually accessible at http://localhost/phpmyadmin).
Create a new database named healthassist.
Import the database script:
Click on the healthassist database in phpMyAdmin.
Go to the Import tab.
Click Choose File, navigate to database/healthassist.sql, and select it.
Click Go to execute the script and set up the database schema and tables.

4. Configure the Application

If necessary, update the database connection settings in script.js to match your local configuration. Ensure the host, user, password, and database fields match your MySQL setup:

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'healthassist',
});

5. Run the Application

In the terminal, start the server by running:

node script.js

The application will start and be accessible at http://localhost:3000 in your browser.

6. Access the Application

Open your web browser and navigate to:

http://localhost:3000

7. Authentication

Register a new user by navigating to the registration page (/register.html).
Log in using your credentials to generate a JWT token.
Once logged in, you can use the app's features, such as booking appointments and viewing details.

8. Additional Notes
Dependencies:
This application uses the following notable npm packages:

express - For server-side routing.
mysql - For connecting to the MySQL database.
bcrypt - For hashing passwords securely.
jsonwebtoken - For implementing JWT-based authentication.

9. Logout Handling:
Logout functionality clears the authToken from the browser's local storage and redirects to the login page.

10. Testing the Application:
Test the application by registering users, logging in, and interacting with the features (e.g., booking appointments, viewing information). Ensure the MySQL database is running in XAMPP during testing.

If you encounter any issues, verify that:

XAMPP is running, and the database is properly set up.
The script.js server is running without errors.