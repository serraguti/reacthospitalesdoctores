import React, { Component } from 'react'
import {Route, BrowserRouter, Routes, useParams} from 'react-router-dom';
import MenuHospitales from './MenuHospitales';
import Home from './Home';
import Doctores from './Doctores';

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <MenuHospitales/>
        <hr/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/doctores" element={<Doctores/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}
