# Employee Agreement Management System

## Project Overview
The **Employee Agreement Management System** is a web application built using React that allows businesses to manage employee agreements. The application enables users to view, create, and delete employee agreements, all while storing employee data globally using React Context API.

## Key Features
- **View Employee Agreements**: Display details of employee agreements.
- **Create Employee Agreements**: Add new employee agreements by providing necessary details.
- **Delete Employee Agreements**: Remove agreements with a simple confirmation step.
- **Global State Management**: Uses React Context API to manage and share employee data across components.
- **Responsive UI**: Built with React Bootstrap for a clean and responsive user interface.

## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **React Router**: Routing library for handling navigation between pages.
- **React Bootstrap**: Provides Bootstrap components for styling.
- **JSON Server**: Mock REST API used to simulate a backend and store employee data.
- **Jest & React Testing Library**: For testing components and application logic.
  
## Installation Instructions

### Prerequisites
You need to have **Node.js** installed on your system. You can download and install it from [nodejs.org](https://nodejs.org/).

### Steps to Install and Run the Application
1. **Clone the repository**
    ```bash
    git clone https://github.com/SUJENDRANJ/GTS-CaseStudy.git
    ```

2. **Navigate to the project directory**
    ```bash
    cd GTS-CaseStudy
    ```

3. **Install dependencies**
    Run the following command to install all the required dependencies.
    ```bash
    npm install
    ```

4. **Run the application**
    To start the application, run the following:
    ```bash
    npm start
    ```
    The application will run on `http://localhost:3000`.

5. **Run the mock API server**
    To start the mock API server (using JSON Server), run the following:
    ```bash
    npm run server
    ```
    The API will run on `http://localhost:3000/employee` for CRUD operations on employee data.

6. **Run tests**
    To run the tests for the project, run:
    ```bash
    npm test
    ```

## Application Structure

- **`src/components/`**: Contains the main UI components like `Dashboard`, `CreateAgreement`, `ViewAgreement`, and `Header`.
- **`src/contexts/`**: Contains the context for global state management (`Context.js`), which manages employee data.
- **`src/_tests_/`**: Contains test files for the components and context.
- **`server/data.json`**: Mock data for the API, stored in JSON format.

## Application Flow

1. **Dashboard**: Displays a list of employee agreements. It fetches employee data from the mock API.
2. **Create Agreement**: A form to add a new employee agreement, including fields for employee name, department, position, and agreement date.
3. **View Agreement**: Displays details of a specific employee's agreement. Users can also delete the agreement from this view.

## Testing
The application uses **Jest** and **React Testing Library** for unit and integration testing.

### Test Coverage
- **Component Tests**: Tests for each UI component (like Header, Dashboard, etc.) are written to check if they render correctly and display appropriate content.
- **Context Tests**: Ensures that employee data is correctly fetched and passed through the context to other components.
- **Form Validation**: Ensures the required fields in the `CreateAgreement` form are validated before submission.

### Run Tests
To run the tests, simply use the following command:
```bash
npm test
