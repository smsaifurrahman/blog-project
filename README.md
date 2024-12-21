# Blogging Platform Backend

This project is a backend application for a blogging platform. It allows users to create, update, and manage their blogs while incorporating role-based access control with two distinct roles: **Admin** and **User**. The system includes secure authentication and a public API for viewing blogs with search, sort, and filter functionalities.

---

## Features

### User Roles
#### Admin
- Created manually in the database with predefined credentials.
- **Can**:
  - Delete any blog.
  - Block any user by updating the `isBlocked` property.
- **Cannot**:
  - Update blogs.
#### User
- **Can**:
  - Register and log in.
  - Create, update, and delete their own blogs.
- **Cannot**:
  - Perform admin actions.

### Authentication & Authorization
- **Authentication**: Users must log in to perform write, update, and delete operations.
- **Authorization**: Differentiated and secured roles for Admin and User.

### Blog API
- Public API to read blogs.
- Supports:
  - **Search**: By blog title or content.
  - **Sorting**: By fields such as `createdAt` or `title`.
  - **Filtering**: By author ID or other criteria.

---

## Technologies Used
- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose

---

## Models

### User Model
| Field       | Type          | Description                                  |
|-------------|---------------|----------------------------------------------|
| `name`      | `string`      | Full name of the user.                      |
| `email`     | `string`      | Email address (used for authentication).    |
| `password`  | `string`      | Encrypted password for the user.            |
| `role`      | `"admin" \| "user"` | Role determining access level (default: `user`). |
| `isBlocked` | `boolean`     | Whether the user is blocked (default: `false`). |
| `createdAt` | `Date`        | Timestamp when the user was created.        |
| `updatedAt` | `Date`        | Timestamp of the last update to the user.   |

### Blog Model
| Field         | Type       | Description                                   |
|---------------|------------|-----------------------------------------------|
| `title`       | `string`   | Title of the blog post.                      |
| `content`     | `string`   | Main body/content of the blog post.          |
| `author`      | `ObjectId` | Reference to the `User` model.               |
| `isPublished` | `boolean`  | Whether the blog is published (default: `true`). |
| `createdAt`   | `Date`     | Timestamp when the blog post was created.    |
| `updatedAt`   | `Date`     | Timestamp of the last update to the blog post. |

---

## API Endpoints

### Authentication
#### Register User
- **Endpoint**: `POST /api/auth/register`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
