# EmpERP - Employee Management System

EmpERP is a comprehensive Employee Management System built as a Mini Project for the ESD course. It facilitates the management of employees, departments, and salaries, featuring secure authentication and role-based access control.

## Features

-   **Authentication & Security**:
    -   Secure Login with JWT (JSON Web Tokens).
    -   **Google OAuth2 Integration** for seamless sign-in.
    -   Role-based access control (Admin vs. User).
    -   **Admin Approval Workflow**: New users require admin approval before accessing the system.

-   **Employee Management**:
    -   CRUD operations for Employee profiles.
    -   Photo upload capability.
    -   Filtering and searching.

-   **Department Management**:
    -   Create, update, and delete departments.
    -   Assign employees to departments.

-   **Salary Management**:
    -   Manage salary structures and payment history.

## Tech Stack

### Backend
-   **Java 17+**
-   **Spring Boot 3.x** (Web, Data JPA, Security, OAuth2 Client, Validation)
-   **MySQL** (Database)
-   **Hibernate** (ORM)
-   **Maven** (Build Tool)

### Frontend
-   **React** (TypeScript)
-   **Vite** (Build Tool)
-   **Material UI (MUI)** (Component Library)
-   **Axios** (HTTP Client)
-   **React Router** (Navigation)

## Getting Started

### Prerequisites
-   Java 17 SDK installed.
-   Node.js and npm installed.
-   MySQL Server running.

### Database Setup
1.  Create a MySQL database named `EmpERP`.
2.  The application is configured to automatically create/update tables (`ddl-auto=update`).

### Backend Setup
1.  Navigate to the project root.
2.  Configure `src/main/resources/application.properties`:
    -   Update `spring.datasource.username` and `spring.datasource.password` with your MySQL credentials.
    -   **Important**: Set your `spring.security.oauth2.client.registration.google.client-id` and `client-secret`.
3.  Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```
    The backend will start on `http://localhost:8080`.

### Frontend Setup
1.  Navigate to the `emperp-frontend` directory:
    ```bash
    cd emperp-frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173`.

## Configuration
-   **Google OAuth**: You need to create a project in the Google Cloud Console, enable the Google+ API (or People API), and create OAuth 2.0 credentials to get a Client ID and Client Secret.
-   **Images**: Employee photos are stored locally in the `images/` directory by default.

## License
This project is for academic purposes.
