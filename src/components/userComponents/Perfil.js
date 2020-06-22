import React, { Component } from 'react';
import * as firebase from 'firebase';
import MenuUsuario from './slideBar.js'
import Tarjetas from '../utileriaComponents/DebitCards.js'
import Direcciones from '../utileriaComponents/DireccionesCards.js'
import {Direccion,DireccionFront} from '../../strings/peticiones.js';
import {Icon,Label,Modal} from 'semantic-ui-react';
import axios from 'axios'
import $ from 'jquery'
import {SubirFile} from '../../Scripts/SubirArchivos.js';
import {ValidarTarjetaReg} from '../../Scripts/ValidarTarjeta.js';
import Footer from '../Footer.js'
import Alerta from '../utileriaComponents/Alerta.js'
import Menu from '../header.js'
import '../../stylesUser/perfilUsuario.css';
import '../../styles/General.css';
import AlertSnack from '../utileriaComponents/Alerta.js';

class ContentPerfil extends Component{
  constructor(){
    super()

  }
  render(){
    return(
      <div>
        <Menu black={true}/>
        <div className='contentSlidePadre'>
          <MenuUsuario/>
          <div className='contentBodyCuenta'>
            <Perfil/>
          </div>

        </div>
      </div>
    )
  }
}

class Perfil extends Component{
  constructor(){
    super()
    this.state = {
      Currentuser :firebase.auth().currentUser,
      userDB:{},
      CardNumber:'',
      CardTitular:'',
      mesExpiracion:'',
      anoExpiracion:'',
      cvv:'',
      Tarjetas:[],
      Direcciones:[],
      NombreDireccion:'',
      CPDireccion:'',
      EstadoDireccion:'Jalisco',
      MunicipioDireccion:'',
      ColoniaDireccion:'',
      CalleDireccion:'',
      NumDireccion:'',
      NumInDireccion:'',
      EntreCalle1Direccion:'',
      EntreCalle2Direccion:'',
      IndicacionesDireccion:'',
      numContactoDireccion:'',
      newDomState:false,
      loading:false,
    }
  }

  UNSAFE_componentWillMount(){
    this.getPerfil();
    this.getTarjetas();
    this.getDirecciones();
  }

  getPerfil=()=>{
    axios.post(Direccion+`/tomar-Perfil`,{idUser:this.state.Currentuser,})
      .then(res => {
        if (res.data.value) {
          this.setState({
            userDB:res.data.value,
          })
        }
      })
  }
  getTarjetas=()=>{
    axios.post(Direccion+`/tomar-tarjetas`,{idUser:this.state.Currentuser.uid})
      .then(res => {
        console.log(res.data);
        if (res.data.status="OK") {
          this.setState({
            Tarjetas:res.data.tarjetas,
          })
        }else{
          this.setState({
            openAlert:true,
            AlertType: 'error',
            titleAlert:"Algo anda mal!",
            messageAlert:res.data.error,
          })
        }
      })
  }

  NuevaTarjeta=()=>{
    let self = this;
    this.setState({loading:true})
    let respuestaValidador = ValidarTarjetaReg(this.state.CardNumber,this.state.mesExpiracion,this.state.anoExpiracion,this.state.cvv);
    if (respuestaValidador.status=="OK") {
      axios.post(Direccion+`/nueva-tarjeta`,{idUser:this.state.Currentuser.uid,CardNumber:this.state.CardNumber,CardTitular:this.state.CardTitular,mesExpiracion:this.state.mesExpiracion,anoExpiracion:this.state.anoExpiracion,cvv:this.state.cvv})
        .then(res => {
          if (res.data.status =='OK') {
            this.setState({
              loading:false,openAlert:true,titleAlert:'Exito',AlertMessage:'Tarjeta agregada',AlertType:'success',newTarjetaState:false,  CardNumber:'',CardTitular:'',mesExpiracion:'',anoExpiracion:'',cvv:'',
            })
            this.getTarjetas();
          }else {
            self.setState({
              loading:false,openAlert:true,titleAlert:'Algo paso mal!',AlertMessage:res.data.error,AlertType:'error',  CardNumber:'',CardTitular:'',mesExpiracion:'',anoExpiracion:'',cvv:'',
            })
          }
        })
    }else{
      self.setState({
      loading:false,  openAlert:true,titleAlert:'Algo paso mal!',AlertMessage:respuestaValidador.error,AlertType:'error',
      })
    }

  }

