# Printable Worksheet Generator

This project is a printable worksheet generator developed using React for the frontend, Node.js for the backend, and MySQL for the database. It allows users to create customized worksheets for various subjects and topics.

## Features

- **Customizable Worksheets**: Users can create worksheets by selecting subjects, topics, and specifying the number of questions.
- **User Authentication**: Secure user authentication system to ensure privacy and data security.
- **Printable PDFs**: Generated worksheets can be downloaded as printable PDF files.
- **Responsive Design**: The application is designed to be responsive, ensuring a seamless experience across devices.

## Technologies Used

- **React**: Frontend development and user interface.
- **Node.js**: Backend server and API development.
- **MySQL**: Database management and storage of worksheet data.
- **Express.js**: Web application framework for Node.js used to build RESTful APIs.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/gitrexdev/printable-worksheets.git
   ```

2. Navigate to the project directory:
   ```
   cd rintable-worksheets
   ```

3. Install dependencies for the frontend and backend:
   ```
   npm install
   ```

4. Set up the MySQL database:
   - Create a MySQL database and configure the connection in `backend/config/db.config.js`.
   - Run the SQL scripts provided in `backend/database` to create the necessary tables.

5. Start the backend server:
   ```
   cd backend
   npm start
   ```

6. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000` to access the application.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.