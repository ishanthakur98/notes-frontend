import './App.css';
import { Routes, /* instead of "Switch" */ Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Register from './components/Register';
import { useContext, useState } from 'react';
import AlertContext from './context/alert/alertContext';
import NoteContext from './context/notes/noteContext';


function App() {

  const context = useContext(AlertContext);
  const {alert} = context;

  return (
    <>
      <NoteState>
        <Navbar></Navbar>
        <Alert style = {{height:"50%"}} alert={alert}/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />
            } />
            <Route exact path="/home" element={<Home />
            } />
            <Route exact path="/about" element={<About />
            } />
            <Route exact path="/login" element={<Login />
            } />
            <Route exact path="/register" element={<Register />
            } />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
