# DevTinder 🚀  
A full-stack web application built with **React**, **Node.js**, **Express**, and **MongoDB**.  

---

## 📦 Tech Stack  

- **Frontend**: React, Redux, Tailwind (DaisyUI)  

- **Backend**: Node.js, Express.js, Mongoose  

- **Database**: MongoDB  

- **Authentication & Security**: bcrypt, validator  

- **Dev Tools**: Nodemon, Jest, Supertest  

---

## ⚙️ Setup & Installation  

- Clone the Repo

  git clone https://github.com/your-username/react-node-DevTinder.git

  cd react-node-DevTinder

- Install Dependencies

  cd backend

  npm install express mongoose bcrypt validator cors

  npm install --save-dev nodemon jest supertest mongodb-memory-server

- Authentication

  POST /api/auth/signup → Register a new user

  POST /api/auth/login → Login

- Users

  GET /api/users → Fetch all users

  GET /api/users/:id → Fetch a single user

  PATCH /api/users/:id → Update user profile


- Connection Requests

  POST /api/requests/send/:status/:id → Send request (ignored/interested)

  GET /api/requests → Fetch all requests


- Feed

  GET /api/feed → Get recommended users

- Testing & Coverage

  npm test -- --coverage

  Coverage report available in:coverage/lcov-report/index.html


- logs

  - Install deps

      npm install winston winston-cloudwatch dotenv

      npm install on-finished

  - Add environment variables

  - create the logger
  
  - log HTTP requests