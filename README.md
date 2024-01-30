# Minification App

## Accessing Swagger UI

Swagger UI is deployed alongside the application, providing an interactive documentation interface.

To explore the API using Swagger UI, follow these steps:

1. Ensure that the application is running using Docker Compose as described in the previous section.

2. Open your web browser and navigate to [http://localhost:3000/api/doc](http://localhost:3000/api/doc) to access the Swagger UI.

You can use Swagger UI to interactively explore and test the various endpoints of the API.

Feel free to customize and adapt this information based on your specific setup and preferences.


This Nest.js application is designed following the Command Query Responsibility Segregation (CQRS) pattern, emphasizing the separation of commands and queries. The application showcases a modular architecture with distinct modules and efficient use of read and write streams for memory-conscious minification processes.

## Table of Contents

- [Introduction](#introduction)
- [Application Logic](#application-logic)
- [Getting Started](#getting-started)
    - [Local Setup](#local-setup)
    - [Docker Setup](#docker-setup)

## Introduction

The Minification App leverages the CQRS pattern, which is a software design pattern that separates the command (write) and query (read) operations in an application. This separation provides better maintainability, scalability, and allows for tailored optimization strategies for each type of operation.

## Application Logic

### Command and Query Separation

In adherence to the CQRS pattern, the application is structured with clear separation between commands and queries. This architectural choice promotes cleaner code, better scalability, and easier maintenance.

### Modular Architecture

The application is built with modularity in mind. Each module encapsulates specific functionality, making the codebase more organized and extensible. Modules are designed to be independent and easily pluggable, following the principles of good software design.

### Efficient Memory Usage with Streams

A key feature of the Minification App is its use of read and write streams. Streams are employed to efficiently process data, making the application memory-conscious, especially when dealing with large files. This ensures optimal performance even in resource-constrained environments.

## Getting Started

### Local Setup

To run the application locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd minification
   
2. **Environment Configuration**:

   Create a `.env` file in the root of the project and configure the necessary environment variables. For example:

   ```env
   PORT=3000
   JWT_SECRET=mysecret
   # Add other environment variables as needed

3. **Running the app**
    ```bash
   nest start

## Docker Setup

To run the application using Docker and Docker Compose:

1. **Build the Docker Image**:

   ```bash
   docker build .

## Run Docker Compose

To run the application using Docker Compose, follow the instructions below:

1. **Start the Application**:

    ```bash
    docker-compose up
    ```

   The application will start, and you will see logs indicating its status.

2. **Access the Application**:

   Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to interact with the application.

3. **Shutdown the Application**:

   To stop the running containers, use the following command in the terminal:

    ```bash
    docker-compose down
    ```

   This will gracefully stop and remove the containers.

**Note**: Ensure that Docker and Docker Compose are installed on your system before proceeding.

## Docker Compose Configuration

The `docker-compose.yml` file contains the necessary configuration for running the application using Docker Compose. Modify it as needed for your environment.

- **PostgreSQL Database**:

  The application uses a PostgreSQL database defined in the `docker-compose.yml`. Adjust the database configuration, such as `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB`, if necessary.

- **Environment Variables**:

  The `.env` file is used to set environment variables for the application. Ensure that it contains the required configuration.

- **Volumes**:

  Docker volumes are used to persist data between container restarts. Modify volume paths in the `docker-compose.yml` file if needed.

Feel free to customize the Docker Compose setup based on your specific requirements.

