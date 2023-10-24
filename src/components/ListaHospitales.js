import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';

export default class ListaHospitales extends Component {
    state = {
        hospitales: [], 
        status: false
    }

    loadHospitales = () => {
        var request = "webresources/hospitales";
        var url = Global.apiHospitales + request;
        axios.get(url).then(response => {
            this.setState({
                hospitales: response.data, 
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.loadHospitales();
    }

  render() {
    return (
        <div>
            <h1 style={{color:"blue"}}>Lista Hospitales</h1>
            <table className='table table-info'>
                <thead>
                    <tr>
                        <th>Id Hospital</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Camas</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.status == true && 
                        (
                            this.state.hospitales.map((hospital, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{hospital.idhospital}</td>
                                        <td>{hospital.nombre}</td>
                                        <td>{hospital.direccion}</td>
                                        <td>{hospital.telefono}</td>
                                        <td>{hospital.camas}</td>
                                    </tr>
                                )
                            })
                        )
                    }
                </tbody>
            </table>
        </div>
    )
  }
}
