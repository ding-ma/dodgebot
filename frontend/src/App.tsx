import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Stats from "./components/Stats";
import Home from "./components/Home"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    
                    <Route path="/stats">
                        <Stats/>
                    </Route>
                    
                    <Route path="/">
                        <Home/>
                    </Route>

                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
