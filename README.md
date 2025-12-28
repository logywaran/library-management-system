# 📚 Lumina Library Management System

A lightweight **Library Management System** built with **Spring Boot** and **Vanilla JavaScript**, focused on backend fundamentals, clean architecture, Docker containerization, and real-world deployment.

🌐 **Live Application** [https://library-management-system-u46t.onrender.com/](https://library-management-system-u46t.onrender.com/)

---

## 🚀 Overview

This project demonstrates how a backend-focused Spring Boot application can be:
- Designed with clean layered architecture
- Secured by backend-driven business logic
- Containerized using Docker
- Deployed as a live service

The goal of this project is **learning backend engineering practices**, not UI frameworks.

---

## ✨ Features

### 📖 Book Management
- Add new books
- Edit existing books
- Delete books

### 🔁 Borrowing System
- Borrow books with backend validation
- Return borrowed books
- Prevent multiple borrowers for the same book

### 🗂️ Organization
- Categorize books (Fiction, Science, History, etc.)
- Search books by title or author
- Filter books by category

### 🎨 UI
- Clean and professional interface
- Built using **Vanilla JavaScript**
- No frontend frameworks

---

## 🏗️ Architecture & Design

### Key Principles
- **Backend as Single Source of Truth**
- **RESTful API Design**
- **Separation of Concerns**

### Layered Structure

- **Controller** – Handles HTTP requests and responses
- **Service** – Contains all business logic
- **Repository** – Database access using Spring Data JPA
- **DTO** – Separates API contracts from entities
- **Exception** – Centralized error handling using `@ControllerAdvice`

---

## 🔌 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/books` | Add a new book |
| **GET** | `/books` | Fetch all books |
| **PUT** | `/books/{id}` | Update book details |
| **PUT** | `/books/{id}/borrow` | Borrow a book |
| **PUT** | `/books/{id}/return` | Return a book |
| **DELETE** | `/books/{id}` | Delete a book |

---

## 🛠️ Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.x**
- **Spring Data JPA**
- **Hibernate**

### Database
- **H2 In-Memory Database** (Default)
- Can be switched to MySQL/PostgreSQL easily

### Frontend
- HTML5, CSS3
- Vanilla JavaScript (ES6)

### DevOps
- **Docker** (multi-stage build)
- **Render** (deployment platform)

---

## 🐳 Docker

This project uses a **multi-stage Docker build**:
1. **Build stage**: Compiles the source code into a JAR using Maven.
2. **Runtime stage**: Runs the application using a lightweight JRE.
3. Both backend and frontend assets are packaged into a single container for easy deployment.

---

## ▶️ Running Locally

💻 Option 1: Without Docker
Ensure you have Java 17 and Maven installed on your machine.

Build the project: mvn clean package

Run the JAR file: java -jar target/*.jar

Access the application at: http://localhost:8080

🐳 Option 2: With Docker
If you have Docker installed, you can run the entire setup with two commands:

Build the image: docker build -t library-management .

Run the container: docker run -p 8080:8080 library-management

Access the application at: http://localhost:8080

---

## 🗄️ H2 Database Console
The application uses an in-memory database for development. You can view the data while the app is running:

Console URL: http://localhost:8080/h2-console

JDBC URL: jdbc:h2:mem:librarydb

Username: sa

Password: (leave blank)

Note: Because this is an In-Memory database, all data (books and borrowing records) will be deleted whenever the application or Docker container stops.

---


     
## 🔮 Future Enhancements

[ ] Swagger / OpenAPI documentation for testing

[ ] Security layer using JWT or Basic Auth

[ ] Integration with a persistent database like PostgreSQL

[ ] Automated CI/CD pipelines using GitHub Actions

---

## 👨‍💻 Author
Logesh Waran Aspiring Java Backend Developer
