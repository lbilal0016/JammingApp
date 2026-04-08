import { useState, useEffect } from 'react'
import './App.css'

import Header from './components/Header/Header.jsx';
import BodyContainer from './components/BodyContainer/BodyContainer.jsx';

//  CLIENT_ID and CLIENT_SECRET are not valid here since they cannot be shared openly, they need to be created before the application is started
const CLIENT_ID = '8352906fdc114e00970b97d1519dce6f';
const CLIENT_SECRET = '1a896e0ec4684a5893bd827179e7fd5b';

function App() {

  const [searchText, setSearchText] = useState('');
  const [trackListText, setTrackListText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [tracks, setTracks] = useState([]);

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

    let searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    let trackID = await fetch('https://api.spotify.com/v1/search?q=' + searchText + '&type=track&limit=10', searchParameters)
    .then(response => response.json())
    .then(data => {

      //  fill tracks array
      data.tracks.items.forEach((track) => {
        setTracks((prev) => [...prev, track]);
      });

      //  fill searchResults array
      tracks.forEach((trackResult) => {
        setSearchResults((prev) => {
          return [...prev, {
            song: trackResult.name,
            artist: trackResult.artists[0].name,
            album: trackResult.album.name,
            year: trackResult.album.release_date.substring(0,4),
            id: trackResult.id
          }]
        })
      });
    });
  };

  const searchEntryHandler = e => {
    setSearchText(e.target.value);
  };

  const trackListTextHandler = e => {
    setTrackListText(e.target.value);
  };

  const searchOnClickHandler = () => {

    setSearchResults([]);
    setTracks([]);
    
    if(searchText !== ''){
      searchSpotify();
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
      enterKeyHandler={enterKeyHandler}

      />  
    </>
  )
}

export default App;