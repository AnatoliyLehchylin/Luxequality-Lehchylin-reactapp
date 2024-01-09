import React from 'react';

function Card({ item }) {

    const noFotoProduct = 'https://totalcomp.com/images/no-image.jpeg';

    return (
        <div style={{marginBottom: "5px"}}>
            <div><span style={{color: "#e70c1e", fontWeight: "600"}}>Title: </span>{item.title ? item.title : "title undefined"}</div>
            <div><span style={{color: "#e70c1e", fontWeight: "600"}}>Text: </span>{item.text ? item.text : "text undefined"}</div>
            <div><span style={{color: "#e70c1e", fontWeight: "600"}}>price: </span>{item.price ? item.price : "price undefined"}</div>
            <div>
                <img style={{ width: '200px', height: "120px" }} src={item.link || noFotoProduct} alt="Image" />
            </div>
        </div>
    );
}

export default Card;
