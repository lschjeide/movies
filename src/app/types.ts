export interface Movie {
    imdbID: string;
    avgRating: number;
    numRatings: number;
    weightedScore: number;
  }
  
  export interface OMDBMovie {
    imdbID: string;
    Title: string;
    Year: string;
    Plot: string;
    Poster: string;
  }

  export interface OMDBMovieDetail {
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