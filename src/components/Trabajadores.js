import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';

export default class Trabajadores extends Component {
    state = {
        mensaje: "", 
        trabajadores: [], 
        status: true
    }

    loadTrabajadores = () => {
        console.log("Dentro Load");
        var hospitales = this.props.idhospitales;
        if (hospitales.length != 0){
            var request = "api/trabajadores/TrabajadoresHospitales?";
            //idhospital=17&idhospital=22
            var data = "";
            for (var id of hospitales){
                data += "idhospital=" + id + "&";
            }
            //idhospital=17&idhospital=22&
            data = data.substring(0, data.length - 1);
            var url = Global.apiEjemplos + request + data;
            axios.get(url).then(response => {
                console.log(response.data);
                this.setState({
                    trabajadores: response.data, 
                    status: true
                })
            })
            this.setState({
                mensaje: data
            })
        }

    }

    componentDidMount = () => {
        this.loadTrabajadores();
    }

    componentDidUpdate = (oldProps) => {
        if (oldProps.idhospitales != this.props.idhospitales){
            this.loadTrabajadores();
        }
    }

  render() {
    return (
        <div>
            <h1 style={{color:"red"}}>Trabajadores</h1>
            <h2 style={{color:"blue"}}>
                {this.state.mensaje}
            </h2>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Apellido</th>
                        <th>Oficio</th>
                        <th>Salario</th>
                        <th>Id Hospital</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.status == true && 
                        (
                            this.state.trabajadores.map((worker, index) => {
                                return (<tr key={index}>
                                    <td>{worker.apellido}</td>
                                    <td>{worker.oficio}</td>
                                    <td>{worker.salario}</td>
                                    <td>{worker.idHospital}</td>
                                </tr>)
                            })
                        )
                    }
                </tbody>
            </table>

        </div>
    )
  }
}
