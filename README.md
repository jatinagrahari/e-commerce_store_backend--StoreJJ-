# MERN E-Commerce Store Backend

A production-style backend API for a MERN e-commerce store. It handles the core commerce flow: authentication, email verification, products, carts, addresses, orders, payments, product images, and admin analytics.

This backend is designed to work with the React storefront in the sibling `frontend` directory.

## Overview

The application follows the MERN stack:

| Layer         | Technology          |
| ------------- | ------------------- |
| Database      | MongoDB             |
| Backend API   | Node.js, Express.js |
| Frontend      | React.js with Vite  |
| Data Modeling | Mongoose            |

The backend exposes REST APIs under `/api/v1` and uses JWT-based authentication with role-based admin access.

## Features

### Authentication and Users

- User registration and login
- Secure password hashing with bcrypt
- JWT-based authentication
- Protected user routes
- Logout support
- Email verification with OTP
- Resend OTP flow
- Admin-only user listing

### Product Catalog

- Public product listing
- Public product details page support
- Admin product creation
- Admin product update
- Admin product deletion
- Multiple product image uploads
- Cloudinary image storage
- Product fields for category, price, discount, stock, rating, and reviews

### Cart

- Authenticated cart update endpoint
- Quantity-based cart items
- User-linked cart data
- Total price and discounted price tracking

### Address Management

- Add shipping addresses
- Fetch saved addresses
- Delete saved addresses
- Address labels such as `Home`, `Work`, and `Other`
- Default address support in the schema

### Orders

- Create orders
- Store shipping address snapshot inside each order
- User order history
- Admin order listing
- Admin order status updates
- Order statuses: `pending`, `confirmed`, `shipped`, `delivered`, `undelivered`

### Payments

- Razorpay order creation
- Razorpay payment verification
- HMAC signature validation for payment integrity

### Admin Analytics

- Admin analytics endpoint
- User analytics endpoint
- Role-protected access for dashboard-style data

### Email System

- Verification email template
- Order confirmation email template
- Email delivery through SMTP using Nodemailer

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcrypt
- cookie-parser
- cors
- multer
- cloudinary
- nodemailer
- razorpay
- dotenv

### Frontend Integration

The frontend uses:

- React
- Vite
- Redux Toolkit
- React Redux
- React Router
- Axios
- Tailwind CSS
- React Hook Form
- React Toastify
- Lucide React
- React Icons

## Folder Structure

```text
backend/
  public/
  src/
    controllers/
      address.controller.js
      analytics.controller.js
      cart.controller.js
      order.controller.js
      payment.controller.js
      product.controller.js
      user.controller.js
    db/
      index.js
    middlewares/
      admin.middleware.js
      auth.middleware.js
      multer.middleware.js
    models/
      address.model.js
      order.model.js
      product.model.js
      user.model.js
    routes/
      address.routes.js
      analytics.routes.js
      cart.routes.js
      order.routes.js
      payment.routes.js
      product.routes.js
      user.routes.js
    templates/
      orderConfirmationEmail.js
      verificationEmail.js
    utils/
      ApiError.js
      ApiResponse.js
      asyncHandler.js
      cloudinary.js
      sendEmail.js
    app.js
    constants.js
    index.js
  package.json
```

## Getting Started

### Prerequisites

Make sure you have these installed:

- Node.js
- npm
- MongoDB, local or cloud-hosted
- A Cloudinary account for image uploads
- Razorpay credentials for payment integration
- SMTP email credentials for sending emails

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory.

Do not commit real secrets to GitHub. Keep actual keys, passwords, and tokens only in your local `.env` file or deployment secret manager.

```env
PORT=
CORS_ORIGIN=
MONGODB_URI=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

EMAIL_USER=
EMAIL_PASS=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

RAZORPAY_API_KEY=
RAZORPAY_API_SECRET=
```

### Run the Server

```bash
npm run dev
```

The server starts on the configured `PORT`. If no port is provided, the app falls back to `8000`.

## API Reference

Base path:

```text
/api/v1
```

### Auth Routes

| Method | Endpoint             | Access  | Description                   |
| ------ | -------------------- | ------- | ----------------------------- |
| POST   | `/auth/register`     | Public  | Register a new user           |
| POST   | `/auth/login`        | Public  | Login user                    |
| POST   | `/auth/logout`       | Private | Logout current user           |
| POST   | `/auth/verify-email` | Private | Verify user email with OTP    |
| POST   | `/auth/resendotp`    | Private | Resend email verification OTP |
| GET    | `/auth/admin/users`  | Admin   | Get all users                 |

### Product Routes

| Method | Endpoint        | Access | Description      |
| ------ | --------------- | ------ | ---------------- |
| GET    | `/products`     | Public | Get all products |
| POST   | `/products`     | Admin  | Create a product |
| GET    | `/products/:id` | Public | Get one product  |
| PUT    | `/products/:id` | Admin  | Update a product |
| DELETE | `/products/:id` | Admin  | Delete a product |

Product create and update routes accept multipart form data with the `images` field.

### Cart Routes

| Method | Endpoint       | Access  | Description                      |
| ------ | -------------- | ------- | -------------------------------- |
| POST   | `/cart/update` | Private | Update authenticated user's cart |

### Address Routes

| Method | Endpoint   | Access  | Description         |
| ------ | ---------- | ------- | ------------------- |
| GET    | `/address` | Private | Get saved addresses |
| POST   | `/address` | Private | Add address         |
| DELETE | `/address` | Private | Delete address      |

### Order Routes

| Method | Endpoint           | Access  | Description               |
| ------ | ------------------ | ------- | ------------------------- |
| POST   | `/orders`          | Private | Create order              |
| GET    | `/orders`          | Admin   | Get all orders            |
| GET    | `/orders/myorders` | Private | Get current user's orders |
| GET    | `/orders/:id`      | Private | Get order by ID           |
| PUT    | `/orders/:id`      | Admin   | Update order status       |

### Payment Routes

| Method | Endpoint          | Access | Description             |
| ------ | ----------------- | ------ | ----------------------- |
| POST   | `/payment/order`  | Public | Create Razorpay order   |
| POST   | `/payment/verify` | Public | Verify Razorpay payment |

### Analytics Routes

| Method | Endpoint          | Access  | Description         |
| ------ | ----------------- | ------- | ------------------- |
| GET    | `/analytics`      | Admin   | Get admin analytics |
| GET    | `/analytics/user` | Private | Get user analytics  |

## Authorization

The API uses JWT authentication for private routes. Admin routes require:

- A valid authenticated user
- User role set to `admin`

Admin-only capabilities include product management, user listing, all-order access, order status updates, and admin analytics.

## Database Models

### User

Stores account details, verification status, role, cart items, and cart totals.

### Product

Stores product information, pricing, category, stock, discount, images, rating, and review count.

### Address

Stores one user's saved shipping addresses with labels and default-address support.

### Order

Stores purchased products, total amount, shipping address, payment ID, and order status.

## Available Scripts

```bash
npm run dev
```

Starts the backend server with Nodemon.

## Related Project

Frontend directory:

```text
../frontend
```

Run the frontend separately from the `frontend` folder when testing the full MERN application.
