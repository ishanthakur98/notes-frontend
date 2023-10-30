import { useNavigate } from "react-router-dom";
import NoteContext from "./noteContext";
import React, { useEffect, useState } from "react";

const NoteState = (props) => {
    const navigate = useNavigate();

    const host = "http://localhost:8080";
    let token = "";

    function fetchLoginToken() {
        return localStorage.getItem("token");
    }

    async function fetchAllNotes() {
        const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": fetchLoginToken()
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

        });
        const json = await response.json();
        setNotes(json);
    }

    useEffect(() => {
        console.log("fetching")
        if (localStorage.getItem("token")) {
            fetchAllNotes();
        } else {
            navigate("/login")
        }

    }, []);

    // const 
    const [notes, setNotes] = useState([]);

    function clearNotes() {
        setNotes([]);
    }

    async function addNote(title, description, tag, showAlert) {
        let newNote = {
            title: title,
            description: description,
            tag: tag
        }

        const response = await fetch(`${host}/api/notes/addNotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": fetchLoginToken()
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: JSON.stringify(newNote), // body data type must match "Content-Type" header
        });
        if (response.status !== 200) {
            showAlert("Uanle to add note", "danger")
            return;
        }
        showAlert("Note added", "success")
        const json = await response.json();
        setNotes(notes.concat(json))
    }

    async function deleteNote(id, showAlert) {
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: "DELETE",

            headers: {
                "Content-Type": "application/json",
                "token": fetchLoginToken()
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

        });
        if (response.status !== 200) {
            showAlert("Unable to delete note", "danger")
        }
        // const json = response.json();
        showAlert("Note deleted", "success")
        let newNotes = notes.filter(e => e._id !== id)
        setNotes(newNotes);
    }

    async function editNote(id, title, description, tag, showAlert) {
        let newNote = {
            title: title,
            description: description,
            tag: tag
        }

        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token": fetchLoginToken()
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: JSON.stringify(newNote), // body data type must match "Content-Type" header
        });
        // const json = response.json();
        if (response.status !== 200) {
            showAlert("Unable to edit note", "danger")
            return;
        }
        showAlert("Note updated", "success")
        let newNotes = JSON.parse(JSON.stringify(notes))

        for (let i = 0; i < newNotes.length; i++) {
            if (newNotes[i]._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }

        }
        // console.log(newNotes)
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, fetchAllNotes, clearNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;