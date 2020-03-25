import React from 'react';
import { Gallery, GalleryImage } from "react-gesture-gallery";
import './App.css';

const INITIAL_INDEX = 0;

export function Abalone() {

    const [index, setIndex] = React.useState(INITIAL_INDEX);

    React.useEffect(() => {
        const interval = setInterval(() => {

            if (index === abaloneImages.length - 1) {
                setIndex(INITIAL_INDEX)
            }
            else {

                setIndex(index + 1)
            }
        }, 3000)

        return () => clearInterval(interval)

    }, [index])

    const abaloneImages = [
        {
            src: "img/abalone1.png"
        },
        {
            src: "img/abalone.png"
        },
        {
            src: "img/abalone-js.png"
        },
        {
            src: "img/abalone-html.png"
        },
        {
            src: "img/abalone-css.png"
        }
    ];

    return (
        <div className="abalone" >

            <h1 id="h1Abalone">Abalone</h1>
            <Gallery
                index={index}
                onRequestChange={i => {
                    setIndex(i);
                }}
            >
                {abaloneImages.map(img => (
                    <GalleryImage objectFit="contain" key={img.src} src={img.src} />
                ))}
            </Gallery>

        </div>
    )
}

