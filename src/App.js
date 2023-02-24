import React from 'react';
import { useEffect, useState } from 'react';
import NavBar from './Components/NavBar';
import TitleContainer from './Components/TitleContainer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from './Components/Signup';
import Query from './Components/Query';
import SigninPage from './Components/Signin';
import Header from './Components/Header';
import Rain2 from './videos/Rain2.mp4';
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
  const [usernames, setUsername] = useState({})
  const [userComments, setUserComments] = useState([])
  const [loggedInUserID, setLoggedInUserID] = useState({})
  const [loggedInStatus, setLoggedInStatus] = useState(false)

  
  // Fetch Data from API
  useEffect(() => {
    const getdata = async () => {
      const fetchTitles = await fetch('https://thetreeholebackend.herokuapp.com/api/Titles');
      const titlesData = await fetchTitles.json()
      const fetchComments = await fetch('https://thetreeholebackend.herokuapp.com/api/Comments');
      const commentsData = await fetchComments.json()
      const fetchUsernames = await fetch('https://thetreeholebackend.herokuapp.com/api/Create');
      const usernames = await fetchUsernames.json()
      const fetchUserComments = await fetch('https://thetreeholebackend.herokuapp.com/api/PrivateComments')
      const privateComments = await fetchUserComments.json()
      // Set the data fetched to the State
      Promise.all(titlesData, commentsData, usernames, privateComments)
      .then(
      setTitles(titlesData),
      setComments(commentsData),
      setUsername(usernames),
      setUserComments(privateComments)
      )
    }
    getdata()
  }, [])
  console.log(titleList)


  async function createUser(data){
    await API.createUser(data)
    .then(res => {
      if (res){
        API.getLatestUsers()
        .then(data => setUsername(data))
        setLoggedInStatus(true)
        setLoggedInUserID(res)
      }
    })
  }

  async function Login(data){
    await API.Login(data)
      .then(res => {
      if (res){
        API.getLatestUsers()
        .then(data => setUsername(data))
        setLoggedInStatus(true)
        setLoggedInUserID(res)
      }
  })
}
  
  async function createPrivateComments(data){
    await API.createPrivateComments(data)
    const newPrivateComments = await API.getPrivateComments()
    setUserComments(newPrivateComments)
  }

  async function createTitle(data){
    await API.createTitle(data)
    const newTitles = await API.getTitles()
    setTitles(newTitles)

  }

  async function createComment(data){
    await API.createComment(data)
    const newComments = await API.getComments()
    setComments(newComments)
  }
    
  function handleplaying() {
    setPlaying(!playing)
  }
  return (
    <div className="flex flex-col min-h-screen pb-20">
      {window.location.pathname !== "/" ? <video
        src={Rain2}
        autoPlay
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
      </video> : null}
      <Sound
        url={rainSound}
        playStatus={playing ? Sound.status.PLAYING : Sound.status.STOPPED}
        autoLoad={true}
        loop={true}
      />
      <BrowserRouter>
        <Header loggedInStatus={loggedInStatus}/>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage handlePlaying={handleplaying} />} />
          <Route path="/query" element={<Query />} />
          <Route path="/signup" element={<SignupPage createUser={createUser} loggedInStatus={loggedInStatus}/>} />
          <Route path="/signin" element={<SigninPage Login={Login} loggedInStatus={loggedInStatus}/>} />
          <Route path="/introduction" element={<Introducion />} />
          <Route path="/home" element={<MainPage createTitle={createTitle} titleList={titleList} createComment={createComment} commentList={commentList} createPrivateComments={createPrivateComments} loggedInUserID={loggedInUserID} usernames={usernames}/>} />
          <Route path="/profile" element={<Profile titleList={titleList} userComments={userComments} loggedInUserID={loggedInUserID}/>} />
          <Route path="/forum/:titleID" element={<Forum commentList={commentList} usernames={usernames} createComment={createComment} loggedInStatus={loggedInStatus} loggedInUserID={loggedInUserID} titleList={titleList}/>} />
        </Routes>
        <TitleContainer titleList={titleList} />
        <Footer className="mt-12"/>
      </BrowserRouter>
    </div>

  );
}

export default App;
