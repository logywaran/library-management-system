# 📚 Lumina Library Management System

A professional, lightweight Library Management application built with **Spring Boot** and **Vanilla JavaScript**, designed for simplicity, speed, and real-world architectural integrity.

## ✨ Features
- **Book Management**: Add, Edit, and Delete books.
- **Backend-Driven Business Logic**: Secure borrowing and returning flow enforced via backend endpoints.
- **Category/Genre Organization**: Organize books by genres (Fiction, Science, History, etc.).
- **Smart Filtering**: Instantly filter the book list by category.
- **Professional UI**: A clean, "Classic Professional" light theme suitable for office or educational environments.

## 🏛️ Architectural Highlights
This project demonstrates several industry-standard practices:
- **Single Source of Truth**: Business rules (availability state, borrower assignment) are controlled by the backend, not the client.
- **RESTful API Design**: Dedicated resources and actions (`/borrow`, `/return`) following REST principles.
- **DTO Pattern**: Decoupling the data transfer layer from the persistence layer.
- **Global Exception Handling**: Centralized error management for meaningful client feedback.
- **Clean Code**: Zero front-end frameworks—built with lean, performance-first Vanilla JS.

## 🛠️ Tech Stack
- **Backend**: Spring Boot 3.4.1 (Java 17+)
- **Database**: H2 In-Memory (default) or MySQL (configurable)
- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6+)

## 🚀 How to Run
1.  **Prerequisites**: Java 17+ and Maven installed.
2.  **Start the Server**:
    ```bash
    mvn spring-boot:run
    ```
3.  **Access the Application**:
    Open your browser and navigate to: [http://localhost:8080](http://localhost:8080)

## 📁 Project Structure
- `src/main/java`: Backend Source Code (Controller, Service, Repository, Model, DTO, Exceptions)
- `src/main/resources/static`: Frontend Source Code
    - `index.html`: Main application entry point.
    - `css/style.css`: Modular styling.
    - `js/app.js`: Backend-integrated client logic.

---
*Developed with a focus on clean architecture and production-ready design.*

