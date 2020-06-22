import React, { Component } from 'react';
import * as firebase from 'firebase';
import MenuUsuario from './slideBar.js'
import {Icon,Radio} from 'semantic-ui-react';
import Footer from '../Footer.js'
import AlertSnack from '../utileriaComponents/Alerta.js'
import Menu from '../header.js'
import axios from 'axios'
import {Direccion} from '../../strings/peticiones.js'
import '../../stylesUser/MisCompras.css';
import '../../styles/General.css';


class ContentMisCompras extends Component{
  constructor(){
    super()
    this.state = {
      Currentuser :firebase.auth().currentUser.uid,
      Terminados:[],
      Proceso:[],
      Cancelados:[],
      TabActivos:0,
    }
  }
  componentDidMount=()=>{
  this.getVentas();
  }


getVentas=()=>{
  let self = this;
  axios.post(Direccion+`/get-ventas`,{idUser:this.state.Currentuser})
    .then(res => {
      if(res.data.status == 'OK'){
        this.setState({
          Terminados:res.data.values.Terminados,
          Proceso:res.data.values.Proceso,
          Cancelados:res.data.values.Cancelados,
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
          messageAlert:res.data.error?res.data.error:'Error desconocido',
        })
      }
    })
}

  setTabActivo=(e)=>{
    if (e == 1 || e== 0|| e== 2) {
      this.setState({TabActivos:e})
    }
  }
  render(){
    return(
      <div>
        <Menu black={true}/>
          <div className='contentSlidePadre'>
            <MenuUsuario/>
            {this.state.TabActivos==0?
              <MisCompras TabActivo={0} getVentas={this.getVentas} handleChangeTabActivo={this.setTabActivo} productos={this.state.Proceso}  />
            :this.state.TabActivos==1?
              <MisCompras TabActivo={1} getVentas={this.getVentas} handleChangeTabActivo={this.setTabActivo} productos={this.state.Terminados}  />
            :this.state.TabActivos==2?
              <MisCompras TabActivo={2} getVentas={this.getVentas} handleChangeTabActivo={this.setTabActivo} productos={this.state.Cancelados}  />
            :<div></div>
            }
          </div>
        <Footer/>
      </div>
    )
  }
}

class MisCompras extends Component{
  constructor(){
    super()
    this.state = {
      itemTabActivo:0,
      verCompra:false,
      productoSeleccionado:{},
      newFecha:false,
      nuevaFecha:'',
      confirmar:false,
    }

  }

  selectItem=(producto)=>{
    if (producto.FechaEntrega) {this.setState({newFecha:true})}
    this.setState({nuevaFecha:producto.FechaEntrega,productoSeleccionado:producto,verCompra:true});
  }
  updateNewDate=()=>{

    if (this.state.nuevaFecha) {
      this.setState({loading:true})
      let self = this;
      axios.post(Direccion+`/actualizar-fecha-entrega`,{FechaEntrega:this.state.nuevaFecha,idTransaccion:this.state.productoSeleccionado.idTransaccion,idUser:this.state.productoSeleccionado.idUser})
          .then(res => {
            if(res.data.status == "OK"){
              this.setState({verCompra:false,loading:false,openAlert:true,titleAlert:'Exito',AlertMessage:'Fecha actualizada exitosamente',AlertType:'success'});
              this.props.getVentas();
            }
            else if(res.data.status == 'error'){
              self.setState({
                loading:false,
                openAlert:true,
                AlertType: 'error',
                titleAlert:"Algo anda mal!",
                AlertMessage:res.data.error,
              })
              this.props.getVentas();

            }
          })
    }
    else{
      this.setState({
        loading:false,
        openAlert:true,
        AlertType: 'warning',
        titleAlert:"Algo anda mal!",
        AlertMessage:'ingresa una fecha',
      })
    }
  }
  actualizarStatus=(status)=>{
    this.setState({nuevoStatus:status,confirmar:true})
  }
  updateStatus=()=>{
    this.setState({loading:true})
    let self = this;
    axios.post(Direccion+`/actualizar-status`,{Status:this.state.nuevoStatus,idTransaccion:this.state.productoSeleccionado.idTransaccion,idUser:this.state.productoSeleccionado.idUser})
        .then(res => {
          if(res.data.status == "OK"){
            this.setState({verCompra:false,loading:false,openAlert:true,titleAlert:'Exito',AlertMessage:'Fecha actualizada exitosamente',AlertType:'success'});
            this.props.getVentas();

          }
          else if(res.data.status == 'error'){
            self.setState({
              loading:false,
              openAlert:true,
              AlertType: 'error',
              titleAlert:"Algo anda mal!",
              AlertMessage:res.data.error,
            })
            this.props.getVentas();

          }
        })
  }
  resetAlert = ()=>{this.setState({openAlert:false,titleAlert:'',AlertMessage:'',AlertType:''})}

