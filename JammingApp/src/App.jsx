import { useState } from 'react'
import './App.css'

import Header from './components/Header/Header.jsx';
import BodyContainer from './components/BodyContainer/BodyContainer.jsx'

function App() {

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(
    [
      {
        song: 'Song',
        artist: 'artist',
        album: 'album',
        year: 'year'    
      }, 
      {
        song: 'Song',
        artist: 'artist',
        album: 'album',
        year: 'year'    
      }
    ]
  );

  const searchEntryHandler = e => {
    setSearchText(e.target.value);

  };

  return (
    <>
      <Header />
      <BodyContainer 
      searchText={searchText} 
      searchEntryHandler={searchEntryHandler} 
      searchResults={searchResults} 
      />  
    </>
  )
}

export default App;