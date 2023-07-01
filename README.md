# Unspoken Thoughts Blog API

## TRELLO:

https://trello.com/b/D76U8Yo2/unspoken-thoughts-blog

## INSTALLATION:

1. Clone the GitHub repository to your local machine using the following command:

git clone https://github.com/MissElysea/Blog-API.git

2. Naviagte to the project's root directory.

cd Blog-API

3. Install the required dependencies by running the following command:

npm install dotenv mongoose express jsonwebtoken bcrypt morgan

## GLOBAL INSTALLATION:

1. Node.js: Install Node.js from the official website (https://nodejs.org). Follow the installation instructions for your operating system.

## CONFIGURATION:

Before running the app, you need to set up the required configuration files.

1. Create a .env file in the root directory of the project.

2. Open the .env file and add the following:

MONGO_URI=(your-mongodb-uri)
<br>
SECRET=(your-secret-key)

Replace (your-mongodb-uri) with the MongoDB connection string for your local or remote database.

Replace (your-secret-key) with a secret key for JWT token generation.

## START THE APP IN DEVELOPMENT MODE

1. In the project's root directory run the following command:

npm run dev

The app will start running, and you will see a message indicating the server is listening on a specific port (e.g., The server is listening on port 3000!).

## MAKING API REQUESTS USING POSTMAN

1. Open Postman on your local machine.
2. Set the request method (POST, GET, PUT, DELETE) and enter the request URL.
3. For routes that require authentication, go to the authorization tab, change the type to Bearer Token, and paste the token.
4. Configure the request body, providing the required paramters and values.
5. Send the request and observe the response from the server.