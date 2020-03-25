import React from 'react';
import { Gallery, GalleryImage } from "react-gesture-gallery";
import './App.css';



const INITIAL_INDEX = 0;

export function Imageboard() {

    const [index, setIndex] = React.useState(INITIAL_INDEX);

    React.useEffect(() => {
        const interval = setInterval(() => {

            if (index === imageboardImages.length - 1) {
                setIndex(INITIAL_INDEX)
            }
            else {

                setIndex(index + 1)
            }
        }, 3000)

        return () => clearInterval(interval)

    }, [index])

    const imageboardImages = [
        {
            src: "img/imageboard.png"
        },
        {
            src: "img/imageboard1.png"
        },
        {
            src: "img/imageboard2.png"
        },
        {
            src: "img/imageboard3.png"
        },
        {
            src: "img/imageboard4.png"
        },
        {
            src: "img/imageboard5.png"
        },
        {
            src: "img/imageboard6.png"
        },
        {
            src: "img/imageboard7.png"
        },
        {
            src: "img/imageboard8.png"
        },
        {
            src: "img/imageboard9.png"
        },
        {
            src: "img/imageboard10.png"
        },
    ];

    return (
        <div className="imageboard" >

            <h1 className="h1Imageboard"> Imageboard</h1>
            <Gallery
                index={index}
                onRequestChange={i => {
                    setIndex(i);
                }}
            >
                {imageboardImages.map(img => (
                    <GalleryImage objectFit="contain" key={img.src} src={img.src} />
                ))}
            </Gallery>

        </div>
    )
}
