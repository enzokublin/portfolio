import React from 'react';
import { CarouselItem } from './carouselItem';
import imagesConnect4 from './imgConnect4';
import './App.css';




export class Connectfour extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemIndex: 0
        }

    }

    pictureCarousel() {
        let callBack = () => this.nextItem(1);

        setInterval(callBack, 3000);
    }

    nextItem(number) {
        let newItemIndex = (this.state.itemIndex + number) % imagesConnect4.length;
        if (newItemIndex < 0) {
            newItemIndex = newItemIndex + imagesConnect4.length;
        }

        this.setState({
            itemIndex: newItemIndex,

        })

    }

    componentDidMount() {
        this.pictureCarousel();
    }

    render() {
        const item = imagesConnect4[this.state.itemIndex];
        console.log(item);

        return (
            <div className="connectfour">
                <h1 className="h1Connectfour"> Connect Four</h1>
                <div className="pictureBox">
                    <img className="svgArrow" src="./img/triangel-left.svg" alt="SVG as img tag" onClick={() => { this.nextItem(-1) }} />
                    <CarouselItem
                        id={item.id}
                        src={item.src}
                        title={item.title}
                        description={item.description}
                    />
                    <img className="svgArrow" src="./img/triangel-right.svg" alt="SVG as img tag" onClick={() => { this.nextItem(1) }} />
                </div>
            </div>
        );
    }
} 