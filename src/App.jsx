import './App.css';
import {useEffect, useState} from "react";
import MapComponent from './Components/mapComponent.jsx';

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const addNewPost = async (title, text, price, currency, link, latitude, longitude) => {
        try {
            await fetch(process.env.REACT_APP_API_URL, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({title, text, price, currency, link, latitude, longitude}),
            });
            await fetchPosts();
        } catch (err) {
            throw err;
        }
    };

    const editPost = async (id, title, text, price, currency, link, latitude, longitude) => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({title, text, price, currency, link, latitude, longitude}),
            });
            await fetchPosts();
        } catch (err) {
            throw err;
        }
    };

    const deletePost = async (id) => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
                method: "DELETE",
            });
            await fetchPosts();
        } catch (err) {
            throw err;
        }
    };

    const fetchPosts = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_API_URL);
            const json = await res.json();
            setLoading(false);
            const dataArray = json.data;
            setData(dataArray.reverse());
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="App">
            {loading && <div className='loading'>LOADING...</div>}
            <MapComponent data={data} deletePost={deletePost} editPost={editPost} addNewPost={addNewPost}/>
        </div>
    );
}

export default App;
