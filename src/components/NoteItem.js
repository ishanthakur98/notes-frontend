import React, { useContext, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import NoteContext from '../context/notes/noteContext';
import AlertContext from '../context/alert/alertContext';

function NoteItem(props) {

    const context = useContext(NoteContext);
    const { deleteNote,editNote } = context;

    const alertcontext = useContext(AlertContext);
    const {showAlert} = alertcontext;

    const deleteItem = () => {
        deleteNote(props.id , showAlert);
        
    }

    const [note, setNote] = useState({ title: props.title, description: props.description, tag: props.tag })

    const handleClick = (event) => {
        event.preventDefault();
        editNote(props.id, note.title, note.description, note.tag , showAlert);
       
    }

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }

    const refreshNote = () => {
        setNote({ title: props.title, description: props.description, tag: props.tag })
    }


    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row g-3 align-items-center">
                                <div className="col-auto">
                                    <label htmlFor="title" className="col-form-label">title</label>
                                </div>
                                <div className="col-auto">
                                    <input required minLength={5} onChange={onChange} name='title' value={note.title} type="text" id="title" className="form-control" aria-describedby="titleHelpInline" />
                                </div>

                            </div>
                            <div className="row g-3 align-items-center">
                                <div className="col-auto">
                                    <label htmlFor="description" className="col-form-label">description</label>
                                </div>
                                <div className="col-auto">
                                    <input required minLength={5} onChange={onChange} name='description' value={note.description} type="text" id="description" className="form-control" aria-describedby="descriptionHelpInline" />
                                </div>

                            </div>
                            <div className="row g-3 align-items-center">
                                <div className="col-auto">
                                    <label htmlFor="tag" className="col-form-label">tag</label>
                                </div>
                                <div className="col-auto">
                                    <input required minLength={2} onChange={onChange} name='tag' value={note.tag} type="text" id="tag" className="form-control" aria-describedby="tagHelpInline" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={refreshNote} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={!note && (note.title.length < 5 || note.description.length < 5 || note.tag.length < 2)} type="button" onClick={handleClick} data-bs-dismiss="modal" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-sm-6 content-card">
                <div className="card-big-shadow">
                    <div className="card card-just-text" data-background="color" data-color="blue" data-radius="none">
                        <div className="icon">
                            <ClearIcon onClick={deleteItem} className='deleteIcon mx-3 my-3' />
                            <EditIcon data-bs-toggle="modal" data-bs-target="#exampleModal" className='editIcon mx-3 my-3' />
                        </div>
                        <div className="content">
                            <h6 className="category">{props.title}</h6>
                            <h4 className="title"><a href="#">{props.tag}</a></h4>
                            <p className="description">{props.description} </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem
