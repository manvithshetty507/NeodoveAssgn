# Real-Time Chat Application

This project is a real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js). The application allows authenticated users to send and receive messages in real-time. Key features include user registration and authentication, real-time messaging, and a responsive user interface.

## Code Structure

The project is divided into two main folders: **Client** and **Server**.

### Client

The Client folder includes all the frontend code which is built on React. It contains the following pages:

1. **Register/Login Page**: Handles user registration and authentication.
2. **Chat Page**: The main interface where users can send and receive messages.

### Server

The Server folder includes all the backend code. The structure is as follows:

1. **Controller**: Contains all the logic for handling requests.
2. **Models**: Defines the schema for the database (users and chat history).
3. **Routes**: Manages the routing for the application.
4. **Middleware**: Contains the verify Token middleware for authentication.

In the `app.js` file, the server logic, database connection, and socket setup are implemented.

## Features

- **User Registration and Authentication**: Secure registration and login using JSON Web Tokens (JWT).
- **Real-Time Messaging**: Instant messaging using WebSockets.
- **Responsive Design**: User-friendly and adaptable to different screen sizes.

## Usage

### Registration

1. Open the application in your browser.
2. Click on "Sign Up".
3. Fill in the registration form and submit.

### Login

1. Open the application in your browser.
2. Click on "Login".
3. Enter your credentials and submit.

### Sending Messages

1. After logging in, navigate to the chat page.
2. Type your message in the input field.
3. Click "Send" to send your message.

## Installation

### Prerequisites

- Node.js
- MongoDB
- npm

### Steps

Clone the repository:

bash
Copy code
git clone <link of this code>
Navigate to the project directory:

bash
Copy code
cd your-repo-name
Install dependencies for both client and server:

Client:

bash
Copy code
cd client
npm install
Server:

bash
Copy code
cd server
npm install

Run the application:

Client:
npm run dev

server:
nodemon app.js

Authentication
Authentication is implemented using JSON Web Tokens (JWT). Here is a brief overview of the process:

Registration: Users register by providing a username, email, and password. The password is hashed using bcrypt before storing it in the database.
Login: Users log in by providing their email and password. The server validates the credentials and issues a JWT token if the credentials are correct.
Token Verification: The token stored in localStorage is verified to authenticate the user.
WebSocket Implementation
WebSockets are used for real-time messaging. Here is a brief overview of the process:

Connection: A WebSocket connection is established between the client and the server when the user navigates to the chat page.
Message Handling: Messages are sent from the client to the server using the WebSocket connection. The server broadcasts the message to all connected clients.
Disconnection: The server handles the disconnection of clients gracefully.
