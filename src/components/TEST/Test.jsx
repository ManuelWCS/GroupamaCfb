import { useEffect, useState } from 'react';
import axios from 'axios';
import { FETCH } from './../../Fetch';

const Test = () => {
    const [info, setInfo] = useState([]);

    useEffect(() => {
        const fetchTest = () => {
            axios
            .get('http://localhost:8000/api/clubs')
            .then(res => setInfo(res.data))
        }
        fetchTest()
    }, [])

    return (
        <div>
            <h2>Liste des administrateurs</h2>
            {info.map((info) => (
                <div key={info.id}>
                    {info.name} {info.ville}
                </div>
            ))}
        </div>
    )

}

export default Test;