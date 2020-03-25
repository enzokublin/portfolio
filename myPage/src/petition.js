import React from 'react';
import Iframe from 'react-iframe';
import './App.css';



export class Petition extends React.Component {
    render() {
        return (
            <div className="petition">

                <Iframe url="https://emk-amazing.herokuapp.com"
                    className="petitionIframe"
                    tite="iframe-petition"
                    width="100%"
                    height="470px"
                    overflow="none"
                    overflow-y="scroll"
                    scrollbar-width="none"
                    sandbox="allow-scripts"
                    allow="fullscreen"
                    style="overflow:hidden"
                    style="overflow-y:scroll"
                    scrollbar-width="none"
                />
            </div >
        );
    }
} 