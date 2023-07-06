<p align="center">
<img src="images/Unspoken_Thoughts_Blog.png" alt="logo">
</p>

## TRELLO:

https://trello.com/b/D76U8Yo2/unspoken-thoughts-blog

## GLOBAL INSTALLATION:

1. Node.js: Install Node.js by visiting the official website at https://nodejs.org. Follow the provided installation instructions that are specific to your operating system.

2. VSCode: Download VSCode from the official website at https://code.visualstudio.com. Follow the installation instructions provided for your operating system to complete the installation.

3. MongoDB: Create a MongoDB account by visiting the official website at https://account.mongodb.com/account/register?signedOut=true.

4. Postman: Download Postman from the official website at https://www.postman.com. Follow the installation instructions provided for your operating system to install Postman.

## INSTALLATION:

1. Create a new directory on your local machine and navigate to that directory using the following commands:

```mkdir directory-example```
<br>
```cd directory-example```

2. Clone the GitHub repository to your local machine using the following command:

```git clone https://github.com/MissElysea/Blog-API.git```

3. Open Visual Studio Code (VSCode) by running the following command:

```code .```

4. In the VSCode editor, open the integrated terminal. Then, install the necessary dependencies by running the following command:

```npm install```

## CONFIGURATION:

Before running the app, you need to set up the required configuration files.

1. Create a file named .env in the root directory of the project by running the following command in the integrated terminal.

```touch .env```

2. Open the .env file and add the following information:

```
MONGO_URI=(your-mongodb-uri)
SECRET=(your-secret-key)
```

Replace (your-mongodb-uri) with the MongoDB connection string specific to your local or remote database.

For (your-secret-key), generate a secret JWT token generation. You can use an online SHA256 hashing tool, such as the one available at (https://emn178.github.io/online-tools/sha256.html), to generate the secret key.

<p align="center">
<img src="images/Screenshot%202023-07-06%20at%2010.31.58%20AM.png">
</p>

## START THE APP IN DEVELOPMENT MODE

1. In the integrated terminal run the following command:

```npm run dev```

The app will start running, and you will see a message indicating the server is listening on a specific port and that the MongoDB database is connected. 

```
The server is listening on port 3000!
MongoDB is connected!
```

## MAKING API REQUESTS USING POSTMAN

### HOW TO CREATE A USER

To make the request, set the method to "POST" and use the URL "http://localhost:3000/user". In the body tab, select the "Raw" option and choose JSON format. Then, add the necessary information to match the user mongoose schema.

<p align="center">
<img src="images/Screenshot%202023-07-06%20at%208.14.20%20AM.png">
</p>
<p align="center">
<img src="images/Screenshot%202023-07-06%20at%208.18.25%20AM.png">
</p>

### HOW TO LOGIN A USER 

To make the request, change the method to "POST" and use the URL "http://localhost:3000/user/login". Copy the token and the user ID for updating the user's information. The same user ID will also be used for creating an article.

<p align="center">
<img src="images/Screenshot%202023-07-06%20at%208.23.53%20AM.png">
</p>

### HOW TO UPDATE A USER AND USE A TOKEN FOR AUTHORIZATION

To make the request, change the method to "PUT" and use the URL "http://localhost:3000/user/[id]". Replace "[id]" in the URL with the specific user ID you want to update.

To include the token for authentication, go to the "Auth" tab in Postman. Under the "Type" dropdown, select "Bearer Token". Then, paste the token you obtained from the server into the designated field.

<p align="center">
<img src="images/Screenshot%202023-07-06%20at%208.31.56%20AM.png">
</p>
<p align="center">
<img src="images/Screenshot%202023-07-06%20at%208.33.00%20AM.png">
</p>

### HOW TO CREATE AN ARTICLE 

To make the request, change the method to "POST" and use the URL "http://localhost:3000/article". Then, add the necessary information to match the article mongoose schema.

<p align="center">
<img src="images/Screenshot%202023-07-06%20at%208.44.52%20AM.png">
</p>

Copy the article id for finding, updating, and deleting an article.

### HOW TO FIND AN ARTICLE

To make the request, change the method to "GET" and use the URL "http://localhost:3000/article/[id]". Replace "[id]" in the URL with the specific article ID you want to find.

<p align="center">
<img src="images/Screenshot%202023-07-06%20at%208.50.40%20AM.png">
</p>

### HOW TO UPDATE AN ARTICLE

To make the request, change the method to "PUT" and use the URL "http://localhost:3000/article/[id]". Replace "[id]" in the URL with the specific article ID you want to update.

<p align="center">
<img src="images/Screenshot%202023-07-06%20at%209.03.45%20AM.png">
</p>

### HOW TO DELETE AN ARTICLE

To make the request, change the method to "DELETE" and use the URL "http://localhost:3000/article/[id]". Replace "[id]" in the URL with the specific article ID you want to delete.

<p align="center">
<img src="images/Screenshot%202023-07-06%20at%209.06.21%20AM.png">
</p>

### HOW TO DELETE A USER

To make the request, change the method to "DELETE" and use the URL "http://localhost:3000/article/[id]". Replace "[id]" in the URL with the specific user ID you want to delete.

<p align="center">
<img src="images/Screenshot%202023-07-06%20at%209.09.50%20AM.png">
</p>

## RUNNING TESTS

1. Ensure that you have completed the installation and configuration steps mentioned above.
2. In the root directory, run the following command:
```npm run test```
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
