import './List.scss';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function List({ response }) {

    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [detailIDList, setDetailIDList] = useState([]);
    const [sortBySelection, setSortBySelection] = useState("title");
    const [sortTypeSelection, setSortTypeSelection] = useState("ascending");

    useEffect(() => {
        setData(response);
        setDetailIDList(response);
    }, [response]);

    const sortResults = (sortBySelection, sortTypeSelection) => {
        if (sortBySelection === "rating" && sortTypeSelection === "ascending") {
            const sorted = [...data].sort((a, b) => parseFloat(a.vote_average) - parseFloat(b.vote_average));
            setData(sorted);
        } else if (sortBySelection === "rating" && sortTypeSelection === "descending") {
            const sorted = [...data].sort((a, b) => parseFloat(b.vote_average) - parseFloat(a.vote_average));
            setData(sorted);
        } else if (sortBySelection === "title" && sortTypeSelection === "ascending") {
            const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
            setData(sorted);
        } else if (sortBySelection === "title" && sortTypeSelection === "descending") {
            const sorted = [...data].sort((a, b) => b.name.localeCompare(a.name));
            setData(sorted);
        }
    }

    var isVisible = false;
    const navigate = useNavigate();

    return <div><form action="/" method="get">
        <input
            type="text"
            id="show_search"
            placeholder="Search for TV shows"
            name="s"
            onChange={event => {
                setQuery(event.target.value);
            }
            }
        />
        <br />
        <label id="sort_label" htmlFor="sort">Sort by:</label>
        <br />
        <select
            id="sort"
            name="sort"
            value={sortBySelection}
            onChange={e => {
                setSortBySelection(e.target.value);
                sortResults(e.target.value, sortTypeSelection);
            }}
        >
            <option value="title">Title</option>
            <option value="rating">Rating</option>
        </select>
        <br />
        <input
            type="radio"
            className="radio"
            id="ascending"
            name="sort_order"
            value="ascending"
            defaultChecked
            onClick={e => {
                setSortTypeSelection(e.target.value);
                sortResults(sortBySelection, e.target.value);
            }}
        />
        <label className="radio" htmlFor="ascending">ascending</label>
        <input
            type="radio"
            className="radio"
            id="descending"
            name="sort_order"
            value="descending"
            onClick={e => {
                setSortTypeSelection(e.target.value);
                sortResults(sortBySelection, e.target.value);
            }}
        />
        <label className="radio" htmlFor="descending">descending</label>
    </form>
        {
            [...data].filter(post => {
                if (query === '') {
                    return post;
                } else if (post.name.toLowerCase().includes(query.toLowerCase())) {
                    isVisible = true;
                    return post;
                }
                return "";
            }).map((post) => {
                return (
                    <ShowList
                        key={String(post.id)}
                        visibility={isVisible}
                        navigate={navigate}
                        index={detailIDList.indexOf(post)}
                        posterPath={post.poster_path}
                        name={post.name}
                        voteAverage={post.vote_average}
                    />
                )
            })
        }
    </div>
}

List.propTypes = {
    response: PropTypes.array.isRequired
}

export default List;

function ShowList({ visibility, navigate, index, posterPath, name, voteAverage }) {
    return (
        <div
            id="search_results"
            className={visibility ? "visible" : "hidden"}
            onClick={() => { navigate("/details/" + index) }}>
            <div id="poster_container">
                <img id="poster" alt="Show Poster" src={"https://image.tmdb.org/t/p/w200" + posterPath} />
            </div>
            <div id="info_container">
                <p>{name}</p>
                <p>Vote Rating: {voteAverage}</p>
            </div>
        </div>
    )
}

ShowList.propTypes = {
    visibility: PropTypes.bool.isRequired,
    navigate: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    posterPath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    voteAverage: PropTypes.number.isRequired
}