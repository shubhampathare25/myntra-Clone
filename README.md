## Myntra React Clone

A fully functional e-commerce web application inspired by Myntra, built using **React** and **Vite**. This project replicates core shopping features like product browsing, adding items to the bag, managing the bag, and dynamic price calculations.

---

Live Demo

https://myntra-clone-shubz.vercel.app/

---

## Overview
The **Myntra React Clone** is a fully responsive, feature-rich front-end web application that replicates the core user experience of Myntra. It allows users to browse through clothing and lifestyle products, manage their shopping bag dynamically, and experience real-time price calculations (including MRP, discounts, and delivery charges) with smooth client-side routing.

---

## Features

* **Product Catalog:** Browse through a variety of fashion and lifestyle items with ratings, company names, and pricing.
* **Bag Management:** Add or remove items dynamically from the shopping bag.
* **Dynamic Price Summary:** Real-time calculation of total MRP, discounts, convenience fees, and final payable amount.
* **Responsive Navigation:** Clean header, search bar, wishlist, and bag counter indicators.

---
## Technologies Used

### Frontend
* React.js
* JavaScript (ES6+)
* Redux Toolkit
* React Router DOM
* Bootstrap
* Vite
* Fetch API

### Backend
* Node.js
* Express.js

### Development Tools
* Git
* GitHub
* VS Code
* MongoDB Compass
* Render
* Vercel

---

## Project Structure
```
## 📁 Project Structure

```text
3-myntra-react-clone/
├── public/
├── src/
│   ├── components/
│   │   ├── BagItem.jsx
│   │   ├── BagSummary.jsx
│   │   ├── Fetchitems.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── HomeItem.jsx
│   │   └── LoadingSpinner.jsx
│   │
│   ├── Pages/
│   │   ├── AdminLogin.jsx
│   │   ├── Beauty.jsx
│   │   ├── Checkout.jsx
│   │   ├── HelpContact.jsx
│   │   ├── Home&Living.jsx
│   │   ├── Kids.jsx
│   │   ├── Men.jsx
│   │   ├── Orders.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── UserLogin.jsx
│   │   └── Women.jsx
│   │
│   ├── routes/
│   │   ├── App.jsx
│   │   ├── Bag.jsx
│   │   ├── Home.jsx
│   │   └── Wishlist.jsx
│   │
│   ├── store/
│   │   ├── bagSlice.js
│   │   ├── fetchStatusSlice.js
│   │   ├── index.js
│   │   ├── itemsSlice.js
│   │   ├── searchSlice.js
│   │   └── wishlistSlice.js
│   │
│   ├── index.css
│   └── main.jsx
│
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```
## Getting Started Locally

To run this project on your local machine, follow these steps:

1. **Clone the repository:**
 ```bash
git clone [https://github.com/shubhampathare25/myntra-Clone.git]
```
1. Frontend Setup
```
cd "9-Myntra Clone/3-myntra-react-clone"
```
2. Install dependencies:
```
npm install
```
3. Run the development server:
```
npm run dev
```
---
##  Backend Setup

To run the backend server locally, follow these steps:

1. **Navigate to the backend directory**
   ```bash
   cd 2-actual-backend

2. Install backend dependencies
   ```
   npm install
   ```
3. Start the backend server
   ```
   npm start
---
## Preview

### Home page
<img width="941" height="420" alt="Screenshot 2026-10-19 111800" src="https://github.com/user-attachments/assets/4f5eef25-652c-4fe6-84d3-064848303efa" />

### Bag page
<img width="932" height="420" alt="Screenshot 2026-10-19 111843" src="https://github.com/user-attachments/assets/557fc5d3-7419-406e-84d4-336fe5a55fdd" />

## Usage

* Open the application in your browser.
* Browse through the product list on the home page.
* Click on **"Add to Bag"** to add your favorite items to the shopping cart.
* Navigate to the **Bag page** to view selected items, check price details (MRP, discounts, convenience fee), and click **"Place Order"** to complete the flow.

## Future Enhancements

* Add user authentication (Login/Register)
* Implement like and comment functionality
* Add post editing and deletion
* Integrate backend APIs
* Add image upload support
* Implement dark mode
* Add notifications system
* Store posts in a database

## Learning Outcomes

- Mastered state management using **Redux Toolkit** in React.
- Integrated frontend with **Node.js & Express.js** backend.
- Designed responsive user interfaces replicating real-world e-commerce platforms.
- Handled API requests using Fetch/Axios.

* ## Repository
---
GitHub Repository: https://github.com/shubhampathare25/myntra-Clone.git