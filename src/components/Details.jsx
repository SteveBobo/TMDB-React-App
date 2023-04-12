import './Details.scss';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function Details({ response }) {

    const params = useParams();
    const navigate = useNavigate();
    const detailsEndPoint = "/details/";
    const [data, setData] = useState([]);
    const [slideIndex, setSlideIndex] = useState(parseInt(params.detailID));

    useEffect(() => {
        setData(response);
    }, [response]);

    const setSlide = (direction) => {
        if (direction === "prev") {
            if (slideIndex === 0) {
                navigate(detailsEndPoint + (data.length - 1));
                setSlideIndex(data.length - 1);
            } else {
                navigate(detailsEndPoint + (slideIndex - 1));
                setSlideIndex(slideIndex - 1);
            }
        } else if (direction === "next") {
            if (slideIndex === data.length - 1) {
                navigate(detailsEndPoint + (0));
                setSlideIndex(0);
            } else {
                navigate(detailsEndPoint + (slideIndex + 1));
                setSlideIndex(slideIndex + 1);
            }
        }
    }

    return (
        <div id="carousel" key="carousel">
            <button type="button" id="prev" value="prev" onClick={() => { setSlide("prev"); }}>&#10094;</button>
            <button type="button" id="next" value="next" onClick={() => { setSlide("next"); }}>&#10095;</button>
            {
                [...data].filter(post => {
                    if (post === data[slideIndex]) {
                        return post;
                    }
                    return "";
                }).map((post) => {
                    return (
                        <ShowDetails
                            key={String(post.id)}
                            name={post.name}
                            posterPath={post.poster_path}
                            overview={post.overview}
                            airDate={post.first_air_date}
                            voteAverage={post.vote_average}
                        />
                    )
                })}
        </div>
    )
}

Details.propTypes = {
    response: PropTypes.array.isRequired
}

export default Details;

function ShowDetails({ name, posterPath, overview, airDate, voteAverage }) {
    return (
        <div id="details_container">
            <img id="poster" alt="Show Poster" src={"https://image.tmdb.org/t/p/w200" + posterPath} />
            <h2>{name}</h2>
            <p><b>Vote Rating: {voteAverage}</b></p>
            <p><b>First Air Date: {airDate}</b></p>
            <p id="overview">{overview}</p>
        </div>
    )
}

ShowDetails.propTypes = {
    name: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    airDate: PropTypes.string.isRequired,
    voteAverage: PropTypes.number.isRequired
}