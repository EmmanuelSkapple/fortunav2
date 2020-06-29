import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import {Icon} from 'semantic-ui-react'
import * as firebase from 'firebase'
import CardItemProductoCarrito from '../componentesGenerales/CardProductoCarrito.js';
import axios from 'axios';
import {Direccion} from '../strings/peticiones.js';

import '../styles/Header.css';
import '../styles/General.css';

class Menu extends Component{
  constructor(){
    super();
    this.state={
      black:false,
      openMenuMobil:false,
      userActual:'',
      carritoOpen:false,
      productosCarrito:[],
      infoExtraCarrito:{},
      loading:false,
      mode:0,
    }
  }
  componentDidMount(){
    this.getCarrito();
    this.getTotalCarrito();
    this.setState({black:this.props.black})
    var self =this;
    var user = firebase.auth().currentUser;
    if (user) {
      axios.post(Direccion+`/login-usuario`,{idUser:user.uid})
      .then(res => {
        if(res.data.status == '404'){
          this.setState({
            autenticado:false,
            loading:false
          })
        }
        else if(res.data.status == '401'){
          this.setState({
            autenticado:false,
            loading:false,
            openAlert:true,
            tipoAlerta: 'error',
            messageAlert:"Usuario bloqueado",
            titleAlert:"Usuario bloqueado"
          })
        }
        else if (res.data.status == 'OK') {
          this.setState({
            mode:res.data.mode,
          })
        }
      })
      .catch(error=>{
        self.setState({loading:false,})
        console.log(error);
      })
      self.setState({
        userActual:user.displayName,

      })
    }
    var width = window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
    if (width <= 839) {
      this.setState({black:true})
    }
      var black = this.props.black
      // $(document).scroll(function() {
      //   var scrollTop = $(window).scrollTop()
      //   if (!black) {
      //     if (scrollTop >= 20 ) {
      //         $('#Menu').addClass("topBlack");
      //     }
      //     else{
      //       var width = window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
      //       if (width >= 839 && !black) {
      //         console.log(!black);
      //         $('#Menu').removeClass("topBlack");
      //       }
      //     }
      //   }
      // });

      window.addEventListener('click', function(e){
        if (document.getElementById('carritoSlider')) {
          if (document.getElementById('carritoSlider').contains(e.target)){
            // Clicked in box
          } else{
            if (self.state.carritoOpen) {
                self.setState({carritoOpen:false})
            }
            // Clicked outside the box
          }
        }
        if ( document.getElementById('carrito').contains(e.target)) {
          if (!self.state.carritoOpen) {
              self.setState({carritoOpen:true})
          }
        }

      });

  }

