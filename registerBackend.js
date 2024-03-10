const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

// Handle form submission
app.post('/register', (req, res) => {
    let body = '';

    // Read the form data
    req.on('data', chunk => {
        body += chunk.toString(); // Convert Buffer to string
    });

    // Process the form data
    req.on('end', () => {
        const formData = new URLSearchParams(body);
        const firstName = formData.get('firstName');
        const phoneNumber = formData.get('phoneNumber');

        // Create an object with user data
        const userData = {
            firstName,
            phoneNumber
        };

        // Store the user data in a JSON file
        const usersFilePath = path.join(__dirname, 'users.json');
        fs.readFile(usersFilePath, 'utf8', (err, data) => {
            if (err && err.code !== 'ENOENT') {
                console.error('Error reading users file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            const users = JSON.parse(data || '[]');
            users.push(userData);

            fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
                if (err) {
                    console.error('Error writing to users file:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                console.log('User registered successfully:', userData);
                res.redirect('/'); // Redirect to the original registration page
            });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
