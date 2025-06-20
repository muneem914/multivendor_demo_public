# Evaluation Task Submission – Junior Web Developer (FourBtech)

## Overview

This project is a multivendor eCommerce platform featuring role-based dashboards for Admin, Seller, and Customer. The goal was to implement functional UI and logic based completion on Figma prototype. The system includes authentication, protected routes, role-based redirection, order placement, seller management, and dynamic forms.

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
- **Authentication**: JWT with HTTP-only cookies
- **Middleware**: Custom error handling, async wrapper

---

![Complete Folder Structure](https://photos.app.goo.gl/bCAS7yW3gVtUBDNY6)


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
- **Customer**: View profile, update info, change passwrod, change notification preferences, place orders (will be done later)
- **Seller**: Add/edit/delete products (will be done later; for now kept that static), manage shop info, view orders
- **Admin**: Full system access, manage users/products/orders, approve sellers (will be done later)

###  Public Interface
- Product listing (wishlist) page and navigation
- Floating navbar + mobile bottom navigation
- Add-to-cart functionality (static for now)
- Checkout logic with step validation (shipping > confirmation)
- Address form with default selection handling (later will do that.)

###  Seller Features
- Shop registration and dynamic product creation
- Upload multiple images with preview
- Add custom specifications using modal interface (done only in features section)
- Product update functionality with image re-upload
- Order management with status (e.g., Pending → Shipped) (need to handle logically with produt/order API)
- For now, only seller interaction with db, rest of them are static

###  Admin Features
- For now, admin can see only his all customer and seller. But an admin will be able to:
	- Manage all users, sellers, orders, and transactions
	- Approve seller accounts 
	- Modify any user role or content
	- View system-wide data via tables

---

##  The whole process (at a glance)

### Structure
- Three separate layouts for each role
- Separate route guards (protected routes) and redirects per user role
- Modular components per feature (Profile tabs, dialogs, forms)
- Clear folder separation both in frontend and in backend for routes/controllers/models

### Assumptions
- Missing design gaps (e.g., full seller profile page) were filled with logical UX decisions
- Static cart due to no product catalog implementation in design
- Modals for adding features, Login/registration page prototype
- Backend schema design
- Default values assumed for registration (e.g., notification prefs)

### Challenges
- Handling CORS on Vercel during backend deployment
- Managing persistent auth with Redux + cookies
- Handling async dynamic fields (like product specs) efficiently
- Managing multiple form states (shipping, user update, etc.)

### Limitations & Next Steps
- Product catalog and live cart logic to be completed
- Improve form validation (auth, shipping, registration)
- Seller registration management from admin.
- Product review management.
- Address management (add, update, set default) to be finalized
- Optimize backend folder structure (e.g., move DB connection to `config`)
- Replace `<img>` with `next/image` for better SEO/performance



### Suggestions for Improvement

- Provide API documentation or JSON structure expectations with the design
- Clarify navigation flows in the Figma prototype
- Include required/optional field info for registration and checkout forms
- Improve consistency in role management (e.g., role names, approval steps)


## Future Prospects (Planned to do in next)
- Full product catalog with dynamic cart
- Complete address management system
- Implement wishlist, reviews, and order tracking
- Dashboard analytics and charts
- Full seller profile with earnings, shop analytics.
- Public view for the seller page, products, profile image, banner of the shop.
- Admin approval for the seller, notification system, mailing from website and so on.

**Reason for this:** 
I was planning to practice a multivendor ecommerce application using next.js, and typescript. At that time I have been shortlisted for the recruitment process. Now, I will complete these whole application to showcase in my portfolio.

---

## My Submission

- **Live App Link**: https://fourbtech-frontend.vercel.app/
- **GitHub Repo**: https://github.com/muneem914/fourbtech_public

###  Separate Live Links
- Frontend Live: https://fourbtech-frontend.vercel.app/
- Backend Live: https://fourbtech-backend.vercel.app/

(Both frontend and backend code are available in the github link. Also added backend URL in the frontend code.)

**Thank you for this opportunity. Looking forward to your feedback!**

— **Muneem Hussain**
		Date: 20th June, 2025
