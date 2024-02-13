# Menu Management System

Welcome to the Menu Management System, a comprehensive backend application designed for managing restaurant menus. This project was developed as part of a job application for Popmenu, showcasing the ability to create, manage, and dynamically interact with restaurant menus, items, and their relationships.

## Features

### Extensive Testing

All CRUD (Create, Read, Update, Delete) endpoints for `Menu`, `MenuItem`, and `Restaurant` have been rigorously tested to ensure reliability and robustness. The tests cover a wide range of scenarios, ensuring the application behaves as expected under various conditions.

### Codebase Organization

The application's structure is meticulously organized into specific folders and files for easy navigation and maintenance:

- **Controllers**: Located in the `src/controller` folder, these files contain the business logic for handling requests related to menus, menu items, and restaurants.
- **Entities**: Found in the `src/entity` folder, these files define the structure of the database tables and their relationships. The application implements simple one-to-many relationships, from `MenuItem` to `Menu`, and from `Menu` to `Restaurant`, facilitating data integrity and relational logic.
- **Endpoints**: Defined in `src/index.ts`, this file lists all the endpoints available in the application, serving as the entry point for interacting with the backend system.
- **Migration Support**: The project is designed to include a `migrations` folder, prepared for future database migrations. This structure ensures the application can evolve over time without compromising data integrity or requiring significant refactoring.

### Extensible Data Model

The data model is designed to be extensible, allowing for easy addition of new features or changes to existing structures without major overhauls.

## Improvements for Future Iterations

While the current version of the Menu Management System is fully functional and well-tested, the following improvements are suggested for future iterations:

- **Uploader as a Worker Process**: Consider moving the JSON uploader functionality to a separate worker process. This would improve performance and reliability, especially when handling large data uploads.
- **Upload Batch ID**: Adding an "uploadBatchId" to each entity could streamline the process of managing uploads. This feature would allow for easier identification and removal of data from unsuccessful uploads, enhancing data management capabilities.
- **Pre-Upload Validation**: Implementing a validation step before data upload could further ensure the integrity and consistency of the data being imported. This could help prevent common errors and ensure that only valid data is added to the system.

## Getting Started

`npm install`
`npm run test`
Tests automatically spin up an epheramial SQLite server to persist data while running tests.

###

## Conclusion

This project represents a significant effort in creating a reliable, extensible backend system for menu management. It demonstrates a strong foundation in software engineering principles, with a focus on testing, code organization, and future scalability.
