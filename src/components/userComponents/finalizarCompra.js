import React, { Component } from 'react';
import * as firebase from 'firebase';
import MenuUsuario from './slideBar.js'
import Footer from '../Footer.js'
import '../../stylesUser/ResumenCuenta.css';
import Menu from '../header.js'
import '../../styles/General.css';
import {Icon} from 'semantic-ui-react';
import axios from 'axios';
import {Direccion} from '../../strings/peticiones.js';
import {ValidarTarjetaReg} from '../../Scripts/ValidarTarjeta.js';
import Tarjetas from '../utileriaComponents/DebitCards.js'
import AlertSnack from '../utileriaComponents/Alerta.js';
import Direcciones from '../utileriaComponents/DireccionesCards.js';
import Script from 'react-load-script';
import {Link} from 'react-router-dom'

class ContentFinalizarCompra extends Component{
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
            <FinalizarCompra/>
          </div>
        </div>
      </div>
    )
  }
}

class FinalizarCompra extends Component{
  constructor(){
    super()
    this.state={
      productosCarrito:[],
      infoExtraCarrito:{},
      idTarjetaSeleccionada:'',
      idDireccionSeleccionada:'',
      stepFializarCompra:0,
      cvvAutorizacion:'',
      idDeviceSession:'',
      stepFin:false,
    }
  }

  componentDidMount(){
    this.getCarrito();
    this.getTotalCarrito();
    window.OpenPay.setSandboxMode(true);
    this.setState({idDeviceSession:window.OpenPay.deviceData.setup()})
  }


  getCarrito=()=>{
    let self = this;
    if(firebase.auth().currentUser){
      axios.post(Direccion+`/tomar-carrito`,{idUser:firebase.auth().currentUser.uid})
          .then(res => {
            console.log(res.data);
            if (res.data.status == 'OK') {
              self.setState({
                productosCarrito:res.data.carrito,
              })
            }else{
              console.log(res.data.error);
            }

          }).catch((error)=>{
              console.log(error);
          })
      }
  }
  getTotalCarrito=()=>{
    let self = this;
    if(firebase.auth().currentUser){
      axios.post(Direccion+`/tomar-precioTotal-carrito`,{idUser:firebase.auth().currentUser.uid})
          .then(res => {
            console.log(res.data);
            if (res.data.status == 'OK') {
              self.setState({
              infoExtraCarrito:res.data,
              })
            }else{
              console.log(res.data.error);
            }

          }).catch((error)=>{
              console.log(error);
          })
    }

  }
  borrarAllCarrito=()=>{
    let self = this;
    axios.post(Direccion+`/borrar-all-carrito`,{idUser:firebase.auth().currentUser.uid})
        .then(res => {
          if (res.data.status == 'OK') {
            this.getCarrito();
            this.getTotalCarrito();
          }else{
            this.getCarrito();
            this.getTotalCarrito();
            console.log(res.data.error);
          }
        }).catch((error)=>{
            console.log(error);
        })
  }
  tarjetaSeleccionada=(idTarjeta)=>{
    this.setState({idTarjetaSeleccionada:idTarjeta,stepFializarCompra:3})
  }
  direccionSeleccionada=(idDireccion)=>{
    this.setState({idDireccionSeleccionada:idDireccion,stepFializarCompra:2})
  }

