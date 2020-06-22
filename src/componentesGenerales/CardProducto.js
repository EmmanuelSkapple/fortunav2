import React, { Component } from 'react';
import {Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import './CardProducto.css'

class CardProducto extends Component{
  constructor(){
    super()

  }
  render(){
    return(
      <div className='CardPromociones'>
          <div className='CardHeader'>
            <Link to={"/producto/"+this.props.producto.idProducto+"/"+this.props.producto.urlProducto}>

              <div className='imgItem'>
                <img  src={this.props.producto.imagenes?this.props.producto.imagenes[0]:''} />
              </div>
            </Link>
          </div>

        <div className='divider'></div>
          <div className='CardContenido'>
            <Link to={"/producto/"+this.props.producto.idProducto+"/"+this.props.producto.urlProducto}>
              <p className='tituloItem'>{this.props.producto.nombreProducto}</p>
              <p className='precioItem'>{parseInt(this.props.producto.precioProducto).toFixed(2)+' MXN'}</p>
              <p className='precioDecuento'>{parseInt(this.props.producto.precioDescuentoProducto).toFixed(2)+' MXN'}</p>
              <p className='unidades'>{this.props.producto.cantidadProducto+' '+this.props.producto.unidadProducto} </p>
            </Link>
          </div>
          {/* <div className='btnAgregarCarrito'>Agregar al carrito</div> */}
        <div className='btnMasInfo'>Ver mas</div>
      </div>
    )
  }
}
export default CardProducto;
