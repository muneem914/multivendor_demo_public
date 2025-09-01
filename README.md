
# Overview

This project is a multi-vendor eCommerce platform featuring role-based dashboards for Admin, Seller, and Customer. The goal was to implement functional UI and logic based completion on Figma prototype. The system includes authentication, protected routes, role-based redirection, order placement, seller management, and dynamic forms.

##  Tech Stack

### Frontend
- **Framework**: Next.js (App Router) with TypeScript
- **Styling**: Tailwind CSS, SCSS
- **UI Components**:
  - ShadCN UI (selected components)
  - HeadlessUI (Dialog modals)
- **State Management**: Redux Toolkit & RTK Query
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB Atlas (cloud) / MongoDB (local for dev)
- **Deployment**: Vercel with serverless functions
- **Authentication**: JWT with HTTP-only cookies, hashed password using bcrypt.js
- **Middleware**: Custom error handling, async wrapper

---


## Complete folder structure
![Complete Folder Structure](https://raw.githubusercontent.com/muneem914/multivendor_demo_public/refs/heads/main/frontend/public/folder_structure.png)
**This is previous project structure. Added some for files.**

## Features Implemented

###  Whole Figma prototype into Next.js/Typescript application
- Added a three-layer sidebar for large (desktop), medium (tablet) and small (mobile) devices.
- Dynamic navbar based on user roles or routes.
- Fully responsive according to Figma prototype.

###  Authentication & Authorization
- Role-based login and registration for **Customer**, **Seller**, and **Admin**
- Conditional route access and redirection after login
- Session management with cookies (7-day expiry)
- Redux-persist handled login state across reloads

###  Role-Based Dashboards
- **Customer**: Storing data into database with hashed password, View profile, update info, change password, change notification preferences, create/update/delete/default address, placing orders (will be done later)
- **Seller**: Add/edit/delete products (will be done later; for now kept that static), manage shop info, view orders UI, managed sorting in orders, products.
- **Admin**: Full system access, manage users/products/orders, approve sellers, delete customer/seller

###  Public Interface
- Product listing (wishlist) page and navigation
- Floating navbar + mobile bottom navigation
- Individual shop view/products of any seller
- Add-to-cart functionality (static for now)
- Checkout logic with step validation (shipping > confirmation)
- Address form with default selection handling (later will do that.)

###  Seller Features
- Shop registration and dynamic product creation (will be done later)
- Upload multiple images with preview UI
- Add custom specifications using modal interface (done only in features section) - have a try
- Product update functionality with image re-upload
- Order management with status (e.g., Pending → Shipped) (need to handle logically with product/order API)
- For now, only seller interaction with db, rest of them are static

###  Admin Features
- For now, admin can see only his all customer and seller. But an admin is also able to:
	- Manage all users, sellers, orders, and transactions
	- Approve seller accounts 
	- Modify any user role or content
	- View system-wide data via tables

---

### Challenges
- Handling CORS on Vercel during backend deployment
- Fixing mongodb cold start issues in serverless application
- Managing persistent auth with Redux + cookies
- Handling async dynamic fields (like product specs) efficiently
- Managing multiple form states (shipping, user update, etc.)

## Future Prospects (Planned to do in next)
- Full product catalog with dynamic cart
- Implement wishlist, reviews, and order tracking
- Dashboard analytics and charts
- Full seller profile with earnings, shop analytics.
- Public view for the seller page, products, profile image, banner of the shop.
- Notification system, mailing from website and so on.

---

### Credentials:

***You can create user/seller account. No worries or you can use below accounts for testing purpose.***

**Role: customer:**\
email: muneem914@gmail.com, customer@gmail.com
password: 123456

**Role: Seller**\
email: seller@gmail.com, seller.final@gmail.com
password: 123456

**Role: Admin**\
email: admin@gmail.com
password: 123456

— **Muneem Hussain**\
	Date: 27th June, 2025
