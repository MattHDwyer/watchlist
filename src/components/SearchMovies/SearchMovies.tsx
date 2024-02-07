import { TextField } from "@mui/material";
import { TMBD_URLS, IMAGE_BASE_URL } from "../../constants/url";
import { useState, useEffect } from "react";

export interface SearchMoviesProps {}

export const SearchMovies = ({}: SearchMoviesProps) => {
  const [listOfMovies, setListOfMovies] = useState<Array<any>>([]);

  useEffect(() => {
    console.log(listOfMovies);
  }, [listOfMovies]);

  const useHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    useGetTMDB(TMBD_URLS.SEARCH_MOVIE, e.target.value).then((res) => {
      setListOfMovies(res.results);
      return res.results;
    });
  };

  return (
    <div>
      SearchMovies:
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={useHandleInputChange}
      />
      {listOfMovies.length > 0 ? (
        <>
          {listOfMovies.map((movie, index) => (
            <MovieTile key={index} movie={movie} />
          ))}
        </>
      ) : null}
    </div>
  );
};

const MovieTile = ({ movie }: any) => {
  console.log(movie);
  return (
    <div>
      <h3>{movie?.title}</h3>
      {movie.poster_path ? (
        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} />
      ) : null}
      <p>{movie?.overview}</p>
    </div>
  );
};

/**
 * {
  "adult": false,
  "backdrop_path": null,
  "genre_ids": [],
  "id": 1183640,
  "original_language": "en",
  "original_title": "Minions",
  "overview": "“An animated science-fiction film […] the blue balls represent blue balls.”",
  "popularity": 3.972,
  "poster_path": null,
  "release_date": "1965-01-01",
  "title": "Minions",
  "video": false,
  "vote_average": 0.0,
  "vote_count": 0
},
 * 
 */

function useGetTMDB(pathString: string, query?: string): Promise<any> {
  const base_url = "https://api.themoviedb.org/3/";
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
  });

  return fetch(`${base_url}${pathString}${query ? `?query=${query}` : ""}`, {
    method: "GET",
    headers: headers,
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    return res.json();
  });
}
