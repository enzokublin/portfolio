import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';


export function EnzosBlog() {

    //declare the state for each of the inputs
    //each event has an onchange event
    //event.target.value
    const [title, setTitle] = useState("");
    const [text, setText] = useState('');
    const [author, setAuthor] = useState("");

    return (
        <div className="enzoBlog" >

            <h1 id="h1MyBlog">EMK Blog</h1>
            <form method="post" action="http://localhost:8080/blogPost" onSubmit={(event) => {
                event.preventDefault();

                Axios.post('http://localhost:8080/blogPost', { subject: 'foo' }).catch(function (err) {
                    console.log(err.toJSON())
                }) // formData

            }}>
                <div className="titleContainer">
                    <input type="text" name="blog_title" id="subject" size="30" placeholder="Subject" required onChange={(e) => setTitle(e.target.value)} value={title} />
                </div>
                <textarea id="contentText" name="content_text" rows="6" cols="10" placeholder="Please write here!" onChange={(e) => setText(e.target.value)} value={text}></textarea>
                <div className="authorContainer">
                    <input type="text" name="author" id="subject" size="30" placeholder="author" required onChange={(e) => setAuthor(e.target.value)} value={author} />
                </div>
                <input type="submit" value="Submit" id="submitButton" />
            </form>

        </div>
    )
}

