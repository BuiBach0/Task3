import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp';



function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route  element={<Header />}>
            <Route path='/home' element={<Home />}></Route>
            <Route path="movie/:id" element={<Movie />}></Route>
            <Route path="movies/:type" element={<MovieList />}></Route>
            <Route path="/*" element={<h1>Error Page</h1>}></Route>
          </Route>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="SignUp" element={<SignUp />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