  getDirecciones=()=>{
    axios.post(Direccion+`/tomar-direcciones`,{idUser:this.state.Currentuser.uid})
      .then(res => {
        if (res.data.status="OK") {
          this.setState({
            Direcciones:res.data.direcciones,
          })
        }else{
          this.setState({
            openAlert:true,
            AlertType: 'error',
            titleAlert:"Algo anda mal!",
            messageAlert:res.data.error,
          })
        }
      })
  }

  NuevaDireccion=()=>{
    let self = this;
    this.setState({loading:true})
      axios.post(Direccion+`/nueva-direccion`,{idUser:this.state.Currentuser.uid,NombreDireccion:this.state.NombreDireccion,CPDireccion:this.state.CPDireccion,EstadoDireccion:this.state.EstadoDireccion,MunicipioDireccion:this.state.MunicipioDireccion,ColoniaDireccion:this.state.ColoniaDireccion,CalleDireccion:this.state.CalleDireccion,NumDireccion:this.state.NumDireccion,NumInDireccion:this.state.NumInDireccion,EntreCalle1Direccion:this.state.EntreCalle1Direccion,EntreCalle2Direccion:this.state.EntreCalle2Direccion,IndicacionesDireccion:this.state.IndicacionesDireccion,numContactoDireccion:this.state.numContactoDireccion,})
        .then(res => {
          if (res.data.status =='OK') {
            this.setState({
              loading:false,openAlert:true,titleAlert:'Exito',AlertMessage:'Direccion agregada',AlertType:'success',newDomState:false,   NombreDireccion:'',CPDireccion:'',EstadoDireccion:'',MunicipioDireccion:'',ColoniaDireccion:'',CalleDireccion:'',NumDireccion:'',NumInDireccion:'',EntreCalle1Direccion:'',EntreCalle2Direccion:'',IndicacionesDireccion:'',numContactoDireccion:'',
            })
            this.getDirecciones();
          }else {
            self.setState({
              loading:false,openAlert:true,titleAlert:'Algo paso mal!',AlertMessage:'Error al agregar direccion',AlertType:'error',NombreDireccion:'',CPDireccion:'',EstadoDireccion:'',MunicipioDireccion:'',ColoniaDireccion:'',CalleDireccion:'',NumDireccion:'',NumInDireccion:'',EntreCalle1Direccion:'',EntreCalle2Direccion:'',IndicacionesDireccion:'',numContactoDireccion:'',
            })
          }
        })
  }

