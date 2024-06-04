import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { MovieWithIndex } from '../types';


const TopTenCard: React.FC<MovieWithIndex> = ({ imdbID, Title, Year, Poster, Plot, avgRating, weightedScore, numRatings, index }) => {
  return (
    <Link href={`/movie/${imdbID}`}>
        <div key={imdbID} className="w-full bg-yellow-500 rounded-lg shadow-lg px-4 py-1 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"  data-testid="top-ten-card">
            <h1 className="text-xl font-semibold mt-4 text-black font-bold">{index+1}. {Title} ({Year})</h1>

            <p className="text-black font-bold mt-2">Average Rating: {avgRating.toFixed(2)}</p>
            <p className="text-black font-bold mt-2">Weighted Rating: {weightedScore.toFixed(2)}</p>
            <p className="text-black font-bold mt-2">Number of Ratings: {numRatings}</p>
            <Image src={Poster} alt={`${Title} Poster`}  width={80} height={200}  className="w-full h-85 object-cover rounded-lg mt-5" />
            <p className="text-black mt-2">{Plot}</p>
            <div className="mt-4">
            </div>
        </div>
    </Link>
  );
}

export default TopTenCard;