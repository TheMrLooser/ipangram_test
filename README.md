May be this readme file is helpful for understanding about this task.

I created a React application with the following pages:
Signup/login page
Department creation, update, and deletion page
Employee list page
Employee details page
Filter page
I added a filter button to the filter page that allows users to filter employees by location and name in ascending and descending order. I used the backend API endpoints to filter the employees, not client-side JavaScript code.
I added a feature to the employee list page that allows managers to assign departments to employees.

I used MUI for UI. And used Yup for form validation.

Backend:

I created an Express application with the following routes:
Login/signup route
Department creation, read, update, and deletion routes
Employee creation, read, update, and deletion routes
Two filter employee routes:
One route to give employees an array according to employees' location in ascending order.
One route to give employees in ascending and descending order of their names according to the selected filter.
I implemented the logic for each of the routes, including authentication and authorization for the protected routes.

I used express-validator for validation.
Integration:

I integrated the backend API endpoints with the frontend filter button to filter the employees.
I integrated the feature for managers to assign departments to employees from the frontend to the backend.
