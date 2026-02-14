# Task Manager

A production-ready Task Manager backend built with Python and FastAPI.

## Features

- **User Authentication**: JWT-based registration and login with bcrypt password hashing.
- **Task Management**: CRUD operations for tasks with title, description, priority, and due dates.
- **Advanced Filtering**: Filter tasks by status, priority level, and date range.
- **Sorting & Pagination**: Sort tasks by creation date, due date, or priority with limit/offset pagination.
- **Soft Delete**: Tasks are marked as deleted rather than being permanently removed.
- **CORS Support**: Ready for integration with modern frontend frameworks like React or Vue.

## Tech Stack

- **Framework**: FastAPI
- **Database**: SQLite
- **ORM**: SQLAlchemy
- **Validation**: Pydantic
- **Security**: JWT (jose), passlib (bcrypt)

## Setup Instructions

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Clone or download this project.
2. Navigate to the project directory:
   ```bash
   cd taskmanager
   ```
3. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the API

Start the development server:
```bash
uvicorn app.main:app --reload
```
The API will be available at `http://127.0.0.1:8000`.

## API Documentation

Once the server is running, you can access the interactive documentation:

- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

### Authentication Endpoints

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Authenticate and receive a JWT token.

### Task Endpoints (Protected)

- `GET /tasks`: Retrieve tasks for the authenticated user (supports pagination, filtering, and sorting).
- `POST /tasks`: Create a new task.
- `GET /tasks/{id}`: Get details of a specific task.
- `PUT /tasks/{id}`: Update task details.
- `PATCH /tasks/{id}/status`: Update only the task status.
- `DELETE /tasks/{id}`: Soft delete a task.

## Future Frontend Integration

This API is configured with CORS to allow requests from common frontend development ports (`localhost:3000`, `localhost:5173`).
