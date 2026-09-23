function MovieResult(props) {
  const hasValidPoster = props.Poster && props.Poster !== '#';

  return (
    <div className="movie_card">
      <div className="movie_poster_container">
        {hasValidPoster ? (
          <img src={props.Poster} alt={props.Title} className="movie_poster" />
        ) : (
          <div className="movie_poster_fallback">
            <span className="poster_icon">🎬</span>
            <span className="poster_title">{props.Title}</span>
          </div>
        )}
      </div>
      <div className="movie_details">
        <span className="movie_year">{props.Year}</span>
        <h2 className="movie_title">{props.Title}</h2>
        <p className="movie_plot">{props.Plot}</p>
      </div>
    </div>
  );
}

export default MovieResult;
