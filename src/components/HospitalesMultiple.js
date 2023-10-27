import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import Trabajadores from './Trabajadores';

export default class HospitalesMultiple extends Component {
    selectHospital = React.createRef();
    cajaIncremento = React.createRef();

    state = {
        hospitalesSeleccionados: [],
        hospitales: [],
        status: false,
        statusUpdate: false
    }

    loadHospitales = () => {
        var request = "api/hospitales";
        var url = Global.apiEjemplos + request;
        axios.get(url).then(response => {
            this.setState({
                hospitales: response.data,
                status: true, 
            })
        })
    }

    getHospitalesSeleccionados = () => {
        var options = this.selectHospital.current.options;
        var aux = [];
        for (var opt of options){
            if (opt.selected == true){
                aux.push(opt.value);
            }
        }
        return aux;
    }

    getSeleccionHospitales = (e) => {
        e.preventDefault();
        var aux = this.getHospitalesSeleccionados();
        this.setState({
            hospitalesSeleccionados: aux
        })
    }

    incrementarSalarios = (e) => {
        e.preventDefault();
        //NECESITO LOS HOSPITALES SELECCIONADOS
        var hospitales = this.getHospitalesSeleccionados();
        var incremento = this.cajaIncremento.current.value;
        var request = "api/trabajadores/UpdateSalarioTrabajadoresHospitales?"
        + "incremento=" + incremento + "&";
        var data = "";
        for (var id of hospitales){
            data += "idhospital=" + id + "&";
        }
        data = data.substring(0, data.length - 1);
        var url = Global.apiEjemplos + request + data;
        axios.put(url).then(response => {
            this.setState({
                statusUpdate: true, 
                hospitalesSeleccionados: hospitales, 
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
           <h1>Hospitales Múltiple</h1>

           <form>
                <select size="8" multiple ref={this.selectHospital}>
                    {
                        this.state.status == true &&
                        (
                            this.state.hospitales.map((hospital, index) => {
                                return (<option key={index} value={hospital.idHospital}>
                                    {hospital.nombre}
                                </option>)
                            })
                        )
                    }
                </select>
                <label>Incremento Salarial</label>
                <input type="number" ref={this.cajaIncremento} className='form-control'/>
                <button className='btn btn-warning'
                onClick={this.incrementarSalarios}>
                    Incrementar salarios
                </button>
                <button onClick={this.getSeleccionHospitales} className='btn btn-info'>
                    Mostrar trabajadores
                </button>
           </form>
           <hr/>
            <Trabajadores idhospitales={this.state.hospitalesSeleccionados}/>
        </div>
    )
  }
}
