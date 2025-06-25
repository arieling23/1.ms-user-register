# Microservice: ms-user-register

This microservice is part of the distributed **Flight Reservation System** and is responsible for **user registration**. It belongs to the **User Management and Authentication** business domain.

---

## Functionality

- New user registration via REST API.
- Validation of required fields.
- Generation and return of JWT token.
- Publishing the `user.registered` event to RabbitMQ for integration with other microservices.

---

## Technologies Used

- **Language:** Node.js + Express
- **Database:** MongoDB
- **Messaging:** RabbitMQ
- **Authentication:** JWT
- **Architecture:** Event-Driven
- **API Style:** REST

---

## Main Endpoint

```http
POST /api/users/register
