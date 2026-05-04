# 🏗️ Build ERP Project

A full-stack **Construction Management ERP System** designed to streamline project execution, material tracking, labour management, and communication between stakeholders.

---

## 🚀 Overview

**Build ERP** is a role-based system that helps manage construction projects efficiently by connecting **Admins, Users, and Site Managers** on a single platform.

---

## ✨ Features

### 👤 User Module

* User Signup & Login
* Create Project Proposals
* View & Track Proposal Status
* Stage-wise Payment Tracking
* Project Progress Visualization
* Real-time Chat with Site Manager

---

### 🛠️ Admin Module

* Admin Authentication
* Material Management (CRUD)
* Labour Management (CRUD)
* Site Manager Management
* Project Stage Configuration
* Project Estimation Creation
* Proposal Approval Workflow

---

### 👷 Site Manager Module

* Site Manager Login
* Labour Purchase & Allocation
* Attendance Management
* Project Execution Monitoring

---

### 📊 Dashboard

* Separate dashboards for:

  * Users
  * Admins
  * Site Managers
* Real-time project insights & updates

---

## 🧱 Core Modules

* Project Management
* Stage-wise Workflow System
* Material & Labour Management
* Specification & Estimation System
* Chat System (User ↔ Site Manager)

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Socket.IO (Real-time chat)

### Frontend

* React.js
* TypeScript
* Tailwind CSS / ShadCN UI

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/pranavkpv/buildErp.git
```

---

### 2️⃣ Backend Setup

```bash
cd build_erp_backend
npm install
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd build_erp_frontend
npm install
npm run dev
```

---

## 🌐 Environment Variables (Backend)

Create a `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
SESSION_SECRET=your_session_secret
REDIS_URL=your_redis_url
```

---

## 📌 Key Functional Flow

```text
User → Create Proposal → Admin Approval → 
Project Created → Stages Assigned → 
Site Manager Executes → Progress Updates → 
User Tracks Progress & Payment
```

---

## 🔥 Future Enhancements

* Inventory & Stock Management
* Invoice & Billing System
* Advanced Reporting & Analytics
* Mobile App Integration

---

## 🤝 Contribution

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Pranav Raj K P V**
GitHub: https://github.com/pranavkpv

---
