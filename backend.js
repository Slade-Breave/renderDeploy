const express =require('express');
const fs = require('fs');
const app = express();

let globalPhoneNumber;

// Function to search for a specific value given by the user
function searchForValue(searchKey, searchValue) {
    return new Promise((resolve, reject) => {
        fs.readFile('users.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                reject(err); // Reject the promise if there's an error
                return;
            }

            try {
                // Parse the JSON data
                const jsonData = JSON.parse(data);
                // Find the item with the matching search key and value
                const foundItem = jsonData.find(item => item[searchKey] === searchValue);
                if (foundItem) {
                    console.log('Item found:');
                    console.log('First Name:', foundItem.firstName);
                    console.log('Phone Number:', foundItem.phoneNumber);
                    globalPhoneNumber = foundItem.phoneNumber; // Assign globalPhoneNumber value
                    resolve(globalPhoneNumber); // Resolve the promise with globalPhoneNumber
                } else {
                    console.log('Item not found');
                    resolve(null); // Resolve the promise with null if item not found
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
                reject(error); // Reject the promise if there's an error while parsing JSON
            }
        });
    });
}


fs.readFile('users.json', 'utf8', (err, data) => {

let searchName;

    app.post('/sendSearchName', (req, res) => {
            let body = '';  
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const stringValue = body; 
                
                try {
                    const parsedBody = JSON.parse(stringValue);
                    searchName = parsedBody.value.toString();
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            });
        
        res.send('Button click received by server');
    });
// FETCH REQUEST FOR SEARCH NAME ALREADY HANDLED
// SEARCH NAME IS A GLOBAL SCOPE VARIABLE




import('node-fetch')
    .then(({ default: fetch }) => {
        // Prices
        const counterPrice = {
            Chapati: 20,
            Ugali: 40,
            Mukimo: 70,
            Rice: 50,
            Pilau: 80,
            Ndengu: 50,
            Beans: 60,
            Fish: 200,
            Chuma: 10,
        };

        // Serve the HTML file
        app.get('/', (req, res) => {
            res.sendFile('chafua.html', { root: __dirname });
        });

        // Handle chapoClick button click
        app.post('/chapoClick', (req, res) => {
            console.log('Chapo button clicked');
            res.send('Button click received by server');
        });

        // Handle ugaliClick button click
        app.post('/ugaliClick', (req, res) => {
            console.log('Ugali button clicked');
            res.send('Button click received by server');
        });

        // Handle sending chapati value from webpage
        app.post('/sendChapatiValue', (req, res) => {

            let searchValue = searchName;            
            const searchKey = 'firstName';          
            searchForValue(searchKey, searchValue)

            .then(phoneNumber => {          // Access phoneNumber outside the function           

            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const parsedBody = JSON.parse(body);
                const chapoValue = parseFloat(parsedBody.value);
                console.log('Chapati value received from webpage:', chapoValue);
                res.send('Value received by server');
                const amount = chapoValue * counterPrice.Chapati;
                console.log('Amount:', amount);

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer iGKIxu0CP8oifxT9u3UgOF9owTII'
                };

                fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        "BusinessShortCode": 174379,
                        "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwMjA2MjMxMjAy",
                        "Timestamp": "20240206231202",
                        "TransactionType": "CustomerPayBillOnline",
                        "Amount": amount,
                        "PartyA": globalPhoneNumber,
                        "PartyB": 174379,
                        "PhoneNumber": globalPhoneNumber,
                        "CallBackURL": "https://mydomain.com/path",
                        "AccountReference": "CompanyXLTD",
                        "TransactionDesc": "Payment of X"
                    })
                })
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log(error));
            });
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
    
        });

        // Handle sending chapoNdengu value from webpage
        app.post('/sendChapoNdenguValue', (req, res) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const parsedBody = JSON.parse(body);
                const chapoNdenguValue = parseFloat(parsedBody.value);
                console.log('Chapo Ndengu value received from webpage:', chapoNdenguValue);
                res.send('Value received by server');
                const amount = (chapoNdenguValue * counterPrice.Chapati) + counterPrice.Ndengu;
                console.log('Amount to be paid:', amount);

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer mI3rY6CnMIp0HKo1vax8AlGWzq4G'
                };

                fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        "BusinessShortCode": 174379,
                        "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwMjA2MjMxMjAy",
                        "Timestamp": "20240206231202",
                        "TransactionType": "CustomerPayBillOnline",
                        "Amount": amount,
                        "PartyA": 254742975950,
                        "PartyB": 174379,
                        "PhoneNumber": 254742975950,
                        "CallBackURL": "https://mydomain.com/path",
                        "AccountReference": "Chafua",
                        "TransactionDesc": "Payment of X"
                    })
                })
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log(error));
            });
        });

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
    })
    .catch(error => {
        console.error('Error importing node-fetch:', error);
    });
});
