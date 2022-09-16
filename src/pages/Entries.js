import axios from "axios";
import { useEffect } from "react";

function Entries () {


    useEffect(() => {
        getEntries();
    }, []);

    const getEntries = () => {
        axios
        .get('https://dnd-manager-backend.herokuapp.com/')
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.error(err)
        })
    };







    return (
        <div>
            <h1>View Entries</h1>
        </div>
    )
}

export default Entries; 