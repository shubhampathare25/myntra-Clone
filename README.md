## Myntra React Clone

A fully functional e-commerce web application inspired by Myntra, built using **React** and **Vite**. This project replicates core shopping features like product browsing, adding items to the bag, managing the bag, and dynamic price calculations.

---

Live Demo

https://myntra-clone-shubz.vercel.app/

---

## Features

* **Product Catalog:** Browse through a variety of fashion and lifestyle items with ratings, company names, and pricing.
* **Bag Management:** Add or remove items dynamically from the shopping bag.
* **Dynamic Price Summary:** Real-time calculation of total MRP, discounts, convenience fees, and final payable amount.
* **Responsive Navigation:** Clean header, search bar, wishlist, and bag counter indicators.

---

## Tech Stack

* **Frontend:** React.js, Vite, HTML5, CSS3, JavaScript (ES6+)
* **Routing:** React Router DOM
* **Version Control:** Git & GitHub

---

## Key Learnings

* Built a fully component-driven user interface using **React.js** and **Vite**.
* Managed complex global state efficiently using **Redux Toolkit** (for items, bag operations, and fetch statuses).
* Implemented **React Router** for smooth client-side navigation between Home and Bag views.
* Handled modern CSS layouts to precisely replicate the UI/UX of a major e-commerce platform like Myntra.

---

## Project Structure
```
## Project Structure

3-myntra-react-clone/
│
├── public/
│   └── images/
│
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
│   ├── routes/
│   │   ├── App.jsx
│   │   ├── Bag.jsx
│   │   └── Home.jsx
│   │
│   ├── store/
│   │   ├── bagSlice.js
│   │   ├── fetchStatusSlice.js
│   │   ├── index.js
│   │   └── itemsSlice.js
│   │
│   ├── index.css
│   └── main.jsx
```
## Getting Started Locally

To run this project on your local machine, follow these steps:

1. **Clone the repository:**
 ```bash
git clone [https://github.com/shubhampathare25/myntra-Clone.git]
```
1. Navigate to the project directory:
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
Preview:
Home page
<img width="960" height="505" alt="Screenshot 2026-08-25 221108" src="https://github.com/user-attachments/assets/75db59bb-010f-447c-b483-e396289fd32c" />
Bag page
<img width="949" height="392" alt="Screenshot 2026-08-25 221921" src="https://github.com/user-attachments/assets/e3796698-a4fa-45e6-805e-1efe58f07ff6" />

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