# 📚 Lumina Library Management System

A lightweight **Library Management System** built with **Spring Boot** and **Vanilla JavaScript**, focused on backend fundamentals, clean architecture, Docker containerization, and real-world deployment.

🌐 **Live Application**  
https://library-management-system-u46t.onrender.com/

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

| Method | Endpoint              | Description               |
|------|----------------------|---------------------------|
| POST | `/books`             | Add a new book            |
| GET  | `/books`             | Fetch all books           |
| PUT  | `/books/{id}`        | Update book details       |
| PUT  | `/books/{id}/borrow` | Borrow a book             |
| PUT  | `/books/{id}/return` | Return a book             |
| DELETE | `/books/{id}`      | Delete a book             |

---

## 🛠️ Tech Stack

### Backend
- Java 17
- Spring Boot 3.x
- Spring Data JPA
- Hibernate

### Database
- **H2 In-Memory Database**
- Used for simplicity and easy deployment
- Can be switched to MySQL/PostgreSQL easily

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (ES6)

### DevOps
- Docker (multi-stage build)
- Render (Docker deployment)

---

## 🐳 Docker

- Multi-stage Docker build
- Build stage compiles the JAR using Maven
- Runtime stage runs the application using a lightweight JRE
- Backend and frontend are packaged into a single container

---

## ▶️ Running Locally

### Without Docker
```bash
mvn clean package
java -jar target/*.jar
Access: http://localhost:8080

With Docker
bash
Copy code
docker build -t library-management .
docker run -p 8080:8080 library-management
Access: http://localhost:8080

🗄️ H2 Database Console
URL: http://localhost:8080/h2-console

JDBC URL: jdbc:h2:mem:librarydb

Username: sa

Password: (empty)

Note: H2 data resets when the application restarts.

📁 Project Structure
css
Copy code
src/main/java
 ├── controller
 ├── service
 ├── repository
 ├── model
 ├── dto
 └── exception

src/main/resources
 └── static
     ├── index.html
     ├── css/
     └── js/


🔮 Future Enhancements (Optional)
Swagger / OpenAPI documentation

Authentication (JWT / Basic Auth)

PostgreSQL or MySQL integration

CI/CD with GitHub Actions

👨‍💻 Author
Logesh Waran
Aspiring Java Backend Developer
