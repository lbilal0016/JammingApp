import { useState } from 'react'
import './App.css'

import Header from './components/Header/Header.jsx';
import BodyContainer from './components/BodyContainer/BodyContainer.jsx'

function App() {

  const [searchText, setSearchText] = useState('');
  const [trackListText, setTrackListText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);

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
          song: 'Song',
          artist: 'artist',
          album: 'album',
          year: 'year',
          id: (i+1)  
          }
        )
      }
      setSearchResults(songList);
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

      />  
    </>
  )
}

export default App;