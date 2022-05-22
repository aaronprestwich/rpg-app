import React, {useState, useRef} from 'react';
import './App.css';
import Container from './Components/Container';


function App() {
  const [monsters, setMonsters] = useState()
  
    return (
    <div className="App">
      <Header/>
      <Container/>
    </div>
  );
}

const Header = () => {
  return(
    <div>
      <h1>Monster Generator</h1>
    </div>
  );
}
export default App;
