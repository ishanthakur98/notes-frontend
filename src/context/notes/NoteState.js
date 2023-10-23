import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
    const notesList = 
    [{
        "_id": "653688b5e079e3a6803d0d1c",
        "user": "652d6d25f9f0919979b7479e",
        "title": "my first note",
        "description": "hello world",
        "tag": "other",
        "date": "2023-10-23T14:52:37.911Z",
        "__v": 0
        },{
            "_id": "653688b5e079e3a6803d0d1c",
            "user": "652d6d25f9f0919979b7479e",
            "title": "my first note",
            "description": "hello world",
            "tag": "other",
            "date": "2023-10-23T14:52:37.911Z",
            "__v": 0
          }]
        // const 
    const [notes , setNotes] = useState(notesList)
    
    return (
        <NoteContext.Provider value={{notes , setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;