# Dishing Out Data: Taylor's PopMenu Take-out Project

Hi Popmenu team! Welcome to Dishing Out Data, a comprehensive backend application designed for managing restaurant menus. As part of my application to Popmenu, this project underscores my commitment to developing scalable, dynamic systems that cater to the ever-evolving needs of the restaurant industry.

## Getting Started

Jumpstart your journey with "Dishing Out Data" by following these simple steps:

### Installation

1. **Install Dependencies**: Run `npm install` to install all required dependencies.
2. **Start the Application**: Execute `npm run start` to boot up the application. The project is configured to use a SQLite in-memory database for simplicity and ease of initial setup, as detailed in `/src/data-source.ts`. This setup is ideal for testing purposes and can be modified for production use following the instructions within the file.

### Testing

**Running tests**: Execute `npm run test` after installation.

## Project Overview

### Philosophy of Extensibility

At the heart of "Dishing Out Data" lies an extensible data model, architected to accommodate growth and change with minimal friction. This design philosophy ensures that the application remains agile, ready to evolve alongside business needs.

### Embracing Test-Driven Development

My testing strategy employs Jest for test writing and SuperTest for mocking HTTP requests, ensuring comprehensive coverage and reliability. The tests are structured to reboot the in-memory datastore between suites, providing a clean slate for each test cycle. This setup, though initially challenging to implement, has proven invaluable for developing the application in a test-driven manner. Almost all development was guided by the creation and execution of tests, with minimal reliance on tools like Postman for smoke testing.

## Features

### Codebase Organization

- **Controllers**: Business logic is neatly encapsulated within controllers located in the `src/controller` folder, making the codebase easy to navigate and maintain.
- **Entities**: Entities are defined within the `src/entity` folder, representing the SQL database's structure through simple, relational models. Each entity, such as Menu, MenuItem, and Restaurant, is designed to be self-contained, ensuring ease of modification and expansion. This approach adheres to the principles of separation of concerns, allowing for straightforward future enhancements.
- **Endpoints**: Defined in `src/index.ts`, this file lists all the endpoints available in the application, serving as the entry point for interacting with the backend system.

- **Database Configuration**: The database is initially configured as an in-memory SQLite instance, detailed in `src/data-source.ts`, to simplify testing and evaluation. For illustrative purposes, the file also includes an example configuration for a more permanent setup. This approach ensures both ease of use for development and a clear path towards deploying a robust database environment.

## Improvements for Future Iterations

While the current version of the Menu Management System is fully functional and well-tested, the following improvements are suggested for future iterations:

- **Uploader as a Worker Process**: Consider moving the JSON uploader functionality to a separate worker process. This would improve performance and reliability, especially when handling large data uploads.
- **Upload Batch ID**: Adding an "uploadBatchId" to each entity could streamline the process of managing uploads. This feature would allow for easier identification and removal of data from unsuccessful uploads, enhancing data management capabilities.
- **Pre-Upload Validation**: Implementing a validation step before data upload could further ensure the integrity and consistency of the data being imported. This could help prevent common errors and ensure that only valid data is added to the system.
- **Migration Support**: Future-Ready Migration Framework: The project is architected with an eye towards scalability and adaptability, earmarking a migrations directory for impending database schema changes. This proactive setup guarantees the system's seamless evolution, safeguarding data integrity and minimizing the need for extensive overhauls.

## Conclusion

"Dishing Out Data" is a demonstration of creating a reliable, extensible backend system for menu management. It demonstrates a strong foundation in software engineering principles, with a focus on testing, code organization, and future scalability.
