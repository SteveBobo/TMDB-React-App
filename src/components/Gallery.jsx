import './Gallery.scss';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function Gallery({ response }) {

  const [data, setData] = useState([]);
  const [filterGallery, setFilterGallery] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    setData(response);
  }, [response]);

  return (
    <div>
      <div id="genre_container">
        <label id="genre_label" htmlFor="genre">Select genre:</label>
        <br />
        <select
          id="genre"
          name="genre"
          onChange={event => {
            setFilterGallery(event.target.value);
          }
          }
        >
          <option value="all">All</option>
          <option value="10759">Action</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentary</option>
          <option value="18">Drama</option>
          <option value="10751">Family</option>
          <option value="10762">Kids</option>
          <option value="9648">Mystery</option>
          <option value="10763">News</option>
          <option value="10764">Reality</option>
          <option value="10765">Sci-Fi</option>
          <option value="10766">Soap</option>
          <option value="10767">Talk</option>
          <option value="10768">War</option>
          <option value="37">Western</option>
        </select>
      </div>
      {
        [...data].filter(post => {
          if (filterGallery === 'all') {
            return post;
          } else {
            if (post.genre_ids.includes(parseInt(filterGallery))) {
              return post;
            }
          }
          return "";
        }).map((post) => {
          return (
            <ShowGallery
              key={String(post.id)}
              navigate={navigate}
              index={data.indexOf(post)}
              posterPath={post.poster_path}
            />
          )
        })
      }
    </div>);
}

Gallery.propTypes = {
  response: PropTypes.array.isRequired
}

export default Gallery;

function ShowGallery({ navigate, index, posterPath }) {
  return (
    <div
      id="gallery_results"
      onClick={() => { navigate("/details/" + index) }}>
      <div id="gallery_container">
        <img id="poster" alt="Show Poster" src={"https://image.tmdb.org/t/p/w200" + posterPath} />
      </div>
    </div>
  )
}

ShowGallery.propTypes = {
  navigate: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  posterPath: PropTypes.string.isRequired
}