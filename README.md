# LoanLink – Microloan Request & Approval Tracker System

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Contributors
- **Admin Email:** admin1@gmail.com  
- **Admin Password:** Admin1  
- **Manager Email:** manager@gmail.com  
- **Manager Password:** Manager

## Project Overview
LoanLink is a **web-based microloan request, review, and approval management system**.  
It helps **small financial organizations, NGOs, and microloan providers** manage loan applications, approvals, EMI schedules, and repayments in one streamlined system.

This project was created for **Assignment 11 (B12-A11_category-22)** as part of a technical evaluation.

---

## Live Demo
🌐 [Live Site Link](https://lonelink1.netlify.app/)

---

## Key Features

### Public Features
- Modern landing page with **smooth animations**.
- Display of **available loans** dynamically from MongoDB.
- **Loan Details** page with apply option.
- **Authentication** with Email/Password & Google.
- **Responsive UI** for mobile, tablet, and desktop.
- **Theme toggling** (Dark/Light mode).

### Borrower Dashboard
- View **My Loans** and status.
- Apply for new loans.
- Pay **Application Fee** via Stripe.
- Update profile and logout.

### Manager Dashboard
- Add, manage, and update loans.
- View **pending and approved loan applications**.
- Search and filter loans.

### Admin Dashboard
- Manage all users (update roles, suspend accounts with reason).
- Approve or reject loan applications.
- Control which loans appear on Home page.
- Full system overview with tables and stats.

### Additional Features
- Loading spinners during API calls.
- Toast notifications for all CRUD actions.
- 404 page for invalid routes.
- JWT / Firebase authentication for private routes.
- Pagination for large datasets.
- Reusable components and modals.
- Stripe payment info modal for paid loans.

---

## Tech Stack

**Client:** React.js, Tailwind CSS, Framer Motion, Axios, Firebase Authentication, React Router v6  
**Server:** Node.js, Express.js, MongoDB, Mongoose, JWT, Stripe API  

**Tools & Resources:** VS Code, Postman, Git & GitHub, Clipchamp (project explanation video)

---

## Installation & Setup

### Clone Repository
```bash
# Clone client repository
git clone https://github.com/username/loanlink-client.git

# Clone server repository
git clone https://github.com/username/loanlink-server.git
