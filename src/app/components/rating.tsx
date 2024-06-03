import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '@/contexts/authContext';
import submitRating from '@/services/submitRating';


interface MovieContentProps {
    imdbID: string;
  }

const RatingForm: React.FC<MovieContentProps> = ({ imdbID }) => {
  const [rating, setRating] = useState<number | ''>('');
  const { jwtToken, setShowLoginPopup } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rating) {
      return;
    }

    if (!jwtToken) {
      setShowLoginPopup(true);
      return;
    }

    setLoading(true);
    try {
      // Make API call to submit the rating
      const response = await submitRating(rating, imdbID, jwtToken);
      if (response.status === 200) {
        setMessage('Rating received!');
      }
    } catch (error) {
      setMessage('Error submitting rating. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center my-5 bg-yellow-500 rounded-lg">
      <h2 className="text-3xl font-semibold mb-4 text-black pt-2">Rate the Movie</h2>
      <form onSubmit={handleSubmit} className="flex items-center mb-5">
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          placeholder="(1-10)"
          min="1"
          max="10"
          required
          className="text-black py-2 px-4 rounded-l-lg border border-gray-300 w-40 focus:outline-none focus:border-bg-coca-cola-red "
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white py-2 px-4 rounded-r-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Submitting...' : 'Rate It'}
        </button>
      </form>
      {message && <div className="text-black font-bold text-2xl inline-block p-1 pb-3">{message}</div>}
    </div>
  );
};

export default RatingForm;
