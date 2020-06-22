import React, {Component} from 'react';
import LogoSVG from '../logoSvg.js';
import Menu from '../header.js';
import Footer from '../Footer.js';
import '../../styles/Tienda.css';
import '../../styles/General.css';
import CardProducto from '../../componentesGenerales/CardProducto.js';
import axios from 'axios'
import {Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import AlertSnack from '../utileriaComponents/Alerta.js';
import {Direccion} from '../../strings/peticiones.js';
import * as firebase from 'firebase';



class ContentDetalleProducto extends Component {
  constructor(){
    super()
  }
  render(){
    return(
      <div>
        <Menu black={true}/>
        <DetalleProducto propsParent={this.props}/>
      </div>
    )
  }
}

class DetalleProducto extends Component {
  constructor(){
    super();
    this.state={
      galeriaImg:'03',
      idProductoFromUrl:'',
      index:0,
      cantidad:1,
      loading:true,
      productoEncontrado:{}
    }
  }

  componentDidMount(){
    let objProducto = this.getIDandNameFromUrl(this.props.propsParent.location.pathname)
    this.setState({idProductoFromUrl:objProducto.idProducto,NameProductoFromUrl:objProducto.NameProducto})
    this.searchProductWhitIDandName(objProducto.idProducto,objProducto.NameProducto);
  }
    searchProductWhitIDandName=(idProducto,NameProducto)=>{
      let self = this;
      axios.post(Direccion+`/get-producto-whitId`,{idProducto:idProducto,NameProducto:NameProducto})
          .then(res => {
            if(res.data.status){
              console.log(res.data);
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
    getIDandNameFromUrl=(url)=>{
      let firstDash = url.indexOf("/");
      let secondDash = url.indexOf("/",firstDash+1);
      let threeDash = url.indexOf("/",secondDash+1);

      let idProducto = url.substring(url.indexOf("/",firstDash+1)+1,url.indexOf("/",secondDash+1) );
      let NameProducto = url.substring(url.indexOf("/",secondDash+1)+1, url.length-url.indexOf("/",threeDash+1));
      return ({NameProducto:NameProducto,idProducto:idProducto});
    }
    SubirItemCarrito=()=>{
      let self = this;
      if (firebase.auth().currentUser) {
        axios.post(Direccion+`/subir-item-carrito`,{idUser:firebase.auth().currentUser.uid,idProducto:this.state.productoEncontrado.idProducto,nombreProducto:this.state.productoEncontrado.nombreProducto,imgProducto:this.state.productoEncontrado.imagenes[0],cantidadProducto:this.state.cantidad,cantidadPorItem:this.state.productoEncontrado.cantidadProducto,unidadProducto:this.state.productoEncontrado.unidadProducto})
        .then(res=>{
          console.log(res.data);
          if (res.data.status) {
            self.setState({
              openAlert:true,titleAlert:'Exito',AlertMessage:'Producto agregado al carrito',AlertType:'success',
            })
          }else {
            self.setState({
              openAlert:true,titleAlert:'Algo paso mal!',AlertMessage:'error al agregar al carrito',AlertType:'error',
            })
          }
        }).catch(err=>{
          console.log(err);
        })
      }else{
        self.setState({
          openAlert:true,titleAlert:'Ups!',AlertMessage:'Entra a tu cuenta o registrate, para poder acceder a tu carrito',AlertType:'warning',
        })
      }
    }

    resetAlert = ()=>{this.setState({openAlert:false,titleAlert:'',AlertMessage:'',AlertType:''})}

  render (){
       return (
         <div className="DetalleProducto">
           <section className='seccion1'>
             <div className='return'><Link to='/Tienda'><Icon name='arrow left'></Icon></Link></div>
             <div className='bgDetalleProducto'>
               <div className='contenedor'>
                 <ul className='col3'>
                   <li>
                     <div className='infoProducto'>
                       <div className='twoItems'>
                         <div className='itemInfo'>
                           <h3>Cerveceria:</h3>
                           <p>{this.state.productoEncontrado.marcaProducto}</p>
                         </div>
                         <div className='itemInfo'>
                           <h3>Color:</h3>
                           <p>{this.state.productoEncontrado.colorProducto}</p>
                         </div>
                         <div className='itemInfo'>
                           <h3>Estilo:</h3>
                           <p>{this.state.productoEncontrado.estiloProducto}</p>

                         </div>
                       </div>
                       <div className='twoItems'>

                        <div className='itemInfo'>
                          <h3>Alc.Vol:</h3>
                          <p>{this.state.productoEncontrado.alcProducto+'%'}</p>

                        </div>
                        <div className='itemInfo'>
                          <h3>Presentacion:</h3>
                          <p>{this.state.productoEncontrado.presentacionProducto}</p>
                        </div>
                      </div>



                     </div>
                   </li>
                   <li>
                     <div className='imgProductoDetalle'>
                       <img  src={this.state.productoEncontrado.imagenes?this.state.productoEncontrado.imagenes[0]:''} />
                     </div>
                   </li>
                   <li>
                     <div className='infoExtraProducto'>
                       <h2>{this.state.productoEncontrado.nombreProducto}</h2>
                       <p>{descriptionWhitLine(this.state.productoEncontrado.descripcionProducto)}</p>
                       <p className='precioItem'>$ {parseInt(this.state.productoEncontrado.precioProducto).toFixed(2)} MXN</p>
                       <p className='precioDecuento'>$ {parseInt(this.state.productoEncontrado.precioDescuentoProducto).toFixed(2)} MXN</p>
                     </div>
                       <p className='cantidad'> <span>{this.state.cantidad}</span> Unidad contiene <span>{parseInt(this.state.productoEncontrado.cantidadProducto)*parseInt(this.state.cantidad)}</span> botellas</p>
                     <div className='actionsDetalleProducto'>
                       <div className='inputCantidad'>
                        <span onClick={()=>this.setState({cantidad:this.state.cantidad==1?1:this.state.cantidad-1})}>-</span>
                        <p>{this.state.cantidad}</p>
                        <span onClick={()=>this.setState({cantidad:this.state.cantidad+1})}>+</span>
                      </div>
                      <div onClick={this.SubirItemCarrito} className='btnAgregarCarrito'>Agregar al carrito</div>
                     </div>
                   </li>
                   <div className='clear'></div>
                 </ul>
               </div>

             </div>
           </section>
           <AlertSnack openAlert={this.state.openAlert} titleAlert={this.state.titleAlert} resetAlert={this.resetAlert} AlertMessage={this.state.AlertMessage} AlertType={this.state.AlertType}/>
         </div>
      )
    }
}
const descriptionWhitLine = (string) => {
  if (string) {
    return string.replace(/(\r\n|\r|\n|\\n)/g, '\n');

  }
}
export default ContentDetalleProducto;
