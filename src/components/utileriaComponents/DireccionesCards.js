import React, { Component } from 'react';
import {Icon} from 'semantic-ui-react';
import {Direccion,DireccionFront} from '../../strings/peticiones.js';
import axios from 'axios';
import AlertSnack from '../utileriaComponents/Alerta.js';
import * as firebase from 'firebase';

class DireccionEnvio extends Component {
  constructor() {
    super()
    this.state={
      Currentuser :firebase.auth().currentUser,
      loading:false,
    }
  }

  EliminarDireccion=()=>{
    let self = this;
    this.setState({loading:true})
    axios.post(Direccion+`/eliminar-direccion`,{idUser:this.state.Currentuser.uid,idDireccion:this.props.datos.idDireccion})
      .then(res => {
        if (res.data.status =='OK') {
          this.props.ActualizarDirecciones();
          this.setState({
          loading:false,  openAlert:true,titleAlert:'Exito',AlertMessage:'Tarjeta eliminada',AlertType:'success',
          })
        }else {
          this.props.ActualizarDirecciones();
          self.setState({
          loading:false,  openAlert:true,titleAlert:'Algo paso mal!',AlertMessage:'error al eliminar tarjeta',AlertType:'error',
          })
        }
      })
  }
  resetAlert = ()=>{this.setState({openAlert:false,titleAlert:'',AlertMessage:'',AlertType:''})}

  selectDireccion=()=>{
    this.props.selectDireccion(this.props.datos.idDireccion);
  }
  render() {
    let DirOpcional = this.props.datos.EntreCalle1Direccion && this.props.datos.EntreCalle2Direccion?true:false;
    return (
      <div onClick={this.selectDireccion}   className ='Direccion'>

        {  this.state.loading?
          <div className='closeBtn btnDireccion' >
            <Icon loading name='spinner' />
          </div>
          :
          <div className='closeBtn btnDireccion' onClick={this.EliminarDireccion}>
            <Icon name='close' ></Icon>
          </div>
        }
        <p className='DireccionPrincipal'>{this.props.datos.CalleDireccion+' '+this.props.datos.NumDireccion}</p>
        <p>{DirOpcional?'entre':''} {this.props.datos.EntreCalle1Direccion} {DirOpcional?'y':''} {this.props.datos.EntreCalle2Direccion}</p>
        <p>{this.props.datos.IndicacionesDireccion}</p>
        <p>{this.props.datos.EstadoDireccion} ({this.props.datos.CPDireccion}) {this.props.datos.MunicipioDireccion},{this.props.datos.ColoniaDireccion} </p>
        <p>{this.props.datos.NombreDireccion} - {this.props.datos.numContactoDireccion}</p>

        <AlertSnack openAlert={this.state.openAlert} titleAlert={this.state.titleAlert} resetAlert={this.resetAlert} AlertMessage={this.state.AlertMessage} AlertType={this.state.AlertType}/>

      </div>
    );
  }
}

export default DireccionEnvio;
