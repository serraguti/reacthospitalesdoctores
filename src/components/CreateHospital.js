import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';

export default class CreateHospital extends Component {
    state = {
        mensaje: "", 
        status: false
    }

    cajaId = React.createRef();
    cajaNombre = React.createRef();
    cajaDireccion = React.createRef();
    cajaTelefono = React.createRef();
    cajaCamas = React.createRef();

    insertHospital = (e) => {
        e.preventDefault();
        var request = "webresources/hospitales/post";
        var url = Global.apiHospitales + request;
        //DEBEMOS RESPETAR LOS TIPOS DE DATO RESPECTO AL SERVICIO
        var idhospital = parseInt(this.cajaId.current.value);
        var nombre = this.cajaNombre.current.value;
        var direccion = this.cajaDireccion.current.value;
        var telefono = this.cajaTelefono.current.value;
        var camas = parseInt(this.cajaCamas.current.value);
        //DEBEMOS DECLARAR UN OBJETO JSON DENTRO DE REACT
        //CON EL MISMO NOMBRE DE PROPIEDADES
        var hospital = {
            idhospital: idhospital,
            nombre: nombre, 
            direccion: direccion, 
            telefono: telefono, 
            camas: camas
        }
        //EL METODO POST DE AXIOS PUEDE RECIBIR DOS PARAMETROS
        //1) URL DEL METODO POST DEL SERVICIO
        //2) OBJETO A ENVIAR AL SERVICIO
        axios.post(url, hospital).then(response => {
            this.setState({
                mensaje: "Hospital insertado " + nombre + "!!!!",
                status: true
            })
        })
    }

  render() {
    return (
        <div>
            {
                this.state.status == true &&
                (<Navigate to="/listahospitales"/>)
            }
            <h1>New Hospital</h1>
            <h2 style={{color:"blue"}}>
                {this.state.mensaje}
            </h2>

            <form>
                <label>Id Hospital</label>
                <input type="number" className='form-control'
                ref={this.cajaId}/>
                <label>Nombre</label>
                <input type="text" className='form-control'
                ref={this.cajaNombre}/>
                <label>Dirección</label>
                <input type="text" className='form-control'
                ref={this.cajaDireccion}/>
                <label>Teléfono</label>
                <input type="text" className='form-control'
                ref={this.cajaTelefono}/>
                <label>Camas</label>
                <input type="number" className='form-control'
                ref={this.cajaCamas}/>
                <button className='btn btn-warning'
                onClick={this.insertHospital}>
                    Create
                </button>
            </form>
        </div>
    )
  }
}
