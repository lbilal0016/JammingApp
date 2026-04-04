import { useState } from 'react'
import './App.css'

import Header from './components/Header/Header.jsx';
import BodyContainer from './components/BodyContainer/BodyContainer.jsx'

function App() {

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchEntryHandler = e => {
    setSearchText(e.target.value);
  };

  const searchOnClickHandler = () => {
    //  placeholder song list
    const songList = []

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
  }

  return (
    <>
      <Header />
      <BodyContainer 
      searchText={searchText} 
      searchEntryHandler={searchEntryHandler} 
      searchResults={searchResults}
      searchOnClickHandler={searchOnClickHandler} 
      />  
    </>
  )
}

export default App;