  resetAlert = ()=>{this.setState({openAlert:false,titleAlert:'',AlertMessage:'',AlertType:''})}
  selectTarjeta=(e)=>{
    let idTarjeta =e;
  }
  selectDireccion=(e)=>{
    let idTarjeta =e;
  }
  render(){
    return(
      <div className='contentUsuario'>
        <div className='contentPerfil'>
          <ul className='col2'>
            <li>
              <div className='CardInfoBasica'>
                <div className='fotoPerfil'>
                  <img src={DireccionFront +"/imgs/elliot.jpg"}/>
                </div>
                <p className='Nivel'>{this.state.userDB.Nombre} {this.state.userDB.Apellido}</p>
                {/* <p className='Nivel'>Nivel {this.state.userDB.Nivel}</p>
                <p className='puntos'> {this.state.userDB.Puntos} pts</p> */}
                <p className='id'>id: {this.state.userDB.key}</p>
              </div>
            </li>
            <li>
              <div className='CardInfo CardInfoSecundaria'>
              <div className='titlePerfil'><h3>Datos Personales</h3></div>
                <Icon name='ellipsis vertical'></Icon>
                <div className='datosContent'>
                  <p className='datosTitle'>Correo</p>
                  <p className='datosDescripcion'>{this.state.userDB.Email}</p>
                </div>
                <div className='lineDown'></div>
                <div className='datosContent'>
                  <p className='datosTitle'>Telefono</p>
                  <p className='datosDescripcion'>{this.state.userDB.Telefono}</p>
                </div>
              </div>
              <div className='CardInfo MensajeEnvios'>
                <p>Por el momento entregamos en ZMG, con envio GRATIS!</p>
                <p>Pronto abriremos envios a mas estados y paises</p>
              </div>
            </li>
            <div className='clear'></div>

          </ul>
          <ul className='col2 columnaTarjetas'>
            <li>
              <div className=' CardInfo CardTarjetas'>
                {!this.state.newTarjetaState?
                  <div>
                    <div className='titlePerfil'><h3>Tarjetas Activas</h3></div>
                    {this.state.Tarjetas?
                      <div>
                        {  this.state.Tarjetas.map((it,index,key)=>{
                          return(<Tarjetas selectTarjeta={this.selectTarjeta} ActualizarTarjetas={this.getTarjetas} key={it.key} datos={it}/>)
                          })
                        }
                      </div>:
                      <div>
                        <p className='sinBancaria'>Sin tarjetas</p>
                      </div>
                    }
                  </div>
                  :
                  <div className='nuevaTarjetaForm'>
                    <div className='titlePerfil'><h3>Nueva tarjeta</h3></div>
                    <input  value={this.state.CardNumber} onChange={(e)=>this.setState({CardNumber:e.target.value.substring(0,16)})} className='CardNumber' type='number' placeholder='Numero de tarjeta' />
                    <input onChange={(e)=>this.setState({CardTitular:e.target.value})} className='HolderName' type='text' placeholder='Titular' />
                    <div  className='inputs tres'>
                      <input  value={this.state.mesExpiracion} onChange={(e)=>this.setState({mesExpiracion:e.target.value.substring(0,2)})} type='number' placeholder='mes' />
                      <input  value={this.state.anoExpiracion} onChange={(e)=>this.setState({anoExpiracion:e.target.value.substring(0,2)})} type='number' placeholder='año' />
                      <input  value={this.state.cvv} onChange={(e)=>this.setState({cvv:e.target.value.substring(0,4)})} type='number' placeholder='cvv' />
                    </div>
                  </div>
                }



                <div className='lineDown'></div>
                {this.state.newTarjetaState ?
                  <div>
                    {this.state.loading?
                      <div  className='addTarjetas Nueva'>
                        <Icon loading name='spinner' />
                      </div>
                      :
                      <div onClick={this.NuevaTarjeta} className='addTarjetas Nueva'>
                        Agregar nueva tarjeta
                      </div>
                    }
                  </div>
                  :
                  <div></div>
                }

                <div onClick={()=>this.setState({newTarjetaState:!this.state.newTarjetaState})} className='addTarjetas'>
                  <p>{!this.state.newTarjetaState?'Agregar tarjeta':'Regresar'}</p>
                  <Icon name={!this.state.newTarjetaState?'angle right':'angle left'}></Icon>
                </div>
              </div>
            </li>
            <li>
              <div className='CardInfo CardDirecciones'>
                {!this.state.newDomState?
                  <div>
                    <div className='titlePerfil'><h3>Direcciones Activas</h3></div>
                    {this.state.Direcciones?
                      <div>
                        {  this.state.Direcciones.map((it,index,key)=>{
                          return(<Direcciones selectDireccion={this.selectDireccion} ActualizarDirecciones={this.getDirecciones} key={it.key} datos={it}/>)
                          })
                        }
                      </div>:
                      <div>
                        <p className='sinBancaria'>Sin direcciones</p>
                      </div>
                    }
                  </div>
                  :
                  <div className='nuevaDireccionForm'>
                    <div className='titlePerfil'><h3>Nuevo domicilio</h3></div>
                    <div className='inputs dos'>
                      <input  value={this.state.NombreDireccion} onChange={(e)=>this.setState({NombreDireccion:e.target.value})} type='text' placeholder='Nombre y apellido' />
                      <input  value={this.state.CPDireccion} onChange={(e)=>this.setState({CPDireccion:e.target.value})} type='number' placeholder='Codigo Postal' />
                    </div>

                    <div  className='inputs dos'>
                      <select value={this.state.EstadoDireccion} onChange={(e)=>this.setState({EstadoDireccion:e.target.value})} name="estado">
                            <option disabled value="Aguascalientes">Aguascalientes</option>
                            <option disabled value="Baja California">Baja California</option>
                            <option disabled value="Baja California Sur">Baja California Sur</option>
                            <option disabled value="Campeche">Campeche</option>
                            <option disabled value="Chiapas">Chiapas</option>
                            <option disabled value="Chihuahua">Chihuahua</option>
                            <option disabled value="CDMX">Ciudad de México</option>
                            <option disabled value="Coahuila">Coahuila</option>
                            <option disabled value="Colima">Colima</option>
                            <option disabled value="Durango">Durango</option>
                            <option disabled value="Estado de México">Estado de México</option>
                            <option disabled value="Guanajuato">Guanajuato</option>
                            <option disabled value="Guerrero">Guerrero</option>
                            <option disabled value="Hidalgo">Hidalgo</option>
                            <option  value="Jalisco">Jalisco</option>
                            <option disabled value="Michoacán">Michoacán</option>
                            <option disabled value="Morelos">Morelos</option>
                            <option disabled value="Nayarit">Nayarit</option>
                            <option disabled value="Nuevo León">Nuevo León</option>
                            <option disabled value="Oaxaca">Oaxaca</option>
                            <option disabled value="Puebla">Puebla</option>
                            <option disabled value="Querétaro">Querétaro</option>
                            <option disabled value="Quintana Roo">Quintana Roo</option>
                            <option disabled value="San Luis Potosí">San Luis Potosí</option>
                            <option disabled value="Sinaloa">Sinaloa</option>
                            <option disabled value="Sonora">Sonora</option>
                            <option disabled value="Tabasco">Tabasco</option>
                            <option disabled value="Tamaulipas">Tamaulipas</option>
                            <option disabled value="Tlaxcala">Tlaxcala</option>
                            <option disabled value="Veracruz">Veracruz</option>
                            <option disabled value="Yucatán">Yucatán</option>
                            <option disabled value="Zacatecas">Zacatecas</option>
                        </select>
                      <input  value={this.state.MunicipioDireccion} onChange={(e)=>this.setState({MunicipioDireccion:e.target.value})} type='text' placeholder='Delegacion/Municipio' />
                    </div>
                    <div  className='inputs dos'>
                      <input  value={this.state.ColoniaDireccion} onChange={(e)=>this.setState({ColoniaDireccion:e.target.value})} type='text' placeholder='Colonia' />
                      <input  value={this.state.CalleDireccion} onChange={(e)=>this.setState({CalleDireccion:e.target.value})} type='text' placeholder='Calle' />
                    </div>
                    <div  className='inputs dos'>
                      <input  value={this.state.NumDireccion} onChange={(e)=>this.setState({NumDireccion:e.target.value})} type='number' placeholder='Nº exterior' />
                      <input  value={this.state.NumInDireccion} onChange={(e)=>this.setState({NumInDireccion:e.target.value})} type='number' placeholder='Nº interior (opcional)' />
                    </div>
                    <div  className='inputs dos'>
                      <input  value={this.state.EntreCalle1Direccion} onChange={(e)=>this.setState({EntreCalle1Direccion:e.target.value})} type='text' placeholder='entre calle 1' />
                      <input  value={this.state.EntreCalle2Direccion} onChange={(e)=>this.setState({EntreCalle2Direccion:e.target.value})} type='text' placeholder='entre calle 2' />
                    </div>
                    <textarea  value={this.state.IndicacionesDireccion} onChange={(e)=>this.setState({IndicacionesDireccion:e.target.value})} type='text' placeholder='Indicaciones extras' />
                    <input  value={this.state.numContactoDireccion} onChange={(e)=>this.setState({numContactoDireccion:e.target.value})} type='number' placeholder='Telefono de contacto' />
                  </div>
                }
                <div className='lineDown'></div>

                {this.state.newDomState?
                  <div>
                    {this.state.loading?
                      <div  className='addTarjetas Nueva'>
                        <Icon loading name='spinner' />
                      </div>
                      :
                      <div onClick={this.NuevaDireccion} className='addTarjetas Nueva'>
                        Agregar nueva direccion
                      </div>
                    }
                  </div>

                  :
                  <div></div>
                }
                <div onClick={()=>this.setState({newDomState:!this.state.newDomState})} className='addDomicilio'>
                  <p>{!this.state.newDomState?'Agregar domicilio':'Regresar'}</p>
                  <Icon name={!this.state.newDomState?'angle right':'angle left'}></Icon>
                </div>
              </div>

            </li>
            <div className='clear'></div>
          </ul>
        </div>
        <AlertSnack openAlert={this.state.openAlert} titleAlert={this.state.titleAlert} resetAlert={this.resetAlert} AlertMessage={this.state.AlertMessage} AlertType={this.state.AlertType}/>
      </div>
    )
  }
}




export default ContentPerfil;
