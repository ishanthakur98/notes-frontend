import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'
import '../assets/Notes.css';
import NoteItem from './NoteItem';

function Notes() {

    const context = useContext(NoteContext);
    const {notes , setNotes} = context;
  return (
    <div className='container bootstrap snippets bootdeys'>  
    <div class="row">
      {notes.map((note) => (
        <NoteItem title={note.title} tag={note.tag} description={note.description} /> 
        
      ))}
      </div>
    </div>
  )
}

export default Notes
