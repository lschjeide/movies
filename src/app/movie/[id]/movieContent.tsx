import React from 'react';

import Image from 'next/image';

import RatingForm from "@/components/rating";

interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
}

interface MoviePageProps {
  movieDetails: MovieDetails;
}

const MovieContent: React.FC<MoviePageProps> = ({ movieDetails }) => {
  const {
    Title,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    Poster,
    Ratings,
    Metascore,
    imdbRating,
    imdbVotes,
    imdbID
  } = movieDetails;

  return (
    <div className="container mx-auto pt-8 ">
      <div className="flex flex-wrap justify-center">
        <div className="max-w-md">
          <Image src={Poster} alt={Title}  width={300} height={400} className="rounded-lg shadow-lg bg-opacity-80 bg-white" />
          {imdbID && <RatingForm imdbID={imdbID}/>}
        </div>
        <div className="max-w-md mx-8 py-1 px-8 bg-opacity-80 bg-white rounded-lg mb-20">
          <h1 className="text-3xl text-black font-bold mt-4">{Title} ({Year})</h1>
          <p className="text-black font-bold">{Genre} {Runtime}</p>
          <p className="text-black text-base">{Plot}</p>
          <p className="text-black text-base font-bold">{Director}</p>
          <p className="text-black text-base font-bold">{Actors}</p>
          <p className="text-black text-base font-bold">{Language}</p>
          <p className="text-black text-base font-bold">{Country}</p>
          <p className="text-black text-base font-bold">{Awards}</p>
          <div className="my-4">
            <h2 className="text-lg text-black font-bold mb-2">Ratings</h2>
            {Ratings.map((rating, index) => (
              <p key={index} className="text-black font-bold">{rating.Source}: {rating.Value}</p>
            ))}
            <p className="text-black font-bold">Metascore: {Metascore}</p>
            <p className="text-black font-bold">IMDB Rating: {imdbRating}</p>
            <p className="text-black font-bold">IMDB Votes: {imdbVotes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieContent;