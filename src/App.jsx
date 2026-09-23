import { useEffect, useState } from 'react'
import MovieResult from './MovieResult.jsx'
import './App.css'

const movie_dummy = [
  {
    Title: "Inside Out",
    Poster: "https://m.media-amazon.com/images/M/MV5BOTgxMDQwMDk0OF5BMl5BanBnXkFtZTgwNjU5OTg2NDE@._V1_SX300.jpg",
    Year: "2015",
    Plot: "After young Riley is uprooted from her Midwest life, her emotions conflict on how best to navigate a new city, house, and school."
  },
  {
    Title: "Titanic",
    Poster: "https://m.media-amazon.com/images/M/MV5BYzYyN2FiZmUtYWYzMy00MzViLWJkZTMtOGY1ZjgzNWMwN2YxXkEyXkFqcGc@._V1_SX300.jpg",
    Year: "1997",
    Plot: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic."
  },
  {
    Title: "SYD",
    Poster: "#",
    Year: "2026",
    Plot: "Sick Your Duck"
  }
]

function App() {
  const [movie, setMovie] = useState('');
  const [query, setQuery] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (movie.trim()){
      setQuery(movie.trim())
    }
  }

  useEffect(() => {
    if (!query) return;

    const handleData = async () => {
      setIsLoading(true)
      setError(null);

      try {
        const response = await fetch(`${VITE_OMDB_API_KEY}&s=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError(data.Error || 'No movies found.');
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    handleData();
  }, [query])

  const movie_display = query ? movies : movie_dummy;

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <form className='movie_search' action="submit" onSubmit={handleSearch}>
        <input type="text" placeholder="Movie Name" value={movie} onChange={(e) => setMovie(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>

      {isLoading && <p className='status_message'>Loading movies</p>}
      {error && <p className='status_message'>{error}</p>}
      <div className="movies_grid">
        {movie_display.map((item) => (
          <MovieResult key={item.imdbID || item.Title} {...item} />
        ))}
      </div>
    </div>
  )
}

export default App;
