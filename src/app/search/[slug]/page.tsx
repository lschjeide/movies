"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import searchMovies from '@/services/searchMovies';
import MovieCard from "./movieCard";
import Loading from "@/components/loading";
import Heading from "@/components/heading";
import Error from "@/components/error";
import { OMDBMovie } from '../../types';


const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<OMDBMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { slug } = useParams();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movies = await searchMovies(slug as string);
        setMovies(movies);
      } catch (err) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [slug]);


  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <Error error={error}/>;
  }

  return (
    <div className="h-full">
      <Heading title={`Showing results for: ${decodeURIComponent(slug as string)}`}/>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
        {movies.map((movie, index) => (
          <MovieCard key={index} {...movie}/>
        ))}
      </div>
    </div>
  );
}

export default MovieList;