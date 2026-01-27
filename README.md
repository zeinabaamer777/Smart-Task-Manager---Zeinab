# 📝 README.md

````md
# 🗂️ Task Management App

A simple and clean **Task Management application** built with **React, TypeScript, Redux Toolkit, and RTK Query**.  
The app allows managing tasks, assigning them to users, and browsing user details with a modern UI and clean architecture.

---

## 🚀 Features

### ✅ Tasks

- Add new task
- Edit existing task
- Delete task with confirmation modal
- Assign task to a user
- Persist tasks using `localStorage`

### 🎯 Task Filters

- Filter tasks by status:
  - All
  - Pending
  - In Progress
  - Completed
- Filter tasks by assigned user (Bonus)

### 👤 Users

- Fetch users from API using RTK Query
- Display users list (name, email, company)
- Search users by name or email
- Client-side pagination
- User details page with:
  - Back button
  - Loading & error handling

### 🎨 UI / UX

- Responsive layout using React Bootstrap
- Status badges with colors
- Confirmation modal for delete
- Clear search input (❌ icon)
- Navbar with routing layout

---

## 🛠️ Tech Stack

- **React**
- **TypeScript**
- **Redux Toolkit**
- **RTK Query**
- **React Router v6**
- **React Hook Form**
- **React Bootstrap**

---

## 🧠 Architecture & Design Decisions

- **Redux Toolkit** is used only for global state (tasks).
- **RTK Query** is used for server state (users API).
- **Pages** act as containers (logic, state, data fetching).
- **Components** are presentational and reusable.
- **Filters and UI state** are kept local (not in Redux).
- **Single source of truth** for types and constants.
- **Layouts** are used to control navbar visibility.

---

## 📁 Project Structure

```txt
src/
├─ app/
│  ├─ store.ts
│  └─ hooks.ts
├─ features/
│  ├─ tasks/
│  │  ├─ tasksSlice.ts
│  │  └─ taskTypes.ts
│  └─ users/
│     ├─ usersApi.ts
│     └─ userTypes.ts
├─ components/
│  ├─ tasks-table/
│  ├─ add-task-modal/
│  ├─ delete-task-modal/
│  ├─ users-table/
│  ├─ navbar/
│  └─ task-filters/
├─ layout/
│  └─ Layout.tsx
├─ pages/
│  ├─ TasksPage.tsx
│  ├─ UsersPage.tsx
│  └─ UserDetailsPage.tsx
├─ routes/
│  └─ AppRoutes.tsx
└─ App.tsx
```
````

---

## 🔄 Data Flow Overview

- **Tasks**
  - Stored in Redux state
  - Synced with `localStorage`

- **Users**
  - Fetched via RTK Query
  - Cached automatically

- **UI**
  - Pages handle logic and pass data to components
  - Components render UI only

---

## ▶️ Getting Started

### Install dependencies

```bash
npm install
```

### Run the app

```bash
npm run dev
```

---

## 👩‍💻 Author

Built with ❤️ by **Zeinab**
