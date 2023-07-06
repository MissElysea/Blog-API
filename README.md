<p align="center">
<img src="images/Unspoken_Thoughts_Blog.png" alt="logo">
</p>

## TRELLO:

https://trello.com/b/D76U8Yo2/unspoken-thoughts-blog

## INSTALLATION:

1. Clone the GitHub repository to your local machine using the following command:

```git clone https://github.com/MissElysea/Blog-API.git```

2. Naviagte to the project's root directory.

cd Blog-API

3. Install the required dependencies by running the following command:

```npm install```

## GLOBAL INSTALLATION:

1. Node.js: Install Node.js from the official website (https://nodejs.org). Follow the installation instructions for your operating system.

## CONFIGURATION:

Before running the app, you need to set up the required configuration files.

1. Create a .env file in the root directory of the project.

2. Open the .env file and add the following:

```
MONGO_URI=(your-mongodb-uri)
SECRET=(your-secret-key)
```

Replace (your-mongodb-uri) with the MongoDB connection string for your local or remote database.

Replace (your-secret-key) with a secret key for JWT token generation.

## START THE APP IN DEVELOPMENT MODE

1. In the project's root directory run the following command:

```npm run dev```

The app will start running, and you will see a message indicating the server is listening on a specific port (e.g., The server is listening on port 3000!).

## MAKING API REQUESTS USING POSTMAN

1. Open Postman on your local machine.
2. Set the request method (POST, GET, PUT, DELETE) and enter the request URL.
3. For routes that require authentication, go to the authorization tab, change the type to Bearer Token, and paste the token.
4. Configure the request body, providing the required paramters and values.
5. Send the request and observe the response from the server.

## RUNNING TESTS

1. Ensure that you have completed the installation and configuration steps mentioned above.
2. In the root directory, run the following command:
npm test
3. The tests will be executed, and the results will be displayed in the console.

## STARTING THE APP WITHOUT DEVELOPMENT MODE

1. In the project's root directory, create a JavaScript file (i.e., start.js).
2. Open the start.js file and add the following code:

```require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', () => console.log('MongoDB is connected!'));
```

3. Save the start.js file.
4. Open the terminal and navigate to the project's root directory.
5. Run the following command to start the app:

```node start.js```

6. The app will start running, and you will see a message showing that the server is listening on a specific port (i.e., 'The server is listening on port 3000!').
