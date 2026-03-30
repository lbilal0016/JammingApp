import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import Header from './components/Header/Header.jsx';
import BodyContainer from './components/BodyContainer/BodyContainer.jsx'

function App() {

  const [searchText, setSearchText] = useState('');

  const searchEntryHandler = e => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <Header />
      <BodyContainer searchText={searchText} searchEntryHandler={searchEntryHandler} />  
    </>
  )
}

export default App
