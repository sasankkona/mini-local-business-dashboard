# Mini Local Business Dashboard

This project is a full stack application simulating a local business dashboard for viewing SEO content and Google Business data. It is built as part of the GrowthProAI Full Stack Intern Assignment.

---

## Features

- Responsive React frontend styled with Tailwind CSS
- Input form for Business Name and Location
- Display card showing:
  - Simulated Google Rating
  - Number of Reviews
  - AI-generated SEO headline fetched from backend
- Button to regenerate SEO headline
- Loading spinner during API calls
- Basic form validation
- Bonus creative features:
  - SEO tips section with useful advice
  - Review trend chart showing simulated review data over 6 months
- Backend built with Node.js and Express exposing two REST endpoints:
  - `POST /business-data` to return simulated business data
  - `GET /regenerate-headline` to return a fresh AI-style headline
- CORS enabled for frontend-backend communication

---

## Screenshot

![Dashboard Screenshot](./Screenshot%202025-07-06%20at%208.49.34 PM.png)

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   node server.js
   ```

   The backend server will run on `http://localhost:5001`.

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`.

---

## Usage

1. Open the frontend URL in your browser.
2. Enter a business name and location in the input form.
3. Click "Get Business Data" to fetch simulated data from the backend.
4. View the Google rating, number of reviews, and AI-generated SEO headline.
5. Click "Regenerate SEO Headline" to fetch a new headline.
6. Explore the SEO tips and review trend chart for additional insights.

---

## Creative Tasks and Bonus Features

- Added a loading spinner to improve user experience during API calls.
- Implemented basic form validation to ensure required fields are filled.
- Used React's `useState` for state management.
- Enhanced UI with a gradient background and clean, mobile-friendly design.
- Added a bonus SEO tips section with actionable advice.
- Included a review trend chart using Chart.js to visualize simulated review data.
- Backend simulates data without a database, fulfilling assignment requirements.