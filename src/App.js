import React, {useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="App" data-theme={darkMode ? 'dark' : 'light'}>
      <Header />  
      <Home darkMode={darkMode} setDarkMode={setDarkMode}/>
    </div>
  );
}

export default App;
