import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
function App() {
  const [alert,setAlert]=useState({type:"",msg:""})
  const showAlert=(msg,type)=>{
    setAlert({
      msg:msg,
      type:type
    })
    setTimeout(() => {
      setAlert({type:"",msg:""})
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container d-flex justify-content-center">
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert}/>} />
            <Route path="About" element={<About />} />
            <Route path="Login" element={<Login showAlert={showAlert} />} />
            <Route path="Signup" element={<Signup showAlert={showAlert} />} />

          </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
