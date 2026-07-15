# 🎯 Smart Attendance System

A full-stack attendance management platform built with **Node.js**, **Express**, **PostgreSQL**, and **vanilla JavaScript** — designed to replace manual roll-call with a fast, reliable, database-backed workflow.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 🚀 Why This Project

I built this to solve a real problem — tracking attendance for up to 60 students without spreadsheets or paper sheets — and to demonstrate that I can independently ship a complete full-stack application: schema design, REST API, and a responsive UI, all working together end to end.

**What this project shows about how I work:**
- I design and normalize a **relational database schema** from scratch, not just consume one.
- I write **REST APIs** with idempotent, duplicate-safe operations (UPSERT-based writes).
- I build UI **without leaning on frameworks**, which means I understand the DOM, async data flow, and state management at the fundamental level.
- I document and structure projects the way a production codebase should be structured.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Engineering Highlights](#-engineering-highlights)
- [Roadmap](#-roadmap)
- [About Me](#-about-me)

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **Live Dashboard** | Interactive table view of real-time attendance status |
| ✅ **One-Click Marking** | Checkbox-based present/absent toggling per student |
| 👥 **Student Management** | Full CRUD for up to 60 student records |
| 💾 **Persistent Storage** | PostgreSQL-backed, survives restarts and scales beyond memory limits |
| 🔄 **Bulk Save** | Batch updates via a single API call instead of N round-trips |
| 🔒 **Data Integrity** | UPSERT queries eliminate duplicate-record bugs |
| 📱 **Responsive UI** | Works cleanly across desktop and mobile viewports |

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JS | No framework overhead; demonstrates core JS fluency |
| **Backend** | Node.js + Express | Lightweight, industry-standard REST framework |
| **Database** | PostgreSQL | Relational integrity for structured attendance data |
| **Middleware** | body-parser, cors | Clean request handling, cross-origin support |

---

## 🏗️ Architecture

```
┌──────────────────────┐        REST (JSON)        ┌───────────────────────┐
│    Frontend (SPA)     │ ────────────────────────► │   Backend (Node.js)   │
│  index.html / list.html│ ◄──────────────────────── │   Express REST API    │
│  script.js / list.js   │      GET/POST /data       └───────────┬───────────┘
└──────────────────────┘                                       │
                                                          SQL (pg driver)
                                                                 │
                                                       ┌─────────▼─────────┐
                                                       │   PostgreSQL DB    │
                                                       │  (students table)  │
                                                       └────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v14+
- PostgreSQL v12+
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ironer201/Smart_Attendence_system.git
cd Smart_Attendence_system

# 2. Install dependencies
npm install
```

### Configure the database

Update the PostgreSQL connection in `server.js`:

```javascript
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432
});
```

### Run it

```bash
node server.js
```

Then open:

```
http://localhost:3000
```

---

## 📡 API Reference

| Method | Endpoint | Description | Body |
|---|---|---|---|
| `GET` | `/` | Serves the main attendance page | — |
| `GET` | `/data` | Returns all student records | — |
| `POST` | `/data` | Saves/updates attendance in bulk | `[{id, name, status}]` |

**Example**

```json
POST /data
[
  { "id": 1, "name": "John Doe", "status": true },
  { "id": 2, "name": "Jane Smith", "status": false }
]

→ "Data saved successfully"
```

---

## 📁 Project Structure

```
Smart_Attendence_system/
├── index.html          # Main attendance dashboard
├── list.html           # Student list management page
├── script.js            # Attendance page logic
├── list.js               # Student CRUD logic
├── style.css             # Dashboard styling
├── list.css               # List page styling
├── server.js              # Express server + PostgreSQL layer
├── package.json
└── package-lock.json
```

---

## 💡 Engineering Highlights

- **Database design** — normalized schema, primary-key-driven UPSERTs to guarantee no duplicate attendance entries.
- **API design** — bulk-write endpoint reduces client-server round trips from O(n) to O(1) per save.
- **Error handling** — graceful failure paths on both client fetch calls and server-side query execution.
- **Zero framework frontend** — every DOM update, event binding, and async fetch is hand-written, showing fundamentals rather than framework dependency.

---

## 🔮 Roadmap

- [ ] Date-wise attendance history and trends
- [ ] Analytics dashboard with attendance charts
- [ ] Authentication for admin-only access
- [ ] CSV export of records
- [ ] Search and filter by student/date
- [ ] Automated test suite (Jest/Supertest)
- [ ] Docker Compose for one-command local setup
---

<div align="center">

⭐ **If this project caught your interest, a star helps a lot — and I'd love to talk.**

</div>
