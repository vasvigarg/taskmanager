# Task Manager

A production-ready Task Manager backend built with Python and FastAPI.

## Features

- **User Authentication**: JWT-based registration and login with pbkdf2_sha512 password hashing.
- **Task Management**: CRUD operations for tasks with title, description, priority, and due dates.
- **Advanced Filtering**: Filter tasks by status, priority level, and date range.
- **Sorting & Pagination**: Sort tasks by creation date, due date, or priority with limit/offset pagination.
- **Soft Delete**: Tasks are marked as deleted rather than being permanently removed.
- **CORS Support**: Ready for integration with modern frontend frameworks like React or Vue.

## Tech Stack

- **Framework**: FastAPI
- **Database**: PostgreSQL (requires `psycopg2-binary`)
- **ORM**: SQLAlchemy
- **Validation**: Pydantic
- **Security**: JWT (jose), passlib (pbkdf2_sha512)

## Setup Instructions

1. **Configure Environment**:
   Create a `.env` file in the `backend` directory (vaually based on `.env.example` or the template provided) and add your PostgreSQL connection string:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/taskmanager
   ```

2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

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

Start the development server using the provided `run.py` script (defaults to port 8001):
```bash
python run.py
```
Or manually using uvicorn:
```bash
uvicorn app.main:app --reload --port 8001
```
The API will be available at `http://127.0.0.1:8001`.

## API Documentation

Once the server is running, you can access the interactive documentation:

- **Swagger UI**: [http://127.0.0.1:8001/docs](http://127.0.0.1:8001/docs)
- **ReDoc**: [http://127.0.0.1:8001/redoc](http://127.0.0.1:8001/redoc)

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
