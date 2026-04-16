import { useState, useEffect } from 'react'
import './App.css'

import Header from './components/Header/Header.jsx';
import BodyContainer from './components/BodyContainer/BodyContainer.jsx';

//  CLIENT_ID and CLIENT_SECRET are not valid here since they cannot be shared openly, they need to be created before the application is started
const CLIENT_ID = '8352906fdc114e99870b97d1519dce6f';
const CLIENT_SECRET = '1a896e0ec5795a4783bd938279e7fd5b';

//  Spotify endpoint http request string components
const SPOTIFY_AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';
const REDIRECT_URL_AFTER_LOGIN = "http://127.0.0.1:5173/";

//  User permissions to be asked from Spotify API
const SCOPES = ['playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-private', 'playlist-modify-public'];

//  Scopes url parameters
const SPACE_DELIMITER = '%20';
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

function App() {

  const [searchText, setSearchText] = useState('');
  const [trackListText, setTrackListText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [uriArray, setUriArray] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //  API Access Token
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET,
      cache: 'no-cache'
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => {
      if(result.ok){
        return result.json();
      }
      throw new Error('Request Failed!');
    }, networkError => {
      console.log(networkError.message);
    })
    .then(data => {
      //  console.log(data.access_token);
      setAccessToken(data.access_token);
    })
  }, []);

  async function searchSpotify(){
    console.log('Search for ' + searchText);

    //  get request using search to get the Artist ID

    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };

    let trackID = await fetch('https://api.spotify.com/v1/search?q=' + searchText + '&type=track&limit=5', searchParameters)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      //  fill searchResults array
      data.tracks.items.forEach((trackResult) => {
        setSearchResults((prev) => {
          return [...prev, {
            song: trackResult.name,
            artist: trackResult.artists[0].name,
            album: trackResult.album.name,
            year: trackResult.album.release_date.substring(0,4),
            id: trackResult.id,
            uri: trackResult.uri
          }]
        })
      });
    });
  };

  async function createSpotifyPlaylist(){
    const postParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };

    //  get the playlist name from state variable 
    const playListName = trackListText === '' ? 'New Playlist' : trackListText;

    const createPlaylist = await fetch('https://api.spotify.com/v1/me/playlists?name=' + playListName + '&public=false', postParameters)
    .then(response => response.json())
    .then( data => {
      console.log(data);
    });
  };

  /*  not implemented yet
  async function addSpotifyPlaylist(){
    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };


  };*/

  const searchEntryHandler = e => {
    setSearchText(e.target.value);
  };

  const trackListTextHandler = e => {
    setTrackListText(e.target.value);
  };

  const searchOnClickHandler = () => {
    //  clear previous results
    setSearchResults([]);
    
    //  set new results if a non-empty search query was made
    if(searchText !== ''){
      searchSpotify();
    }
  };

  //  Dummy function 
  const loginOnClickHandler = () => {
    if(!isLoggedIn){
      setIsLoggedIn(true);
      window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=code&show_dialog=true`;
    }
  };

  const enterKeyHandler = (e) => {
    //  making searches when pressing enter instead of clicking on 'Search' button
    if(e.key === 'Enter'){
      searchOnClickHandler();
    }
  };

  const addSongHandler = (newSong) => {
    setSelectedSongs(prevSelectedSongs => [...prevSelectedSongs, newSong]);
  };

  const removeSongHandler = (removedSongId) => {
    setSelectedSongs((prevSelectedSongs) => {
      return prevSelectedSongs.filter((selectedSong) => {
        return selectedSong.id !== removedSongId;
      })
    });
  };

  const printSongs = () => {
        let addedSongs = [];
        selectedSongs.map((songItem) => {
          addedSongs += songItem.song;
          addedSongs += ', ';
          addedSongs += songItem.artist;
          addedSongs += ', ';
          addedSongs += songItem.year;
          addedSongs += '\n';
        });
        return addedSongs;
  };


  const addSpotifyHandler = () => {
    //  Dummy functionality for add spotify handler button
    alert(`Your tracklist with the following name has been created with the songs you have selected: ${trackListText}.\nAdded songs:\n${printSongs()}`);

    //  Save track uri to uriArray
    if(selectedSongs.length > 0){
      selectedSongs.forEach((song) => {
        //  add song uri to uriArray if it was not added before
        if(!uriArray.includes(song.uri)){
          setUriArray((prev) => [...prev, song.uri]);
        }
      });
    } else {
      //  if nothing is selected empty the uriArray
      setUriArray([]);
    }
      //  uriArray.forEach((uri) => {console.log(uri)});
      createSpotifyPlaylist();
  };

  return (
    <>
      <Header />
      <BodyContainer 
      searchText={searchText} 
      searchEntryHandler={searchEntryHandler} 
      searchResults={searchResults}
      searchOnClickHandler={searchOnClickHandler}
      loginOnClickHandler={loginOnClickHandler}
      trackListText={trackListText}
      trackListTextHandler={trackListTextHandler}
      selectedSongs={selectedSongs}
      addSongHandler={addSongHandler}
      removeSongHandler={removeSongHandler}
      addSpotifyHandler={addSpotifyHandler}
      enterKeyHandler={enterKeyHandler}
      isLoggedIn={isLoggedIn}

      />  
    </>
  )
}

export default App;