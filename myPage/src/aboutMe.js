import React from 'react';
import ReactToPrint from 'react-to-print';
import { PrintCv } from './printCv';
import './App.css';


export class AboutMe extends React.Component {
    render() {
        return (
            <div className="aboutMe" id="pdfDocument">
                <h1 id="h1aboutme">About Me</h1>
                <div id="cvTable">
                    <div id="cvBox">
                        <PrintCv ref={el => (this.componentRef = el)} />
                    </div>
                    <ReactToPrint
                        trigger={() => <a href="#" id="printButton">Print</a>}
                        content={() => this.componentRef}
                    />
                </div>
            </div>
        );
    }
} 