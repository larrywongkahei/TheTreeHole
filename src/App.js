import React from 'react';
import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import SignupPage from './Components/Signup';
import Query from './Components/Query';
import SigninPage from './Components/Signin';
import Header from './Components/Header';
import Background from './videos/Background.svg'
import Footer from './Components/Footer';
import Sound from 'react-sound';
import rainSound from './sounds/raining.mp3'
import LandingPage from './Components/LandingPage';
import Introducion from './Components/Introduction';
import MainPage from './Components/MainPage'
import Profile from './Components/Profile'
import API from './Helper/ApiHelper';
import Forum from './Components/Forum';

function App() {

  // Three Data fetched from API
  const [titleList, setTitles] = useState([])
  const [commentList, setComments] = useState([])
  const [playing, setPlaying] = useState(false)
  const [usernames, setUsername] = useState([])
  const [privateTitlesList, setPrivateTitles] = useState([])
  const [loggedInUserID, setLoggedInUserID] = useState({})
  const [loggedInStatus, setLoggedInStatus] = useState(false)
  const [allCommentInteractions, setAllCommentInteractions] = useState([])

  
  // Fetch Data from API
  useEffect(() => {
    const getdata = async () => {
      const fetchTitles = await fetch('https://thetreeholebackend.herokuapp.com/api/Titles');
      const titlesData = await fetchTitles.json()
      const fetchComments = await fetch('https://thetreeholebackend.herokuapp.com/api/Comments');
      const commentsData = await fetchComments.json()
      const fetchUsernames = await fetch('https://thetreeholebackend.herokuapp.com/api/Create');
      const usernames = await fetchUsernames.json()
      const fetchPrivateTitles = await fetch('https://thetreeholebackend.herokuapp.com/api/PrivateComments');
      const privateTitles = await fetchPrivateTitles.json()
      const fetchCommentInteraction = await fetch('https://thetreeholebackend.herokuapp.com/api/CommentInteractions');
      const CommentInteractionData = await fetchCommentInteraction.json()
        // To update the state every 10 seconds
      setInterval(updateData, 5000)


      // Set the data fetched to the State
      Promise.all(titlesData, commentsData, usernames, privateTitles, CommentInteractionData)
      .then(
      setTitles(titlesData),
      setComments(commentsData),
      setUsername(usernames),
      setPrivateTitles(privateTitles),
      setAllCommentInteractions(CommentInteractionData)
      )
    }
    getdata()
  }, [])

  function updateData () {
    updateCommentInteractions()
    updateComments()
    updateTitles()
    updatePrivateTitles()
    updateFavourite()
    updateUserNames()
  }
  




  // POST

  async function createPrivateTitles(data){
    await API.createPrivateTitles(data)
    updatePrivateTitles()
  }

  async function createCommentInteractions(){
    await API.createCommentInteractions()
    updateCommentInteractions()
  }

  async function createComment(data){
    await API.createComment(data)
    updateComments()
  }

  async function createTitle(data){
    await API.createTitle(data)
    updateTitles()
  }
    

  async function createUser(data){
    await API.createUser(data)
    .then(res => {
      if (res){
        API.getLatestUsers()
        .then(data => {
        setUsername(data)
        setLoggedInStatus(true)
        setLoggedInUserID(res)
      })
    }
  })
  }

  async function Login(data){
    await API.Login(data)
      .then(res => {
      if (res){
        API.getLatestUsers()
        .then(data => {
          setUsername(data)
        setLoggedInStatus(true)
        setLoggedInUserID(res)
      })
      }
  })
}


  // PUT
  async function putCommentInteractions(data){
    await API.putCommentInteractions(data)
    updateCommentInteractions()
  }
  



  // GET
  // Update date after posting or putting to database.

  async function updateComments(){
    const newComments = await API.getComments()
    setComments(newComments)
  }

  async function updateTitles(){
    const newTitles = await API.getTitles()
    setTitles(newTitles)
  }

  async function updatePrivateTitles(){
    const newPrivateTitles = await API.getPrivateTitles()
    setPrivateTitles(newPrivateTitles)
  }

  async function updateCommentInteractions(){
    const newCommentinteractiion = await API.getCommentInteractions()
    setAllCommentInteractions(newCommentinteractiion)
  }

  async function updateUserNames(){
    const newUserNames = await API.getLatestUsers()
    setUsername(newUserNames)
  }


  function handleplaying() {
    setPlaying(!playing)
  }

  async function handleAddFavouriteToUser(data){
    await API.updateFavourite(data)
    updateUserNames()
  }

  async function handleRemoveFavouriteFromUser(theUser, titleId){
    const theFavouriteArray = removeCentainFavouriteFromUser(theUser, titleId)
    const data = {
      'id' : theUser.id,
      'favourite' : theFavouriteArray
    }
    await API.updateFavourite(data)
    updateUserNames()
  }

  function removeCentainFavouriteFromUser(user, titleId){
    const favouriteArray = user.favourite.split(",")
    const newFavouriteArray = favouriteArray.filter(each => each !== titleId.toString())
    const theFavouriteArray = newFavouriteArray.join(",")
    return theFavouriteArray
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* <video
      src={SunnyTree}
        autoPlay
        loop
        muted
        style={{
          height: "100%",
          width: "100%",
          top: "0",
          right: "0",
          padding: "none",
          position: "fixed",
          zIndex: "-1",
          objectFit:"cover",
        }}>
      </video> */}
      <img src={Background} 
              style={{
                height: "100%",
                width: "100%",
                top: "0",
                right: "0",
                padding: "none",
                position: "fixed",
                zIndex: "-1",
                objectFit:"cover",
              }}/>
      <Sound
        url={rainSound}
        playStatus={playing ? Sound.status.PLAYING : Sound.status.STOPPED}
        autoLoad={true}
        loop={true}
      />
      <HashRouter>
        <Header loggedInStatus={loggedInStatus}/>
        <Routes>
          <Route path="/" element={
          <LandingPage handlePlaying={handleplaying} />
          } />

          <Route path="/query" element={
          <Query />
          } />

          <Route path="/signup" element={
          <SignupPage createUser={createUser}
          loggedInStatus={loggedInStatus}/>
          } />

          <Route path="/signin" element={
          <SigninPage Login={Login}
          loggedInStatus={loggedInStatus}/>
          } />

          <Route path="/introduction" element={
          <Introducion />
          } />

          <Route path="/home" element={
          <MainPage createTitle={createTitle}
          titleList={titleList}
          createComment={createComment}
          commentList={commentList}
          createPrivateTitles={createPrivateTitles}
          loggedInUserID={loggedInUserID}
          usernames={usernames}
          createCommentInteractions={createCommentInteractions}
          handleAddFavouriteToUser={handleAddFavouriteToUser}
          handleRemoveFavouriteFromUser={handleRemoveFavouriteFromUser} />
          } />

          <Route path="/profile" element={
          <Profile titleList={titleList}
          privateTitlesList={privateTitlesList}
          loggedInUserID={loggedInUserID}
          commentList={commentList}
          usernames={usernames} />
          } />

          <Route path="/forum/:titleID" element={
          <Forum commentList={commentList}
          usernames={usernames}
          createComment={createComment}
          loggedInStatus={loggedInStatus}
          loggedInUserID={loggedInUserID}
          titleList={titleList}
          allCommentInteractions={allCommentInteractions}
          putCommentInteractions={putCommentInteractions}
          createCommentInteractions={createCommentInteractions}
          handleAddFavouriteToUser={handleAddFavouriteToUser}
          handleRemoveFavouriteFromUser={handleRemoveFavouriteFromUser}/>
          } />
          
        </Routes>
        <Footer className="mt-12"/>
      </HashRouter>
    </div>

  );
}

export default App;

