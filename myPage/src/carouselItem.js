import React from 'react';

import './App.css';




export function CarouselItem(props) {
    const backgroundItem = {
        backgroundImage: 'url(' + props.src + ')',
    }
    return (

        <div className="carouselItem" style={backgroundItem}>
            <img alt="" />
        </div>
    )
}