  render(){
    return(
      <div className='contentMisProductos'>

        <section className='seccion1'>
          <div className='headerMisProductos'>
            {!this.state.verCompra?
              <div></div>
              :
              <div className='backBoton' onClick={()=>this.setState({verCompra:!this.state.verCompra})}>
                <Icon  name='arrow left' />
                <h3>Regresar</h3>
              </div>
            }
            {/* <div className='buscadorProductos'>
              <input type='text' placeholder='Buscar nombre, id.'></input>
              <div className='btnBuscar'><Icon  name='search' /></div>
            </div> */}

            {!this.state.verCompra?
              <div>
                <div className='filtroActivos'>
                  <div className={this.props.TabActivo == 0?'tabactivo active':'tabactivo'} onClick={()=>this.props.handleChangeTabActivo(0)}>En Proceso</div>
                  <div  className={this.props.TabActivo == 1?'tabactivo active':'tabactivo'} onClick={()=>this.props.handleChangeTabActivo(1)}>Terminados</div>
                  <div  className={this.props.TabActivo == 2?'tabactivo active':'tabactivo'} onClick={()=>this.props.handleChangeTabActivo(2)}>Cancelados</div>
                </div>
                  <div className='contentCardItem'>
                    {
                      this.props.productos.map((it,index)=>{
                        return(  <CardItemProducto selectItem={this.selectItem} producto={it} key={index}/>)
                      })
                    }
                  </div>
              </div>
              :
              <div>
                <div onClick={()=>this.setState({verCompra:!this.state.verCompra})} className='return'><Icon name='arrow left'></Icon></div>

                <ul  className='col2'>
                  <li>
                    <div className='carritoItems'>
                    {
                      this.state.productoSeleccionado.carritoItems.map((it,index)=>{
                        return(<CardItemProductoCarrito  producto={it} key={index}/>)
                      })
                    }
                    </div>
                  </li>
                  <li>
                    {this.state.productoSeleccionado.Status==1 ||this.state.productoSeleccionado.Status==2?
                      <div className='CardInfo Compra'>
                        <h3>Estatus</h3>
                        <p>
                          {this.state.productoSeleccionado.Status==1?"Terminado":'Cancelado'}
                        </p>
                      </div>
                      :
                      <div>
                        {this.state.confirmar?
                          <div className='CardInfo Compra'>
                            {this.state.loading?
                              <div className='btnRealizarCompra dateUpdate'>
                                <Icon loading name='spinner' />
                              </div>
                              :
                              <div onClick={this.updateStatus} className='btnRealizarCompra dateUpdate'>
                                Confirmar cambio
                              </div>
                            }
                          </div>
                          :
                          <div className='CardInfo Compra'>
                            {!this.state.newFecha?
                              <div>
                                <h3>Fijar fecha de entrega</h3>
                                <div className='input label'>
                                  <input value={this.state.nuevaFecha} type='date' onChange={(e)=>this.setState({nuevaFecha:e.target.value})}/>
                                </div>
                                {this.state.loading?
                                  <div className='btnRealizarCompra dateUpdate'>
                                    <Icon loading name='spinner' />
                                  </div>
                                  :
                                  <div onClick={this.updateNewDate} className='btnRealizarCompra dateUpdate'>
                                    Actualizar fecha
                                  </div>
                                }
                              </div>
                              :
                              <div>
                                <div onClick={()=>this.actualizarStatus(1)} className='btnRealizarCompra dateUpdate'>
                                  Terminar pedido
                                </div>
                                <div onClick={()=>this.actualizarStatus(2)} className='btnRealizarCompra cancelar'>
                                  Cancelar pedido
                                </div>
                              </div>
                            }
                          </div>
                        }
                      </div>
                    }

                    <div className='CardInfo Compra'>
                      <h3>ID de la compra</h3>
                      <p>{this.state.productoSeleccionado.idTransaccion}</p>
                    </div>
                    <div className='CardInfo Compra'>
                      <h3>Informacion de pago</h3>
                      <div className='cargoInfo'>
                        <div className='itemCargoInfo'>
                          <h5>Tarjeta</h5>
                          <p>{this.state.productoSeleccionado.cargoInfo.TarjetaDisplay}</p>
                        </div>
                        <div className='itemCargoInfo'>
                          <h5>Pago total</h5>
                          <p>{parseInt(this.state.productoSeleccionado.cargoInfo.Amount).toFixed(2)} MXN</p>
                        </div>
                      </div>
                    </div>
                    <div className='CardInfo Compra'>
                      <h3>Informacion de envio</h3>
                      <div className='cargoInfo'>
                        <div className='itemCargoInfo'>
                          <h5>Status</h5>
                          {this.state.productoSeleccionado.fechaEntrega?
                            <p>Antes del {this.state.productoSeleccionado.fechaEntrega}</p>
                            :
                            <p>Estamos preparando el envio</p>
                          }
                        </div>
                        <div className='itemCargoInfo'>
                          <h5>Domicilio</h5>
                          <p>{this.state.productoSeleccionado.direccionEnvio.CPDireccion + ", "+ this.state.productoSeleccionado.direccionEnvio.CalleDireccion+" "+this.state.productoSeleccionado.direccionEnvio.NumDireccion}</p>
                        </div>
                        <div className='itemCargoInfo'>
                          <h5>Municipio/Estado</h5>
                          <p>{this.state.productoSeleccionado.direccionEnvio.MunicipioDireccion+', '+this.state.productoSeleccionado.direccionEnvio.EstadoDireccion}</p>
                        </div>
                        <div className='itemCargoInfo'>
                          <h5>Indicaciones extras</h5>
                          <p>{this.state.productoSeleccionado.direccionEnvio.IndicacionesDireccion}</p>
                        </div>
                        <div className='itemCargoInfo'>
                          <h5>Recibe</h5>
                          <p>{this.state.productoSeleccionado.direccionEnvio.NombreDireccion}</p>
                        </div>
                        <div className='itemCargoInfo'>
                          <h5>Telefono contacto</h5>
                          <p>{this.state.productoSeleccionado.direccionEnvio.numContactoDireccion}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <div className='clear'></div>
                </ul>
              </div>
            }
          </div>
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
    }
  }
  render(){
    let date = new Date(this.props.producto.fechaCreacion);

    console.log(this.props.producto);
    return(
      <div onClick={()=>this.props.selectItem(this.props.producto)} className='CardItem'>
        <div className='imgCardItem'><img src={this.props.producto.carritoItems[0].imgProducto?this.props.producto.carritoItems[0].imgProducto:''}></img></div>
        <div className='infoCardItem left'>
          <h3>{this.props.producto.nombreProducto}</h3>
          <p>{this.props.producto.idProducto}</p>
        </div>
        <div className='infoCardItem center'>
          <h3>Cantidad</h3>
          <p>{this.props.producto.carritoItems.length}</p>
        </div>
        <div className='infoCardItem center'>
          <h3>Enviado a </h3>
          <p>{this.props.producto.direccionEnvio.CPDireccion + ", "+ this.props.producto.direccionEnvio.CalleDireccion+" "+this.props.producto.direccionEnvio.NumDireccion}</p>
        </div>
        <div className='infoCardItem center'>
          <h3>Comprado el </h3>
          <p>{date.getDate()+'/'+(parseInt(date.getMonth())+1)+"/"+date.getFullYear()}</p>
        </div>
        <div className='infoCardItem center'>
          <h3>Fecha entrega</h3>
          {this.props.producto.fechaEntrega?
            <p>Antes del {this.props.producto.fechaEntrega}</p>
            :
            <p>Estamos preparando el envio</p>
          }

        </div>
      </div>
    )
  }
}


class CardItemProductoCarrito extends Component {
  constructor() {
    super()
    this.state = {
      loading:false,
      modificar:false,
      productoEncontrado:{}
    }
  }

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

          </div>
          <AlertSnack openAlert={this.state.openAlert} titleAlert={this.state.titleAlert} resetAlert={this.resetAlert} AlertMessage={this.state.AlertMessage} AlertType={this.state.AlertType}/>

      </div>

    )
  }
}





export default ContentMisCompras;