  pagarCarrito=()=>{
    let self = this;
    this.setState({loading:true})
      axios.post(Direccion+`/pagar-carrito`,{idUser:firebase.auth().currentUser.uid,idTarjeta:this.state.idTarjetaSeleccionada,idDireccion:this.state.idDireccionSeleccionada,cvvAutorizacion:this.state.cvvAutorizacion,idDeviceSession:this.state.idDeviceSession})
          .then(res => {
            if (res.data.status == 'OK') {
              this.getTotalCarrito();
              this.setState({
                loading:false,openAlert:true,titleAlert:'Exito',AlertMessage:'Producto pagado',AlertType:'success',idTarjetaSeleccionada:'',idDireccionSeleccionada:'',cvvAutorizacion:'',stepFializarCompra:4,stepFin:true,
              })
            }else{
              this.setState({
                openAlert:true,
                loading:false,
                AlertType: 'error',
                titleAlert:"Algo anda mal!",
                AlertMessage:res.data.error,
              })
            }

          }).catch((error)=>{
              console.log(error);
          })
  }
  resetAlert = ()=>{this.setState({openAlert:false,titleAlert:'',AlertMessage:'',AlertType:''})}
  handleScriptLoad=()=>{
     console.log('El script esta cargado');


  }
  render(){
    console.log(this.state.productosCarrito.length);
    return(
      <div className='contentMisProductos'>

        <section className='seccion1'>
          {this.state.productosCarrito.length==0?
            <div className='CardInfo CardDirecciones'>
              <p>Tu carrito esta vacio</p>
              <h3 className='btnRealizarCompra'><Link to='tienda'>Seguir comprando</Link></h3>
            </div>
            :
            <div className='headerFinalizar'>
              {this.state.stepFializarCompra==0?
                <div className='contentCardItem Finalizar'>
                  {
                    this.state.productosCarrito.map((it,index)=>{
                      return(  <CardItemProducto getTotalCarrito={this.getTotalCarrito} getCarrito={this.getCarrito} producto={it} key={index}/>)
                    })
                  }
                </div>
                :this.state.stepFializarCompra==1?
                  <div>
                    <h3>Selecciona una direccion</h3>
                      <ListaDirecciones  direccionSeleccionada={this.direccionSeleccionada}/>

                  </div>
                :this.state.stepFializarCompra==2?
                <div>
                  <h3>Selecciona una tarjeta</h3>
                    <ListaCard  tarjetaSeleccionada={this.tarjetaSeleccionada}/>
                </div>
                :this.state.stepFializarCompra==3?
                <div className='CardInfo CardDirecciones'>
                  <p>El codigo cvv es considerado como dato sensible, por lo cual no es guardado en nuestra DB, siempre sera requerido para cualquier compra</p>
                  <input className='inputCVV' value={this.state.cvvAutorizacion} onChange={(e)=>this.setState({cvvAutorizacion:e.target.value.substring(0,4)})} type='number' placeholder='cvv' />
                  {this.state.cvvAutorizacion.length>=3?
                    <div>
                      {this.state.loading?
                        <div className='btnRealizarCompra'>
                          <Icon loading name='spinner' />
                        </div>
                        :
                        <h3 onClick={this.pagarCarrito} className='btnRealizarCompra'>Realizar compra</h3>
                      }
                    </div>
                    :<div></div>}
                </div>
                :this.state.stepFializarCompra==4?
                <div className='CardInfo CardDirecciones'>
                  Tu compra fue exitosa.
                  <h3 className='btnRealizarCompra'><Link to='/user/Compras'>Mis compras</Link></h3>

                </div>
                :<div></div>
              }
              {!this.state.stepFin?
                <div>
                  <div className='infoExtraContent'>
                    <div className='infoProductosFinalizar'>
                      <h3>Total productos</h3>
                      <p>{this.state.infoExtraCarrito.totalItems} producto(s)</p>
                    </div>
                    <div className='infoProductosFinalizar'>
                      <h3>Subtotal</h3>
                      <p>${parseInt(this.state.infoExtraCarrito.total).toFixed(2)}</p>
                    </div>
                    <div className='infoProductosFinalizar'>
                      <h3>Envio</h3>
                      <p>0</p>
                    </div>
                    <div className='infoProductosFinalizar'>
                      <h3>Total a pagar</h3>
                      <p>${parseInt(this.state.infoExtraCarrito.total).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className='finalizarCompra'>
                    {this.state.stepFializarCompra==0?
                      <div>
                        {this.state.infoExtraCarrito.total>0?
                          <div>
                            {this.state.infoExtraCarrito.totalItems < 12?
                              <div className='BtnPagarCarrito'>
                                Compra minima 12 articulos
                              </div>
                              :
                              <div onClick={()=>this.setState({stepFializarCompra:1})} className='BtnPagarCarrito'>Pagar</div>

                            }
                          </div>
                          :
                          <div>
                          </div>
                        }
                      </div>
                      :
                      <div>
                        {this.state.loading?
                          <div></div>:
                          <div onClick={()=>this.setState({stepFializarCompra:0,idTarjetaSeleccionada:'',idDireccionSeleccionada:''})} className='BtnPagarCarrito'>Regresar</div>

                        }

                      </div>

                    }
                  </div>
                </div>
                :<div></div>
              }

            </div>
          }



        </section>
        <AlertSnack openAlert={this.state.openAlert} titleAlert={this.state.titleAlert} resetAlert={this.resetAlert} AlertMessage={this.state.AlertMessage} AlertType={this.state.AlertType}/>

      </div>
    )
  }
}

class CardItemProducto extends Component {
  constructor() {
    super()
    this.state = {
      loading:false,
      modificar:false,
      productoEncontrado:{}
    }
  }
  componentDidMount(){
    this.searchProductWhitIDandName();
  }


