export async function useGetTMDB(pathString: string, query?: string) {
  const base_url = "https://api.themoviedb.org/3/";
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
  });

  return fetch(`${base_url}${pathString}${query ? `?query=${query}` : ""}`, {
    method: "GET",
    headers: headers,
  });
}