  getCarrito=()=>{
    let self = this;
    if(firebase.auth().currentUser){
      axios.post(Direccion+`/tomar-carrito`,{idUser:firebase.auth().currentUser.uid})
          .then(res => {

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

  openCarrito=()=>{
    this.getCarrito();
    this.getTotalCarrito();
    this.setState({carritoOpen:!this.state.carritoOpen})
  }
  render() {

   return (
     <div id='Menu' className='Menu topBlack'>
       <div className='contentMenu'>
         <div className='menu_mobil' onClick={()=>this.setState({openMenuMobil:!this.state.openMenuMobil})}>
           <div className='dash'></div>
           <div className='dash'></div>
           <div className='dash'></div>
         </div>
         <ul className={this.state.openMenuMobil?'col1 lista_mobil activa':'col1 lista_mobil'}>
           <li>
             <Link className="menu" to={`/`}>Inicio</Link>
           </li>
           <li>
              <Link className="menu"to={`/variedades`}>Nuestras cervezas</Link>
           </li>
           <li>
             <Link className="menu" to={`/tienda`}>Tienda</Link>
           </li>
           <li>
             <div className={this.state.mostrarSubCompras?'IconColumn active':'IconColumn'}  onClick={()=>this.setState({mostrarSubCompras:!this.state.mostrarSubCompras})}>
               <Icon name='user outline'></Icon>
             </div>
           </li>
           {this.state.mode ==1?
             <div className={this.state.mostrarSubCompras?'subMenu active':'subMenu'}>
               <li className='li submenu'>
                 <Link to="/fortunaAdmin">Resumen</Link>
               </li>
               <li>
                 <Link to="/fortunaAdmin/MisProductos">Mis productos</Link>
               </li>
               <li>
                  <Link to="/fortunaAdmin/Ventas">Ventas</Link>
               </li>
               <li className='IconColumn' onClick={()=>firebase.auth().signOut()}>
                 <Link>Salir</Link>
               </li>
             </div>
             :
             <div className={this.state.mostrarSubCompras?'subMenu active':'subMenu'}>
               <li className='li submenu'>
                 <Link to="/user">Resumen</Link>
               </li>
               <li>
                 <Link to="/user/Perfil">Mis datos</Link>
               </li>
               <li>
                  <Link to="/user/Compras">Compras</Link>
               </li>
               <li className='IconColumn' onClick={()=>firebase.auth().signOut()}>
                 <Link to="/user/Compras">Salir</Link>
               </li>
             </div>
           }


          <div className='clear'></div>

         </ul>
         <ul className="col6 lista_pc">
           <li className='Not_mobil'>
             <img className='logo'  src="/imgs/sprites-uno.png"  />
           </li>
           <li className='Not_mobil'>
             <Link className="menu" to={`/`}>Inicio</Link>
           </li>
           <li className='Not_mobil'>
              <Link className="menu"to={`/variedades`}>Nuestras cervezas</Link>
           </li>
           <li className='Not_mobil'>
             <Link className="menu" to={`/tienda`}>Tienda</Link>
           </li>
           <li className='Not_mobil'>
              <Link className="menu" to={`/user`}><Icon name='user outline'></Icon></Link>

           </li>
           <li>
             <div  id='carrito' onClick={this.openCarrito} className='carrito'>
             <div className="BadgeCarrito">
               <p>{this.state.infoExtraCarrito.totalItems?this.state.infoExtraCarrito.totalItems:'0'}</p>
             </div>
               <div  className="MenuCar" >
               <span>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15">
                   <path d="M3 0c.7.2 1 .8 1.2 1.5l.6 2.1c.1.3.2.3.4.3h9.6c.7 0 .9.2.6.9l-2.1 6.3c-.2.5-.2.6-.8.6h-6c-.6 0-.7-.1-.8-.6C4.8 8 4 4.8 3.1 1.7c-.2-.6-.2-.6-.8-.6H.8c-.3 0-.5 0-.6-.3C.1.5.2.3.5.1 1.3 0 2.1 0 3 0zm2.1 4.8V5c.5 1.8 1 3.6 1.4 5.4.1.2.2.3.4.3h5.2c.2 0 .3-.1.4-.3.6-1.7 1.2-3.5 1.7-5.2 0-.1 0-.2.1-.3-3.1-.1-6.1-.1-9.2-.1z" style={{color: '#ececec'}}></path>
                   <circle cx="7.1" cy="13.8" r="1.2" style={{color: '#ececec'}}></circle>
                   <circle cx="11.5" cy="13.8" r="1.2" style={{color: '#ececec'}}></circle>
                 </svg>
               </span>
               </div>
             </div>
           </li>

         <div className="clear"></div>
         </ul>
       </div>
       {this.props.black && this.state.carritoOpen?
         <div id='carritoSlider' className={this.state.carritoOpen?'carritoSlider activo':'carritoSlider'}>

           <div className={this.state.carritoOpen?'carritoSliderContent activo':'carritoSliderContent'}>
             {
               this.state.productosCarrito.map((it,index)=>{
                 return(  <CardItemProductoCarrito getTotalCarrito={this.getTotalCarrito} getCarrito={this.getCarrito} producto={it} key={index}/>)
               })
             }
           </div>
           <div className='SlideCarritoDescripcion'>
             <p><span>{this.state.infoExtraCarrito.totalItems}</span> Producto(s)</p>
             <p>Total =  $<span>{parseInt(this.state.infoExtraCarrito.total?this.state.infoExtraCarrito.total:'0').toFixed(2)}</span> MXN</p>
           </div>
           {this.state.productosCarrito.length>0?
             <div className='SlideCarritoBotton'>
               <div onClick={this.borrarAllCarrito} className='BtnBorrarCarrito'>Borrar carrito</div>
               {this.state.infoExtraCarrito.total>0?
                 <div>
                   {this.state.infoExtraCarrito.totalItems < 12?
                     <div className='BtnFinalizarCompra'>
                       Compra minima 12 articulos
                     </div>
                     :
                     <div className='BtnFinalizarCompra'><Link to='/user/FinalizarCompra'>Finalizar compra</Link></div>

                   }
                 </div>
                 :
                 <div>
                 </div>
               }
             </div>:
             <div></div>
           }

         </div>
         :<div></div>
       }
     </div>
   );
 }
}



export default Menu;