  searchProductWhitIDandName=(idProducto,NameProducto)=>{
    let self = this;
    axios.post(Direccion+`/get-producto-whitId`,{idProducto:this.props.producto.idProducto,NameProducto:this.props.producto.nombreProducto})
        .then(res => {
          console.log(res.data);
          if(res.data.status){
            this.setState({
              productoEncontrado:res.data.producto,
              loading:false,
            });
          }
          else{
            self.setState({
              loading:false,
              productoEncontrado:{},
              openAlert:true,
              AlertType: 'error',
              titleAlert:"Algo anda mal!",
              AlertMessage:res.data.contentStatus?res.data.contentStatus:'Error desconocido',
            })
          }
        })
  }

  borrarItemCarrito=()=>{
    let self = this;
    axios.post(Direccion+`/borrar-item-carrito`,{idUser:firebase.auth().currentUser.uid,idItemCarrito:this.props.producto.idItemCarrito})
        .then(res => {
          if (res.data.status == 'OK') {
            self.props.getCarrito();
            self.props.getTotalCarrito();
          }else{
            this.props.getCarrito();
            this.props.getTotalCarrito();
            console.log(res.data.error);
          }
        }).catch((error)=>{
            console.log(error);
        })
  }
  resetAlert = ()=>{this.setState({openAlert:false,titleAlert:'',AlertMessage:'',AlertType:''})}

  render(){
    return(
      <div>

          <div className='CardItem' >

            <div className='imgCardItem Finalizar'>  <img src={this.props.producto.imgProducto}/></div>
            <div className='infoCardItem left'>
              <h3>{this.props.producto.nombreProducto}</h3>
              <p>{this.props.producto.idProducto}</p>
            </div>
            <div className='infoCardItem center'>
              <h3>Cantidad</h3>
              <p><span>{this.props.producto.cantidadProducto}</span> x {this.props.producto.cantidadPorItem+' '+this.props.producto.unidadProducto} </p>
            </div>
            <div className='infoCardItem center'>
              <h3>Precio</h3>
              <p>$ {parseInt(this.state.productoEncontrado.precioDescuentoProducto).toFixed(2)} MXN</p>
            </div>
            {/* <div className='closeBtn' onClick={this.borrarItemCarrito}>
              <Icon name='close' ></Icon>
            </div> */}

          </div>
          <AlertSnack openAlert={this.state.openAlert} titleAlert={this.state.titleAlert} resetAlert={this.resetAlert} AlertMessage={this.state.AlertMessage} AlertType={this.state.AlertType}/>

      </div>

    )
  }
}

class ListaCard extends Component{
  constructor(){
    super()
    this.state={
      Currentuser :firebase.auth().currentUser,
      userDB:{},
      CardNumber:'',
      CardTitular:'',
      mesExpiracion:'',
      anoExpiracion:'',
      cvv:'',
      Tarjetas:[],
    }
  }

