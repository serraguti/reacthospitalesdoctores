import React, { Component } from 'react'
import {Route, BrowserRouter, Routes, useParams} from 'react-router-dom';
import MenuHospitales from './MenuHospitales';
import Home from './Home';
import Doctores from './Doctores';

export default class Router extends Component {
  render() {
    function DoctoresElement() {
        var { idhospital } = useParams();
        return <Doctores idhospital={idhospital}/>
    }
    return (
      <BrowserRouter>
        <MenuHospitales/>
        <hr/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/doctores/:idhospital" element={<DoctoresElement/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}
