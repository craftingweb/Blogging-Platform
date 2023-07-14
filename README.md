# Blogging-Platform


https://github.com/VitaliPri/Blogging-Platform/assets/101225909/74e54cee-0ea7-4bd4-a222-025dc78da6e0


This repository contains the source code for a Blogging Platform built using the PERN (PostgreSQL, Express.js, React, Node.js) stack. The platform allows users to register, create posts, add comments, and perform various CRUD (Create, Read, Update, Delete) operations on posts and comments.

## Table of Contents

- [Database Setup and Relationships](#database-setup-and-relationships)
- [User Registration and Login](#user-registration-and-login)
- [User Authentication and Authorization](#user-authentication-and-authorization)
- [CRUD Operations for Posts](#crud-operations-for-posts)
- [CRUD Operations for Comments](#crud-operations-for-comments)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Database Setup and Relationships

To set up the database, follow these steps:

1. Install PostgreSQL on your system.
2. Create a new PostgreSQL database for the blogging platform.
3. Update the database credentials in the configuration file (`config/config.js`) with your PostgreSQL connection details.
4. Run the Sequelize migrations to generate the necessary tables and relationships.

## User Registration and Login

The platform provides user registration and login functionality with hashed passwords. To register and login:

1. Use the provided API endpoints to register a new user and obtain an authentication token.
2. Authenticate the user by sending the token in the request headers.
3. Use the token to create a session cookie upon successful login.

## User Authentication and Authorization

To protect routes that require authentication:

1. Implement middleware functions to validate the session cookie and ensure user authentication.
2. Apply the middleware to the appropriate routes.
3. Test the authentication and authorization flow using Postman, ensuring only authenticated users can access protected routes.

## CRUD Operations for Posts

The platform supports CRUD operations for posts. Use the provided API endpoints to:

- Create a new post
- Retrieve all posts
- Retrieve a specific post by ID
- Update a post
- Delete a post

Ensure that only authenticated users can perform these operations on posts.

## CRUD Operations for Comments

The platform supports CRUD operations for comments. Use the provided API endpoints to:

- Create a new comment
- Retrieve all comments for a specific post
- Retrieve a specific comment by ID
- Update a comment
- Delete a comment

Ensure that only authenticated users can perform these operations on comments.

## Installation

To run the Blogging Platform locally, follow these steps:

1. Clone this repository: `git clone https://github.com/VitaliPri/Blogging-Platform.git`
2. Navigate to the project directory: `cd Blogging-Platform`
3. Install the dependencies for the backend server: `cd server && npm install`
4. Install the dependencies for the frontend client: `cd ../client && npm install`
5. Configure the database connection in `server/config/config.json`
6. Run the database migrations: `cd ../server && npx sequelize-cli db:migrate`

## Usage

To start the Blogging Platform, follow these steps:

1. Start the backend server: `cd server && npm start`
2. In a separate terminal, start the frontend client: `cd ../client && npm start`
3. Open your browser and navigate to `http://localhost:4000` to access the Blogging Platform.

## API Endpoints

The API endpoints provided by the server are as follows:

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Login a user and obtain an authentication token.
- `GET /api/posts`: Retrieve all posts.
- `GET /api/posts/:id`: Retrieve a specific post by ID.
- `POST /api/posts`: Create a new post.
- `PUT /api/posts/:id`: Update a post.
- `DELETE /api/posts/:id`: Delete a post.
- `GET /api/posts/:id/comments`: Retrieve all comments for a specific post.
- `GET /api/comments/:id`: Retrieve a specific comment by ID.
- `POST /api/comments`: Create a new comment.
- `PUT /api/comments/:id`: Update a comment.
- `DELETE /api/comments/:id`: Delete a comment.

Please refer to the API documentation for more details on request and response formats.

## Testing

The platform can be tested using Postman or other API testing tools. The provided API endpoints should be used to perform various operations on users, posts, and comments. Ensure that you test the authentication and authorization flow as well.

## Contributing

Contributions to the Blogging Platform are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request. Contributions should align with the project's coding style and follow the guidelines specified in the repository.