  UNSAFE_componentWillMount(){
    this.getTarjetas();
  }
  selectTarjeta=(idTarjeta)=>{
    this.props.tarjetaSeleccionada(idTarjeta);
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
            AlertMessage:res.data.error,
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
              loading:false,openAlert:true,titleAlert:'Algo paso mal!',AlertMessage:'error al agregar al tarjeta',AlertType:'error',  CardNumber:'',CardTitular:'',mesExpiracion:'',anoExpiracion:'',cvv:'',
            })
          }
        })
    }else{
      self.setState({
        loading:false,openAlert:true,titleAlert:'Algo paso mal!',AlertMessage:respuestaValidador.error,AlertType:'error',
      })
    }

  }
  resetAlert = ()=>{this.setState({openAlert:false,titleAlert:'',AlertMessage:'',AlertType:''})}

  render(){
    return(
      <div  className=' CardInfo CardTarjetas'>
        {!this.state.newTarjetaState?
          <div>
            <div className='titlePerfil'><h3>Tarjetas Activas</h3></div>
            {this.state.Tarjetas?
              <div>
                {  this.state.Tarjetas.map((it,index,key)=>{
                  return(<Tarjetas sinBoton={true} selectTarjeta={this.selectTarjeta}  ActualizarTarjetas={this.getTarjetas} key={it.key} datos={it}/>)
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
        {this.state.newTarjetaState?
          <div>
            {!this.state.loading?
              <div onClick={this.NuevaTarjeta} className='addTarjetas Nueva'>
                Agregar nueva tarjeta
              </div>
              :
              <div className='addTarjetas Nueva'>
                <Icon loading name='spinner' color='white' />
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
        <AlertSnack openAlert={this.state.openAlert} titleAlert={this.state.titleAlert} resetAlert={this.resetAlert} AlertMessage={this.state.AlertMessage} AlertType={this.state.AlertType}/>

      </div>
    )
  }
}


class ListaDirecciones extends Component{
  constructor(){
    super()
    this.state={
      Currentuser :firebase.auth().currentUser,
      userDB:{},
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
    }
  }

  UNSAFE_componentWillMount(){
    this.getDirecciones();
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
            AlertMessage:res.data.error,
          })
        }
      })
  }
  NuevaDireccion=()=>{
    let self = this;
    this.setState({loading:true,})
    if (this.state.NombreDireccion && this.state.CPDireccion && this.state.EstadoDireccion && this.state.MunicipioDireccion && this.state.ColoniaDireccion && this.state.CalleDireccion && this.state.NumDireccion && this.state.numContactoDireccion) {
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
    }else{
      self.setState({
        loading:false,openAlert:true,titleAlert:'Algo paso mal!',AlertMessage:'Llena todos los campos requeridos',AlertType:'warning',
      })
    }

  }
  selectDireccion=(idDireccion)=>{
    this.props.direccionSeleccionada(idDireccion);
  }
  resetAlert = ()=>{this.setState({openAlert:false,titleAlert:'',AlertMessage:'',AlertType:''})}

  render(){
    return(
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
              <input  value={this.state.EntreCalle1Direccion} onChange={(e)=>this.setState({EntreCalle1Direccion:e.target.value})} type='text' placeholder='entre calle 1 (opcional)' />
              <input  value={this.state.EntreCalle2Direccion} onChange={(e)=>this.setState({EntreCalle2Direccion:e.target.value})} type='text' placeholder='entre calle 2 (opcional)' />
            </div>
            <textarea  value={this.state.IndicacionesDireccion} onChange={(e)=>this.setState({IndicacionesDireccion:e.target.value})} type='text' placeholder='Indicaciones extras (opcional)'  />
            <input  value={this.state.numContactoDireccion} onChange={(e)=>this.setState({numContactoDireccion:e.target.value})} type='number' placeholder='Telefono de contacto' />
          </div>
        }
        <div className='lineDown'></div>

        {this.state.newDomState?
          <div>
            {!this.state.loading?
              <div onClick={this.NuevaDireccion} className='addTarjetas Nueva'>
                Agregar nueva direccion
              </div>
              :
              <div className='addTarjetas Nueva'>
                <Icon loading name='spinner' color='white' />
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
        <AlertSnack openAlert={this.state.openAlert} titleAlert={this.state.titleAlert} resetAlert={this.resetAlert} AlertMessage={this.state.AlertMessage} AlertType={this.state.AlertType}/>

      </div>

    )
  }
}


export default ContentFinalizarCompra;
