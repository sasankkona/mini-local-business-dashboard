import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const seoTips = [
  "Use keywords relevant to your business in your headlines.",
  "Keep your headlines concise and engaging.",
  "Include your location to improve local SEO.",
  "Update your SEO headlines regularly to stay relevant.",
  "Encourage customers to leave reviews to boost your rating."
];

const backendBaseUrl = 'http://localhost:5001';

function App() {
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [headline, setHeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showData, setShowData] = useState(false);

  const reviewTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Number of Reviews',
        data: [12, 19, 14, 20, 25, reviews || 0],
        backgroundColor: 'rgba(59, 130, 246, 0.7)', 
      },
    ],
  };

  const reviewTrendOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Review Trend (Last 6 Months)',
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!businessName.trim() || !location.trim()) {
      setError('Please enter both business name and location.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${backendBaseUrl}/business-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: businessName, location }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch business data');
      }
      const data = await response.json();
      setRating(data.rating);
      setReviews(data.reviews);
      setHeadline(data.headline);
      setShowData(true);
    } catch (err) {
      setError(err.message);
      setShowData(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `${backendBaseUrl}/regenerate-headline?name=${encodeURIComponent(
          businessName
        )}&location=${encodeURIComponent(location)}`
      );
      if (!response.ok) {
        throw new Error('Failed to regenerate headline');
      }
      const data = await response.json();
      setHeadline(data.headline);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col items-center p-4">
      <h1 className="text-white text-3xl font-bold mb-6">Local Business Dashboard</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 w-full max-w-md shadow-lg"
      >
        <div className="mb-4">
          <label className="block text-white mb-1 font-semibold" htmlFor="businessName">
            Business Name
          </label>
          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Enter business name"
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1 font-semibold" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        {error && <p className="text-red-300 mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-md transition-colors disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Get Business Data'}
        </button>
      </form>

      {showData && (
        <div className="bg-white bg-opacity-30 rounded-md p-6 w-full max-w-md mt-6 shadow-lg text-gray-900">
          <p className="text-lg font-semibold mb-2">
            Google Rating: <span className="text-yellow-400">{rating}★</span>
          </p>
          <p className="mb-2">Number of Reviews: {reviews}</p>
          <p className="mb-4 font-semibold">SEO Headline:</p>
          <p className="mb-4 italic">"{headline}"</p>
          <button
            onClick={handleRegenerate}
            disabled={loading}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Regenerate SEO Headline'}
          </button>

          <div className="mt-8 bg-white bg-opacity-30 rounded-md p-4 text-gray-900">
            <h2 className="text-xl font-bold mb-3">SEO Tips</h2>
            <ul className="list-disc list-inside space-y-2">
              {seoTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <Bar options={reviewTrendOptions} data={reviewTrendData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
