import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [height,setHeight]=useState(100);
  const [width,setWidth]=useState(100);
  console.log(height,setHeight);

  return (
    <div className="App">
      <button onClick={()=>{
        setHeight("130")
        setWidth(130)
      }}>+</button>
      <div style={{
        height:height,
        width:width,
        backgroundColor:"blue"
      }}></div>
      <button onClick={()=>{
        setHeight(height-30)
        setWidth(width-30)
      }}>-</button>
    </div>
  );
}

export default App;
