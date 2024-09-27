# Multiplayer Grid Application
### This project is a multiplayer web application where players can select and update a block with a Unicode character on a shared 10x10 grid. The grid updates in real-time for all players connected. The application also shows the number of players online and includes a history of grid updates.

Follow these steps to set up and run the project locally.

1. Clone the repository
```
git clone https://github.com/yourusername/multiplayer-grid-app.git
cd gamitar
```
2. Install dependencies
Backend
Navigate to the backend directory and install the required packages:

```
cd backend
npm install
```

Frontend
Navigate to the frontend directory and install the required packages:

```
cd ../frontend
npm install
```

4. Run the backend
   
```
cd backend
nodemon server.js
```

The backend should now be running at http://localhost:8080.

6. Run the frontend
In a new terminal, start the React frontend:

```
cd frontend
npm start
```

The frontend will be served at http://localhost:3000.

6. Open the application
Open your browser and go to http://localhost:3000 to view the app.
