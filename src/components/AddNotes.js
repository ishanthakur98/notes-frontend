import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext';
import AlertContext from '../context/alert/alertContext';


function AddNotes() {

    const context = useContext(NoteContext);
    const {addNote} = context;

    const alertcontext = useContext(AlertContext);
    const {showAlert} = alertcontext;


    

    const [note , setNote] = useState({title:"",description:"",tag:""})

    const handleClick = (event) => {
        event.preventDefault();
        addNote(note.title,note.description,note.tag , showAlert);
        setNote({title:"",description:"",tag:""});
        
    }

    const onChange = (event) => {
        setNote({...note,[event.target.name]:event.target.value})
    }

    

  return (
    <div>
      <h1>Add a note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">title</label>
          <input value={note.title} required minLength={5} onChange = {onChange} name = "title"  type="text" className="form-control" id="title" />
          <div id="emailHelp" className="form-text">We'll never share your notes with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">description</label>
          <input value={note.description} required minLength={5} onChange = {onChange} name = "description" type="text" className="form-control" id="description" />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="tag">tag</label>
          <input value={note.tag} required minLength={2} name = "tag" onChange = {onChange} type="tag" className="form-control" id="tag" />
        </div>
        <button disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 2} type="submit" onClick={handleClick} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default AddNotes
