import React, { Component } from 'react';
import {Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import './CardProducto.css'
import axios from 'axios';
import {Direccion} from '../strings/peticiones.js';
import * as firebase from 'firebase'

class CardItemProductoCarrito extends Component{
  constructor(){
    super()

  }
  borrarItemCarrito=()=>{
    let self = this;
    axios.post(Direccion+`/borrar-item-carrito`,{idUser:firebase.auth().currentUser.uid,idItemCarrito:this.props.producto.idItemCarrito})
        .then(res => {
          if (res.data.status == 'OK') {
            self.props.getCarrito();
            self.props.getTotalCarrito();
          }else{
            this.getCarrito();
            this.getTotalCarrito();
            console.log(res.data.error);
          }
        }).catch((error)=>{
            console.log(error);
        })
  }
  render(){
    return(
      <div className='CardItemContent'>
        <div className='closeBtn' onClick={this.borrarItemCarrito}>
          <Icon name='close' ></Icon>
        </div>
        <Link to={"/producto/"+this.props.producto.idProducto+"/"+this.props.producto.urlProducto}>
          <div className='CardCarrito'>

            <img src={this.props.producto.imgProducto}/>
              <div className='CardCarritoContent'>
                  <h3>{this.props.producto.nombreProducto}</h3>
                  <p><span>{this.props.producto.cantidadProducto}</span> x {this.props.producto.cantidadPorItem+' '+this.props.producto.unidadProducto} </p>
              </div>
          </div>
        </Link>
      </div>
    )
  }
}
export default CardItemProductoCarrito;
