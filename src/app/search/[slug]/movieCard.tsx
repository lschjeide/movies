import Link from 'next/link';

import Image from 'next/image';
import React from 'react';
import { OMDBMovie } from '../../types';


const MovieCard: React.FC<OMDBMovie> = ({ imdbID, Title, Year, Poster }) => {
  return (
    <Link href={`/movie/${imdbID}`}>
      <div className="bg-yellow-500 shadow-lg my-5 rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
        <Image className="w-full object-cover object-center" width={150} height={300} src={Poster} alt={Title} />
        <div className="p-4">
          <h3 className="text-gray-800 font-semibold text-lg">{Title} ({Year})</h3>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;