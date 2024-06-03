"use client";

import React, { useEffect, useState } from 'react';
import fetchTopTenMovies from '@/services/fetchTopTenMovies';
import { Movie, OMDBMovie } from '../types';
import Heading from "@/components/heading";
import Loading from "@/components/loading";
import Error from "@/components/error";
import TopTenCard from './topTenCard';

const TopTenMovies: React.FC = () => {
  const [movies, setMovies] = useState<(Movie & OMDBMovie)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await fetchTopTenMovies();
        setMovies(moviesData);
      } catch (err) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <Error error={error}/>;
  }

  return (
    <div className="h-full">
      <Heading title="Top 10 Movies"/>
      <div className="m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
        {movies.map((movie, index) => (
          <TopTenCard index={index} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default TopTenMovies;