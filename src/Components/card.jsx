import React from 'react';

function Card({ item }) {

    const noFotoProduct = 'https://totalcomp.com/images/no-image.jpeg';

    return (
        <div style={{marginBottom: "5px"}}>
            <div>Title: {item.title ? item.title : "title undefined"}</div>
            <div>text: {item.text ? item.text : "text undefined"}</div>
            <div>price: {item.price ? item.price : "price undefined"}</div>
            {/* <div>link: {item.link ? item.link : "link undefined"}</div> */}
            <div>
                <img style={{ width: '200px', height: "120px" }} src={item.link || noFotoProduct} alt="Image" />
            </div>
            {/* <div>latitude: {item.latitude ? item.latitude : "latitude undefined"}</div> */}
            {/* <div>longitude: {item.longitude ? item.longitude : "longitude undefined"}</div> */}
        </div>
    );
}

export default Card;
