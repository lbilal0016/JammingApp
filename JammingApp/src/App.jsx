import { useState, useEffect } from 'react'
import './App.css'

import Header from './components/Header/Header.jsx';
import BodyContainer from './components/BodyContainer/BodyContainer.jsx';

const CLIENT_ID = '8352906fdc125e99870b97d1519dce6f';
const CLIENT_SECRET = '1a896e0ec5784a4783bd827179e7fd5b';

function App() {

  const [searchText, setSearchText] = useState('');
  const [trackListText, setTrackListText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [accessToken, setAccessToken] = useState('');

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
        return result.json()
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

    let artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    let artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchText + '&type=artist', artistParameters)
    .then(response => response.json())
    .then(data => console.log(data));
    // get request with Artist ID grab all the albums from the artist

    // Display albums to user

  };

  const searchEntryHandler = e => {
    setSearchText(e.target.value);
  };

  const trackListTextHandler = e => {
    setTrackListText(e.target.value);
  };

  const searchOnClickHandler = () => {
    //  placeholder song list
    const songList = [];

    if(searchText !== ''){
      //  placeholder 
      const numSongs = 2;
      for(let i = 0; i < numSongs; i++){
        songList.push(
          {
          song: 'Welcome to the Jungle',
          artist: 'Guns \'n Roses',
          album: 'album',
          year: 'year',
          id: (i+1)  
          }
        )
      }
      setSearchResults(songList);
      searchSpotify();
    } else{
      setSearchResults([]);
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
  };

  return (
    <>
      <Header />
      <BodyContainer 
      searchText={searchText} 
      searchEntryHandler={searchEntryHandler} 
      searchResults={searchResults}
      searchOnClickHandler={searchOnClickHandler}
      trackListText={trackListText}
      trackListTextHandler={trackListTextHandler}
      selectedSongs={selectedSongs}
      addSongHandler={addSongHandler}
      removeSongHandler={removeSongHandler}
      addSpotifyHandler={addSpotifyHandler}

      />  
    </>
  )
}

export default App;