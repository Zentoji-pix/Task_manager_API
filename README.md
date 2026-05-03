## Task Manager API

    A REST API for managing set tasks 

## Live Demo
https://task-manager-api-seven-tau.vercel.app/

## Endpoints

| Method | Endpoint | Auth Required | Request Body | Description |
|--------|----------|-------------|-------------|-------------|
|  POST  |  /auth/signup | No |{ username, email, password }| To create a user profile|
|  POST  |  /auth/login | No |{ username, password }| To login to existing user profile|
|  POST  |  /tasks | Yes |{ task, description, completed } (completed field marks false if not specified)| to create new tasks |
|  GET  |  /tasks | Yes | - | to read all existing tasks |
|  GET  |  /tasks/:id | Yes | - | to read specific tasks |
|  PATCH  |  /tasks/:id | Yes | {task , description} (at least one required) | to update specific tasks |
|  DELETE  |  /tasks/:id | Yes | - | to delete specific tasks |

## Technologies
- Node.js
- Express
- MongoDB
- Mongoose

## Dependencies
- dotenv
- jsonwebtoken
- bcrypt

## How to run locally
1. Clone the Repo
    > git clone https://github.com/Zentoji-pix/Task_manager_API.git

2. Install dependencies
    > npm install

3. Create a .env file
    Add you port, mongodb and jwt secret to
    PORT, MONGO_URI, and JWT_SECRET

4. Start server
    > npm start

## Authentication 
Requested routes require a valid JWT token in the request header: 
Authorization: Bearer <your_token>

obtain the token after login at POST /auth/login

## Sample Request
POST /tasks
Authorization: Bearer <your_token>

{
    "task": "tryout server",
    "description": "Revise authentication flow and token expiry",
    "completed": false
}
