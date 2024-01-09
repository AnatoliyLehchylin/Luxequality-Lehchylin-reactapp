import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, CircleMarker, useMapEvents, Tooltip} from 'react-leaflet';
import Card from "./card";
import Slider from 'react-slick';
import 'leaflet/dist/leaflet.css';
import './style.css'

const MapComponent = (props) => {
    const {data, deletePost, editPost, addNewPost} = props;
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [visibleMarkers, setVisibleMarkers] = useState([]);
    const [currentMap, setCurrentMap] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [price, setPrice] = useState('');
    const [link, setLink] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [activePostId, setActivePostId] = useState(null);
    const [add, setAdd] = useState(false);

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        adaptiveHeight: true,
        arrows: false,
    };

    const handleMarkerClick = (markerIndex) => {
        setSelectedMarker(visibleMarkers[markerIndex]);
    };

    const handleMapClick = (e) => {
        if (add) {
            setLatitude(e.latlng.lat.toFixed(6));
            setLongitude(e.latlng.lng.toFixed(6))
        }
    };

    const MapEvents = () => {
        const map = useMapEvents({
            click: (e) => {
                handleMapClick(e);
            },
            zoomend: () => {
                const bounds = map.getBounds();
                const visibleMarkers = markers.filter((marker) => bounds.contains([marker.latitude, marker.longitude]));
                setVisibleMarkers(visibleMarkers);
                setSelectedMarker(null);
            },
            moveend: () => {
                const bounds = map.getBounds();
                const visibleMarkers = markers.filter((marker) => bounds.contains([marker.latitude, marker.longitude]));
                setVisibleMarkers(visibleMarkers);
                setSelectedMarker(null);
            },
        });

        useEffect(() => {
            setCurrentMap(map);
        }, [map]);

        return null;
    };

    //-------------------------------------
    const isEdit = (item) => {
        setActivePostId(item._id);
        setTitle(item.title);
        setText(item.text);
        setPrice(item.price);
        setLink(item.link);
        setLatitude(item.latitude);
        setLongitude(item.longitude);
        setAdd(false);
    };

    const isCancel = () => {
        setActivePostId(null);
        setTitle('');
        setText('');
        setPrice('');
        setLink('');
        setLatitude('');
        setLongitude('');
    };

    const isClear = () => {
        setTitle('');
        setText('');
        setPrice('');
        setLink('');
        setLatitude('');
        setLongitude('');
        setAdd(false);
    };

    const isAdd = () => {
        setAdd(!add)
    };

    const addNewPostPlus = () => {
        addNewPost(title, text, price, link, latitude, longitude);
        setAdd(false);
    }

    function titleChange(e) {
        setTitle(e.target.value);
    }

    function textChange(e) {
        setText(e.target.value);
    }

    function priceChange(e) {
        setPrice(e.target.value);
    }

    function linkChange(e) {
        setLink(e.target.value);
    }

    function latitudeChange(e) {
        setLatitude(e.target.value);
    }

    function longitudeChange(e) {
        setLongitude(e.target.value);
    }

    useEffect(() => {
        setMarkers([]);
        setVisibleMarkers([]);

        setActivePostId(null);
        setTitle('');
        setText('');
        setPrice('');
        setLink('');
        setLatitude('');
        setLongitude('');

        data.forEach((item) => {
            const loadPosition = {latitude: item.latitude, longitude: item.longitude, title: item.title, id: item._id};
            setMarkers(prevMarkers => [...prevMarkers, loadPosition]);
        });
    }, [data]);

    useEffect(() => {
        if (currentMap) {
            const bounds = currentMap.getBounds();
            const visibleMarkers = markers.filter((marker) => bounds.contains([marker.latitude, marker.longitude]));
            setVisibleMarkers(visibleMarkers);
        }
    }, [markers, currentMap]);

    useEffect(() => {
        const filteredData = data.filter(item => visibleMarkers.some(marker => marker.id === item._id));
        setFilteredData(filteredData);
    }, [visibleMarkers]);

    useEffect(() => {
        if (selectedMarker) {
            const filteredData = data.filter(item => selectedMarker.id === item._id);
            setFilteredData(filteredData);
        }
    }, [selectedMarker]);

    return (
        <div>
            <div style={{marginTop: "10px"}}>
                {(!add && !activePostId) && <button className='button' onClick={() => isAdd()}>ADD</button>}
                {add && (
                    <div>
                        <input placeholder={'title'} value={title} onChange={titleChange}/>
                        <input placeholder={'text'} value={text} onChange={textChange}/>
                        <input placeholder={'price'} value={price} onChange={priceChange}/>
                        <input placeholder={'link (not necessary)'} value={link} onChange={linkChange}/>
                        <input placeholder={'latitude'} value={latitude} onChange={latitudeChange}/>
                        <input placeholder={'longitude'} value={longitude} onChange={longitudeChange}/>
                        <div style={{fontSize: "15px", color: "gray"}}>(Введіть коордінати місця вручну, або клікніть по
                            мапі)
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "15px",
                            color: "gray"
                        }}>Приклади посилань на фото:
                            <div style={{
                                paddingLeft: "10px",
                                textDecoration: "underline",
                                color: "black"
                            }}>https://starterok.com.ua/article/mark/ford/FORD-Aspire.jpg</div>
                            <div style={{
                                paddingLeft: "10px",
                                textDecoration: "underline",
                                color: "black"
                            }}>https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxcdDPIKOL6HNvgTaASVReYn_0Zar8FpsHPw&usqp=CAU
                            </div>
                        </div>
                        <div>
                            <button className='button' onClick={() => addNewPostPlus()}>Create</button>
                            <button className='button button-delete' onClick={() => isClear()}>Clear</button>
                        </div>
                    </div>
                )}
            </div>
            <div style={{display: "flex", marginTop: "10px", justifyContent: "center"}}>
                <MapContainer center={[49.00, 32.00]} zoom={6}
                              style={{height: "100vh", width: "1000px", cursor: "crosshair"}}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapEvents/>

                    {visibleMarkers.map((marker, index) => (
                        <CircleMarker
                            key={index}
                            center={{lat: marker.latitude, lng: marker.longitude}}
                            radius={6}
                            pathOptions={{
                                color: selectedMarker && selectedMarker.id === marker.id ? "red" : "blue",
                                fillColor: selectedMarker && selectedMarker.id === marker.id ? "#ff8888" : "#3186cc",
                                fillOpacity: 0.7,
                            }}
                            eventHandlers={{
                                click: () => {
                                    handleMarkerClick(index);
                                },
                            }}
                        >
                            <Tooltip direction="top" offset={[0, -6]} opacity={1} permanent>
                                <span>{marker.title}</span>
                            </Tooltip>
                        </CircleMarker>
                    ))}
                </MapContainer>

                <div style={{marginLeft: "30px", width: "250px"}}>
                    {!selectedMarker ? <p>Всі товари у області видимості:</p> : <p>Обраний товар:</p>}

                    {(data.length < 1 || visibleMarkers.length < 1) && <p>EMPTY</p>}
                    <Slider {...sliderSettings} style={{height: "85vh", width: "250px", overflow: 'auto'}}>
                        {filteredData.map((item, index) => (
                            <div key={index}>
                                <div style={{border: "2px solid grey", marginBottom: "10px", paddingBottom: "5px"}}>
                                    <Card item={item}/>
                                    {!add && <button className='button button-delete'
                                                     onClick={() => deletePost(item._id)}>DELETE</button>}
                                    {(activePostId !== item._id && !add) && (
                                        <button className='button' onClick={() => isEdit(item)}>EDIT</button>
                                    )}

                                    {activePostId === item._id && (
                                        <div>
                                            <input value={title} onChange={titleChange}/>
                                            <textarea style={{marginTop: "2px"}} value={text} onChange={textChange}/>
                                            <input value={price} onChange={priceChange}/>
                                            <input value={link} onClick={(e) => e.target.select()}
                                                   onChange={linkChange}/>
                                            <input value={latitude} onChange={latitudeChange}/>
                                            <input value={longitude} onChange={longitudeChange}/>
                                            <div>
                                                <button className='button'
                                                    onClick={() => editPost(item._id, title, text, price, link, latitude, longitude)}>Save
                                                </button>
                                                <button className='button button-delete' onClick={() => isCancel()}>Cancel</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

        </div>
    );
};

export default MapComponent;