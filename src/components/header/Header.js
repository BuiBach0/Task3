import React, { useEffect, useState } from "react"
import "./Header.css"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../../firebase-config"

const Header = () => {
    const [profile, setProfile] = useState()
    function onSignOut() {
    signOut(auth)
    nav("/")
    // setProfile(null);
  }
    const nav=useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
              setProfile(user);
       
      } else {
        setProfile(null)
        console.log('yeah that wat happened')
      }

    })
  }, [])
    return (
        <>
        <div className="header">
            <div className="headerLeft">
                <Link to="/home"><img className="header__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" /></Link>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
                <button  className=" button-signOut"onClick={onSignOut}>Sign Out</button>
            </div>
            
        </div>
        <Outlet></Outlet>
        </>
    )
}

export default Header