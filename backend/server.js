const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());


const headlines = [
  "Discover Why {name} in {location} is the Talk of the Town in 2025",
  "Top Reasons to Visit {name} in {location} This Year",
  "How {name} is Revolutionizing {location}'s Local Scene",
  "Why {name} is {location}'s Hidden Gem for 2025",
  "The Ultimate Guide to {name} in {location}",
  "Experience the Best of {location} at {name}",
  "Why Everyone is Talking About {name} in {location}",
  "Unveiling the Secrets Behind {name} in {location}",
  "What Makes {name} in {location} Stand Out in 2025",
  "Your Go-To Spot: {name} in {location}",
  "Why {name} is {location}'s sweetest spot in 2025"
];


function getRandomRating() {
  return (Math.random() * 1.5 + 3.5).toFixed(1);
}

function getRandomReviews() {
  return Math.floor(Math.random() * 451) + 50;
}

function generateHeadline(name, location) {
  const template = headlines[Math.floor(Math.random() * headlines.length)];
  return template.replace(/{name}/g, name).replace(/{location}/g, location);
}

app.post('/business-data', (req, res) => {
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({ error: 'Name and location are required' });
  }

  const rating = parseFloat(getRandomRating());
  const reviews = getRandomReviews();
  const headline = generateHeadline(name, location);

  res.json({ rating, reviews, headline });
});

app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;

  if (!name || !location) {
    return res.status(400).json({ error: 'Name and location query parameters are required' });
  }

  const headline = generateHeadline(name, location);
  res.json({ headline });
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
