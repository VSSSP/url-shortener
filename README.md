# 🚀 URL Shortener API

Welcome to the URL Shortener API! This API allows you to shorten URLs, manage them, and authenticate users. 🗒️

## 🌟 Features

- **User Authentication**: Register and login to manage your URLs securely.
- **URL Shortening**: Convert long URLs into short, manageable links.
- **URL Management**: List and access your shortened URLs.
- **Swagger Documentation**: Explore and test the API endpoints via Swagger UI.

## 🛠️ Installation

### Clone the Repository

```bash
git clone https://github.com/vsssp/url-shortener-api.git
cd url-shortener-api
```

### Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
PORT=3000
DB_HOST=localhost
DB_USER=username
DB_PASS=password
DB_NAME=db
```

### Install Dependencies

```bash
npm install
```

## 🚀 Running the Application

### Docker

Build and run the application using Docker:

```bash
docker compose up --build
```

The server will start on port 3000 or the port defined in your `.env` file.

### Running Tests

You can run the tests independently with:

```bash
npm run test
```

## 📜 API Endpoints

### Authentication

- **Register** `POST /auth/register`

  Request Body:

  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

  Responses:
  - `201 Created`: User registered successfully.
  - `400 Bad Request`: Invalid input.

- **Login** `POST /auth/login`

  Request Body:

  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

  Responses:
  - `200 OK`: Returns a JWT token.
  - `401 Unauthorized`: Invalid credentials.

### URL Management

- **Shorten URL** `POST /urls/shorten`

  Headers: `Authorization: Bearer <JWT_TOKEN>`

  Request Body:

  ```json
  {
    "originalUrl": "http://example.com"
  }
  ```

  Responses:
  - `200 OK`: Returns the shortened URL.
  - `400 Bad Request`: Invalid input.

- **List URLs** `GET /urls`

  Headers: `Authorization: Bearer <JWT_TOKEN>`

  Responses:
  - `200 OK`: Returns a list of URLs.
  - `400 Bad Request`: Error retrieving URLs.

- **Redirect URL** `GET /{shortUrl}`

  Responses:
  - `302 Found`: Redirects to the original URL.
  - `404 Not Found`: URL not found.

## 📖 Swagger Documentation

Explore and test the API endpoints using Swagger UI at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 📧 Contact

For any questions or feedback, contact me at victorssspaula@live.com.
