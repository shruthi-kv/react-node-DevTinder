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

# Deployment
- Set-up on aws
- Launch an instance
- create a key-value pair
- change the permisions
- chmod 400 <secret>.pem
- connected to the machine using SSH
- ssh -i "matchify-secret.pem" ubuntu@ec2-13-51-64-223.eu-north-1.compute.amazonaws.com
- install node version 22.17.1 
- git clone

- Frontend
    - npm i -> installs the dependencies
    - npm run build -> creates dist folder
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code from dist(build files) to nginx http server(/var/www/html) with below command
    - sudo scp -r dist/* /var/www/html
    - Enable port :80 of your instance
- Backend
    - allowed EC2 instance public IP on mongodb server
    - installed pm2 -> npm install pm2 -g 
    - start the process -> pm2 start npm -- start
    - pm2 logs          -> to check the logs
    - pm2 flush <name>  -> to clear logs    
    - pm2 list          -> to get the list of processes
    - pm2 stop <name>   -> to stop the process
    - pm2 delete <name> -> to delete the process


- BackEnd : http://13.51.64.223:3000/feed
- FrontEnd : http://13.51.64.223

- sudo nano /etc/nginx/sites-available/default -> get the config file to edit this
- add server and location
- server_name 13.51.64.223;
- location /api/ {
                 proxy_pass http://localhost:3000/;
                 proxy_http_version 1.1;
                 proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                 proxy_set_header Host $host;
                 proxy_cache_bypass $http_upgrade;
                }
- sudo systemctl restart nginx ->  restart the nginx
- Modify the BASE_URL in the FE repo to /api
    

- Coverage
    npm test -- --coverage