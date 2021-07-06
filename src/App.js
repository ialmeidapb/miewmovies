import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from './components/Home'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Route exact path="/" component={HomePage}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
