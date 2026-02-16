# Real-Time Poll Rooms

A full-stack web application that allows users to create polls, share them via a link, and collect votes with real-time result updates.

This project was built as part of the itsmyscreen Full-Stack Assignment.

---

## 🚀 Project Overview

Real-Time Poll Rooms allows a user to:

- Create a poll with multiple options
- Generate a unique shareable link
- Allow others to vote using that link
- See vote results update instantly (without refreshing)
- Prevent duplicate or abusive voting
- Persist data even after page refresh or server restart

The focus of this project is correctness, simplicity, real-time updates, and fairness.

---

## ✨ Features

### 1. Poll Creation
- User can enter:
  - A question
  - Minimum 2 options
- Poll is saved to the database.
- A unique shareable link is generated.

---

### 2. Join by Shareable Link
- Anyone with the link can:
  - View the poll
  - Vote for one option (single choice)
- No login required (kept simple as per assignment).

---

### 3. Real-Time Result Updates
- When a user submits a vote:
  - Vote count updates in the database.
  - A Socket.io event is emitted.
  - All connected users viewing the same poll receive updated results instantly.
- No page refresh required.

---

### 4. Fairness / Anti-Abuse Mechanisms

Two independent mechanisms are implemented to reduce duplicate voting.

#### Mechanism 1: IP-Based Restriction
- The server stores the IP address of each voter for a specific poll.
- If the same IP tries to vote again on that poll, the vote is rejected.

**Prevents:** Multiple votes from the same network/device.  
**Limitation:** Can be bypassed using VPN or changing networks.

#### Mechanism 2: Device-Based Restriction (Cookie ID)
- A unique device ID is generated and stored in the browser using cookies.
- If the same device attempts to vote again on the same poll, the vote is blocked.

**Prevents:** Duplicate voting from the same browser/device.  
**Limitation:** Can be bypassed by clearing cookies or using a different browser.

---

### 5. Persistent Data Storage
- All polls and votes are stored in MongoDB.
- Refreshing the page does not remove data.
- Poll links remain valid even after server restarts.

---

## 🛠 Tech Stack

### Frontend
- React
- React Router
- Axios
- Socket.io Client

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io
- Cookie Parser
- UUID

---

## 📂 Project Structure

Poll_App/
│
├── server/ # Backend (Node + Express + MongoDB)
│ ├── src/
│ └── package.json
│
├── client/ # Frontend (React)
│ ├── src/
│ └── package.json
│
└── README.md


---

## ⚙️ Application Flow

1. User creates a poll.
2. Backend validates input.
3. Poll is saved in MongoDB.
4. A unique poll ID is generated.
5. Shareable link is created in format:
   `/poll/:id`
6. Users open the link.
7. When a user votes:
   - Vote count is updated in database.
   - IP and device ID are stored.
   - Socket.io event is emitted.
   - All connected clients receive updated results instantly.

---

## 🧪 Edge Cases Handled

- Poll must contain at least 2 options.
- Question cannot be empty.
- Empty options are not allowed.
- Invalid option index is rejected.
- Duplicate voting is blocked.
- Poll not found error handled.
- Missing vote input handled.
- Proper HTTP status codes returned.

---

## ⚠️ Known Limitations

- IP restriction can be bypassed using VPN.
- Device restriction can be bypassed by clearing cookies.
- No authentication system (kept simple as per assignment).
- No rate limiting implemented.
- No poll expiration feature.

---

## 🧪 How to Run Locally

### Backend

```bash
cd server
npm install
Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
BASE_URL=http://localhost:3000

Run:

npm start

 ### Frontend
 
cd client
npm install
npm start
App will run at:
http://localhost:3000

🌍 Live Deployment
Frontend: https://your-frontend-url.com
Backend: https://your-backend-url.com