import './App.css';
import {useEffect, useState} from "react";
import MapComponent from './Components/mapComponent.jsx';

function App() {
    const [data, setData] = useState([]);

    const addNewPost = async (title, text, price, link, latitude, longitude) => {
        try {
            await fetch(process.env.REACT_APP_API_URL, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({title, text, price, link, latitude, longitude}),
            });
            await fetchPosts();
        } catch (err) {
            throw err;
        }
    };

    const editPost = async (id, title, text, price, link, latitude, longitude) => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({title, text, price, link, latitude, longitude}),
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
            <MapComponent data={data} deletePost={deletePost} editPost={editPost} addNewPost={addNewPost}/>
        </div>
    );
}

export default App;
