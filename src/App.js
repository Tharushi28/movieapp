import React from 'react';
import Movie from './components/Movie';
import { useEffect, useState } from 'react';

const FEATURED_API =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cfd70404dc630b11f11bfb203ed74ed7&page=1';

const SEARCH_API =
  'https://api.themoviedb.org/3/searcg/movie?&api_key=cfd70404dc630b11f11bfb203ed74ed7&query=';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (setSearchTerm) {
      getMovies(SEARCH_API + searchTerm);

      setSearchTerm('');
    }
  };
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className='search'
            type='search'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className='movie-container'>
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
