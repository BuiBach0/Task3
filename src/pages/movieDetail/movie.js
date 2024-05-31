import React, { useEffect, useRef, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase-config";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
const Movie = () => {
  const [currentMovieDetail, setMovieDetail] = useState();
  const { id } = useParams();
  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovieDetail(data));
  };
  const [comment, setComment] = useState();
  const [comment1, setComment1] = useState();
  const comment2 = useRef();
  const db1 = getDatabase();
  const lengthRef = useRef();
  onValue(ref(db1, "comment/" + id), (snapshot) => {
    const data = snapshot.val();

    if (data === null || data === undefined) {
      lengthRef.current = 0;
    } else {
      const filteredData = Object.values(data).filter(
        (val) => val !== null && val !== undefined
      );
      const keys = Object.keys(data);
      const lastKey = keys[keys.length - 1];
      const lastCommentId = data[lastKey].idComment;
      lengthRef.current = lastCommentId;
      comment2.current = filteredData;
      if (filteredData === comment1) {
      } else {
        const strValue1 = JSON.stringify(filteredData);
        const strValue2 = JSON.stringify(comment1);
        if (strValue1 !== strValue2) {
          setComment1(filteredData);
        }
      }
    }
  });

  const submitComment = (e) => {
    e.preventDefault();
    if (comment) {
      set(ref(db1, "comment/" + id + "/" + `${lengthRef.current + 1}`), {
        username: auth.currentUser.reloadUserInfo.email,
        idUser: auth.currentUser.reloadUserInfo.localId,
        comment: comment,
        idComment: lengthRef.current + 1,
      });
    }
  };
  const deleteComment = async (id1) => {

    remove(ref(db1, `comment/${id}/${id1}`), {})
      .then(() => {
        onValue(ref(db1, "comment/" + id), (snapshot) => {
          const data = snapshot.val();

          if (data === null || data === undefined) {
            setComment1(null);
          }
        });
      })
      
  };
  const renderComment = () => {
    return comment1?.map((item, index) => {
      return (
        <div>
          <p>{item.username}</p>
          <p>{item.comment}</p>
          <button
            className="btn_deleteComment"
            onClick={() => {
              deleteComment(item.idComment);
            }}
          >
            Xóa
          </button>
        </div>
      );
    });
  };
  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
          alt=""
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
              alt=""
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail ? currentMovieDetail.original_title : ""}
            </div>
            <div className="movie__tagline">
              {currentMovieDetail ? currentMovieDetail.tagline : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
              <i className="fas fa-star" />
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.release_date
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre, index) => (
                    <span key={index} className="movie__genre" id={genre.id}>
                      {genre.name}
                    </span>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
        </div>
      </div>
      <div className="movie__links">
        <div className="movie__heading">Useful Link</div>
        {currentMovieDetail && currentMovieDetail.homepage && (
          <a
            href={currentMovieDetail.homepage}
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__homeButton movie__Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        {currentMovieDetail && currentMovieDetail.imdb_id && (
          <a
            href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id}
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__imdbButton movie__Button">
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div>
      <div>
        <form
          className="Comment"
          onSubmit={(e) => {
            submitComment(e);
          }}
        >
          <div className="input_comment">
            <input
              type="text"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button className="btn_comment">Click</button>
          </div>
          <div className="show_comment">
            {comment1 !== null ? renderComment() : <p></p>}
          </div>
        </form>
      </div>
    </div>
  );
};
export default Movie;
