# Microservice: ms-user-register

This microservice is part of the distributed **Flight Reservation System** and is responsible for **user registration and management**. It belongs to the **User Management and Authentication** business domain.

---

## 🚀 Functionality

### Core Features
- **User Registration**: New user registration via REST API with comprehensive validation
- **Password Management**: Password update functionality for password recovery integration
- **JWT Authentication**: Generation and return of JWT tokens for authenticated sessions
- **Event-Driven Architecture**: Publishing `user.registered` events to RabbitMQ for integration with other microservices
- **Role-Based Access**: Automatic role assignment (first user becomes admin, others become regular users)

### Validation & Security
- Email format validation
- Password strength requirements (minimum 8 characters)
- Duplicate email prevention
- Password hashing using bcrypt
- CORS configuration for cross-origin requests

---

## 🛠️ Technologies Used

- **Runtime:** Node.js 18
- **Framework:** Express.js 5.1.0
- **Database:** MongoDB with Mongoose ODM
- **Messaging:** RabbitMQ (amqplib)
- **Authentication:** JWT (jsonwebtoken)
- **Security:** bcryptjs for password hashing
- **Validation:** Custom email validation utilities
- **Architecture:** Event-Driven Microservices
- **API Style:** RESTful
- **Containerization:** Docker

---

## 📋 API Endpoints

### User Registration
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Password Update
```http
PUT /api/users/update-password
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "newPassword": "newsecurepassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Contraseña actualizada exitosamente"
}
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3001

# Database
MONGO_URI=mongodb://localhost:27017/flight_reservation

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# RabbitMQ Configuration
RABBITMQ_URL=amqp://localhost:5672

# CORS Configuration
CORS_ORIGIN=http://54.225.75.133:3000
```

---

## 🏗️ Project Structure

```
src/
├── app.js                 # Main application setup
├── config/
│   └── database.js        # MongoDB connection configuration
├── controllers/
│   └── userController.js  # Request handlers
├── events/
│   └── publisher.js       # RabbitMQ event publishing
├── models/
│   └── User.js           # User data model
├── routes/
│   └── userRoutes.js     # API route definitions
├── services/
│   └── userService.js    # Business logic
└── utils/
    ├── generateToken.js   # JWT token generation
    └── validateEmail.js   # Email validation utility
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- MongoDB instance
- RabbitMQ server
- Docker (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 1.ms-user-register
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Docker Deployment

1. **Build the image**
   ```bash
   docker build -t ms-user-register .
   ```

2. **Run the container**
   ```bash
   docker run -p 3001:3001 --env-file .env ms-user-register
   ```

---

## 🔄 Event-Driven Integration

### Published Events

The microservice publishes events to RabbitMQ for integration with other microservices:

**Event:** `user.registered`
- **Exchange:** `user`
- **Routing Key:** `user.registered`
- **Payload:**
  ```json
  {
    "type": "user.registered",
    "data": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "hashed_password",
      "role": "admin",
      "timestamp": "2024-01-15T10:30:00.000Z"
    }
  }
  ```

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

---

## 📊 Error Handling

The microservice implements comprehensive error handling:

- **400 Bad Request**: Missing required fields, invalid email format, weak password
- **409 Conflict**: Email already registered
- **404 Not Found**: User not found (for password updates)
- **500 Internal Server Error**: Server-side errors

---

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with salt rounds of 10
- **JWT Tokens**: Secure token generation with configurable expiration (1 hour default)
- **Input Validation**: Comprehensive validation for all user inputs
- **CORS Protection**: Configured CORS for secure cross-origin requests
- **Role-Based Access**: Automatic role assignment with admin privileges

---

## 📈 Monitoring & Logging

The application includes comprehensive logging:
- Server startup and shutdown events
- Database connection status
- RabbitMQ connection status
- User registration events
- Error logging with detailed stack traces

---

## 🤝 Integration Points

This microservice integrates with:
- **ms-password-recovery**: Password update functionality
- **Other microservices**: Via RabbitMQ events for user registration notifications
- **Frontend applications**: Via REST API endpoints

---

## 📝 License

This project is part of the Flight Reservation System and is licensed under ISC.

---

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

---

## 📞 Support

For issues and questions, please contact the development team or create an issue in the repository.
