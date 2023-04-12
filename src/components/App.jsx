import './App.scss';
import List from './List';
import Gallery from './Gallery';
import Details from './Details';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import { useState, useEffect } from "react";
import { getShows } from '../TvShowApi';



function App() {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
      getShows().then(response => {
        setData(response);
        setLoading(false);
      }).catch(error => {
        console.log(error);
      })
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <h1>TMDB Top 200 TV Shows</h1>
        <Link to="list" id="link">Search</Link>
        <Link to="gallery" id="link">Gallery</Link>
        <Routes>
          <Route path="list" element={<List response={data} />} />
          <Route path="gallery" element={<Gallery response={data} />} />
          <Route path="details/:detailID" element={<Details response={data} />} />
          <Route path="details" element={<Navigate to="/details/0" replace />}></Route>
          <Route path="/" element={<Navigate to="/list" replace />}></Route>
        </Routes>

      </div>
    </Router>

  );
}

export default App;
