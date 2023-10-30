import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/noteContext'
import '../assets/Notes.css';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';


function Notes() {

  const navigate = useNavigate();
  
  const  context = useContext(NoteContext);
  const  {notes , fetchAllNotes}  = context;
  

  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/login")
  }
    
  fetchAllNotes();
  }, []);

  function updateNote(id) {

  }
  return (
    <>
      <div className='container bootstrap snippets bootdeys'>
        <div className="row">
          {notes && notes.map((note) => (
            <NoteItem updateNote={updateNote} id={note._id} key={note._id} title={note.title} tag={note.tag} description={note.description} />

          ))}
        </div>
      </div>
    </>
  )
}

export default Notes
