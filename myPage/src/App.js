import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Abalone } from './abalone';
import { Contact } from './contact';
import { Imageboard } from './imageboard';
import { Socialnetwork } from './socialnetwork';
import { Petition } from './petition';
import { Connectfour } from './connectfour';
import { AboutMe } from './aboutMe';
import { EnzosBlog } from './enzosblog';

import './App.css';

function App() {

  const [page, setPage] = useState(0);
  console.log('page:', page);

  return (
    <div className="App">
      <Router>
        <nav>
          <ul id="navigation">
            <li className="navLi" onClick={() => setPage(0)}>
              <Link to="/about-me">About Me</Link>
            </li>
            <li className="navLi" onClick={() => setPage(1)}>
              <Link to="/contact">Contact Me</Link>
            </li>
            <li className="navLi" onClick={() => setPage(2)}>
              <Link to="/abalone">Abalone</Link>
            </li>
            <li className="navLi" onClick={() => setPage(3)}>
              <Link to="/connectfour">Connectfour</Link>
            </li>
            <li className="navLi" onClick={() => setPage(4)}>
              <Link to="/petition">Petition</Link>
            </li>
            <li className="navLi" onClick={() => setPage(5)}>
              <Link to="/socialnetwork">Social Network</Link>
            </li>
            <li className="navLi" onClick={() => setPage(6)}>
              <Link to="/imageboard">Imageboard</Link>
            </li>
            <li className="navLi" onClick={() => setPage(7)}>
              <Link to="/enzosblog">EMK Blog</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <main>
            <Route path="/about-me">
              {(page === 0) &&
                <AboutMe />
              }
            </Route>

            <Route path="/contact">
              {(page === 1) &&
                <Contact className="component-box" />
              }
            </Route>

            <Route path="/abalone">
              {(page === 2) &&
                <Abalone className="component-box" />
              }
            </Route>

            <Route path="/connectfour">
              {(page === 3) &&
                <Connectfour className="component-box" />
              }
            </Route>

            <Route path="/petition">
              {(page === 4) &&
                <Petition className="component-box" />
              }
            </Route>

            <Route path="/socialnetwork">
              {(page === 5) &&
                <Socialnetwork className="component-box" />
              }
            </Route>

            <Route path="/imageboard">
              {(page === 6) &&
                <Imageboard className="component-box" />
              }
            </Route>

            <Route path="/enzosblog">
              {(page === 7) &&
                <EnzosBlog className="component-box" />
              }
            </Route>
          </main>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

