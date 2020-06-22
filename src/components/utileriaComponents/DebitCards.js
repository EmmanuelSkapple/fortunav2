import React, { Component } from 'react';
import {Direccion,DireccionFront} from '../../strings/peticiones.js';
import {Icon} from 'semantic-ui-react';
import * as firebase from 'firebase';
import axios from 'axios';
import AlertSnack from '../utileriaComponents/Alerta.js';


class DebitCard extends Component {
  constructor() {
    super()
    this.state={
      Currentuser :firebase.auth().currentUser,
      loading:false,
    }
  }

  EliminarTarjeta=()=>{
    let self = this;
    this.setState({loading:true})
    axios.post(Direccion+`/eliminar-tarjeta`,{idUser:this.state.Currentuser.uid,idTarjeta:this.props.datos.key,idTarjetaOpenPay:this.props.datos.idTarjetaOpenPay})
      .then(res => {
        if (res.data.status =='OK') {
          this.props.ActualizarTarjetas();
          this.setState({
              loading:false,openAlert:true,titleAlert:'Exito',AlertMessage:'Tarjeta eliminada',AlertType:'success',
          })
        }else {
          this.props.ActualizarTarjetas();
          self.setState({
              loading:false,openAlert:true,titleAlert:'Algo paso mal!',AlertMessage:'error al eliminar tarjeta',AlertType:'error',
          })
        }
      })
  }
  resetAlert = ()=>{this.setState({openAlert:false,titleAlert:'',AlertMessage:'',AlertType:''})}
  selectTarjeta=()=>{
    this.props.selectTarjeta(this.props.datos.key);
  }
  render() {
    return (
      <div onClick={this.selectTarjeta} className ='Tarjeta'>

        <div className='imgTarjeta'>
          <img src={DireccionFront +"/imgs/plataforma/visa.png"}/>
        </div>
        <div className='contentTarjeta'>
          <p className='NumTarjeta'>Terminada en {this.props.datos.displayNumber}</p>
          <p className='fechaTarjeta'>{this.props.datos.CardTitular}</p>
          <p className='fechaTarjeta'>Vencimiento: {this.props.datos.mesExpiracion}/{this.props.datos.anoExpiracion}</p>
        </div>
        {this.props.sinBoton?
          <div></div>
          :
          <div>
            {  this.state.loading?
              <div className='closeBtn'>
                <Icon loading name='spinner' />
              </div>
              :
              <div className='closeBtn' onClick={this.EliminarTarjeta}>
                <Icon name='close' ></Icon>
              </div>
            }
          </div>
        
        }


        <AlertSnack openAlert={this.state.openAlert} titleAlert={this.state.titleAlert} resetAlert={this.resetAlert} AlertMessage={this.state.AlertMessage} AlertType={this.state.AlertType}/>
      </div>
    );
  }
}

export default DebitCard;
