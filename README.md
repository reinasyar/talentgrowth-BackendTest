# Technical Documentation

---

<aside>
📜 <strong>Table of Contents</strong>

- [**Introduction**](#Introduction)
    - [About BlogPost App](#about-blogpost-app)
- [**Configuration**](#Configuration)
    - [Instruction](#instruction)
- [**API Documentation**](#api-documentation)
    - [Endpoints](#endpoints)
</aside>

# **Introduction**

Welcome to our BlogPost App's technical documentaion. This application is a secure RESTful application built with Node.js, Express.JS, and MySQL. It allows user to register, log in and perform CRUD (Create, Read, Update and Delete) operations on blog posts. The API supports user authentication via JWT, raccess to post manipulation and includes error handling with centralized middleware.

## **About** BlogPost App

This application is designed as a backend service for a blogging platform, offering the following key features:
- **User Authentication**
    Secure registration and login using hashed passwords and JWT-based token verification.
- **Create & Manage Blog Posts**
    Authenticated users can create, edit and soft-delete posts. Ownership is verified to prevent unauthorized actions.
- **Pagination Support**
    Efficient data retrieval through GET /posts?page=X&limit=Y, with metadata including total count and page numbers.
- **Validation & Error Handling**
    Input is validated using express-validator, and all errors are caught via a centralized errorHandlerMiddleware.
- **Soft Deletion**
    Posts are not permanently removed but flagged (flag = 0) to preserve data integrity.

## 

---

# Configuration

Configuring this application is an essential step to ensure it operates smoothly. In this section, the steps to configure the application will be explained.

## Instruction
1. **Clone the Repository**
    ```bash
    git clone https://github.com/reinasyar/talentgrowth-BackendTest.git
    ```
    Clone the repostirory and move to folder
2. **Install Depedencies**
    ```bash
    npm install
    ```
3. **Set Up Environment Variables**
    create a .env file in the root directory and add these following variables:
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=your_mysql_username
    DB_PASSWORD=your_mysql_password
    DB_NAME=your_database_name
    JWT_SECRET=your_secret_key
    ```
    Make sure to replace the values with your actual database credentials and a secure JWT secret key.
4. **Configure MySQL Database**
    - Create a database in MySQL
        ```sql
        CREATE DATABASE your_database_name;
        ```
    - Run the schema
        ```sql
        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            flag INT DEFAULT 1,
            deleted_at DATETIME
        );
        CREATE TABLE posts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            author VARCHAR(100),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            edited_at DATETIME,
            deleted_at DATETIME,
            flag INT DEFAULT 1,
            num_edit INT DEFAULT 0,
            user_id INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        ```
5. **Run the Server**
    ```bash
    node app.js
    ```

---

# API Documentation

This documentation contains list of endpoints available in this application. This API is made using **Node.JS** and **Express.JS**. The endpoints in this application enable processes such as:

- Create new user
- Get user's profile
- Get posts
- Create, edit and delete post

### Endpoints

Available API endpoints in this application include:

1. **POST /posts** : Creates a new post. Requires a token in the header and a request body containing `title`, `content` and `author`.
    - For example, if the request meets all the requirements, the API will respond with a success message: 
        ![Create Post Succeeded](additional%20info/photos/p-Create%20Post%20OK.jpg)
    - If there is no token provided or the request body is null then the API will respond with an error message:
        ![Create Post Failed because there is no token](additional%20info/photos/p-CreatePostFailToken.jpg)
        ![Create Post Failed due to input validation](additional%20info/photos/p-CreatePostFailRequired.jpg)

2. **GET /posts?page=2&limit=3** : Retrieves paginated posts. Supports `limit` to define the number of posts per page and `page` to specify which page to retrieve.
    - For example, if user want to retrieve page 2 with limit per page is 3, then the API will respond:
        ![Get Posts Pagination Succeeded](additional%20info/photos/p-GetPostsPagination.jpg)

3. **GET /posts:id** : Retrieve specific post with `id` as a URL parameter.
    - For example, if user want to get a specific post with id 2, the API will respond:
        ![Get Post with ID Succeeded](additional%20info/photos/p-GetPostIDOK.jpg)
    - If there is no post available with the id, then the API will respond with an error message:
        ![Get Post with ID Failed because there is no post with id 1](additional%20info/photos/p-GetPostIDFailnotfound.jpg)

4. **PUT /:id** : Edit a specific post with `id` as a URL parameter. Requires a token in the header and a request body containing `title`, `content` and `author`.
    - For example, if user want to edit a post, the API will respond:
        ![Edit Post with ID Succeeded](additional%20info/photos/p-UpdatePostOK.jpg)

5. **DELETE /profile** : Retrieve specific post with `id` as a URL parameter. Requires a token in the request header.
    - For example, if user want to delete a post, the API will respond:
        ![Delete Post with ID Succeeded](additional%20info/photos/p-DeletePostOK.jpg)
    - If there is no token provided or the post is not posted by user, the API will respond:
        ![Delete Post with ID Failed](additional%20info/photos/p-DeletePostFailnotyourpost.jpg)

6. **GET /profile** : Retrieve the authenticated user's info. Requires a token in the request header.
    - If user want to retrieve their info. the API will respond:
       ![Get Profile Succeeded](additional%20info/photos/u-ProfileOK.jpg)
    - If there is no token provided, the API will respond:
        ![Get Profile Failed](additional%20info/photos/u-ProfileFailnotoken.jpg)
 
7. **POST /auth/register** : Register a new user. Requires a request body containing `email`, `password` and `name`.
    - If user want to register a new user and meets all the requirements. The API will respond:
        ![Create New User Succeeded](additional%20info/photos/u-CreateUserOK.jpg)
    - If there is a validation error, the API will respond:
        ![Create New User Failed](additional%20info/photos/u-CreateUserFail.jpg)

8. **POST /auth/login** : Returns an authentication token. Requires a request body containing `email` and `password`.
    - If user want to login. The API will respond:
        ![Login User Succeeded](additional%20info/photos/u-LoginGetTokenOK.jpg)
    - If there is a validation error, wrong email or wrong password the API will respond:
        ![Login User Failed](additional%20info/photos/u-LoginGetTokenFailWrongPassword.jpg)
    
---

