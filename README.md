# Renewcast case study
This is a full-stack project where the backend is built with Django Ninja and the frontend is a React application using Recharts for data visualization. React app is being created using Vite. It is in development mode, not ready for production.

### Prerequisites
Before running the project locally, make sure you have the following installed:
+ Python 3.x
+ Node.js and npm (or Yarn)

## Run the project locally (dev mode)
### Backend
#### 1. Set up a virtual environment
Create and activate a virtual environment:

`python3 -m venv venv`

On macOS/Linux: `source venv/bin/activate`

On Windows: `venv\Scripts\activate`

#### 2. Install backend dependencies
With the virtual environment activated, install the required backend dependencies:

`pip install -r backend/requirements.txt`

#### 3. Apply database migrations
```
cd backend
python manage.py migrate
```

#### 4. Run the Django backend server
To start the backend server, run the following command:
`python manage.py runserver`

The backend server should now be running at http://127.0.0.1:8000/.


### Frontend
#### 1. Install dependencies on the frontend directory
```
cd frontend
npm install
```

#### 2. Start the React development server
`npm run dev`

The frontend should now be running at [http://localhost:5173/](http://localhost:5173/).