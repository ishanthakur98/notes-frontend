import React, { useState } from "react";
import AlertContext from "./alertContext";

const AlertState = (props) => {

    const [alert, setAlert] = useState(null);
 

    function showAlert(msg, type) {
        setAlert({
            type: type,
            msg: msg
        });
        setTimeout(() => {
            setAlert(null);
        }, 3000)
    }

    return (
        <AlertContext.Provider value={{showAlert ,alert}}>
            {props.children}
        </AlertContext.Provider>
    )
}
export default AlertState;