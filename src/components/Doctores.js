import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';

export default class Doctores extends Component {
    state = {
        doctores: [], 
        status: false
    }

    loadDoctores = () => {
        var request = "api/Doctores/DoctoresHospital/" +
        this.props.idhospital;
        var url = Global.apiDoctores + request;
        axios.get(url).then(response => {
            this.setState({
                doctores: response.data,
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.loadDoctores();
    }

    componentDidUpdate = (oldProps) => {
        //NUNCA LLAMAREMOS A DIDUPDATE SIN UN CONTROL DE PROPS
        console.log("Update");
        if (oldProps.idhospital != this.props.idhospital){
            this.loadDoctores();
        }
    }
  render() {
    return (
      <div>
        <h1 style={{color:"red"}}>
            Doctores {this.props.idhospital}
        </h1>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Apellido</th>
                    <th>Especialidad</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.status == true &&
                    (
                        this.state.doctores.map((doctor, index) => {
                            return (
                                <tr key={index}>
                                    <td>{doctor.apellido}</td>
                                    <td>{doctor.especialidad}</td>
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
