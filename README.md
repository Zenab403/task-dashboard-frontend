# Task Dashboard Frontend

This is the React frontend for the MERN Task Dashboard project.  
It provides a user interface to manage tasks and connects to the backend APIs.

---

## 📂 Project Structure
task-dashboard-frontend/
│── public/          # Static assets
│── src/
│   │── components/  # Reusable UI components
│   │── pages/       # Page-level views
│   │── App.js       # Main app component
│   │── index.js     # React entry point
│── package.json     # Dependencies and scripts


---

## 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Zenab403/task-dashboard-frontend.git
   cd task-dashboard-frontend

2. Install dependencies:
   npm install

3. Start the development server:
   npm start
Open http://localhost:3000 in your browser.

## 🔗 Integration with Backend
The frontend communicates with the backend (task-dsahboard) via REST APIs.

Update the backend API URL in src/config.js (or wherever you store constants).

Example:

javascript
export const API_URL = "http://localhost:5000/api";

## 🌐 Deployment
Frontend deployed on Netlify

Connected to backend deployed on Render

## ✨ Features
Task list display with Material‑UI components

Add, edit, delete tasks

Responsive design for desktop and mobile
