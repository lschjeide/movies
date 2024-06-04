"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MovieContent from "./movieContent";
import Loading from "@/components/loading";
import Error from "@/components/error";
import fetchMovieDetails from "@/services/fetchMovieDetails";
import { OMDBMovieDetail } from "../../types";


const MoviePage: React.FC = () => {
  const [movie, setMovie] = useState<OMDBMovieDetail>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchMovieDetails(id as string);
        setMovie(movieData);
      } catch (err) {
        setError('Failed to fetch movie');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <Error error={error}/>;
  }

  return (


    <div className="h-full p-5 pb-20">
      {movie && <MovieContent {...movie} />}
    </div>
    
    
  );
}

export default MoviePage;