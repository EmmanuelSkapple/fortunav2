import React, { Component } from 'react';
import {Icon,Label} from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import '../../stylesUser/slideBar.css';
import '../../styles/General.css';
import * as firebase from 'firebase'



class slideBar extends Component{
  constructor(){
    super()
    this.state ={
      mostrarSubVentas:false,
      mostrarSubCompras:false,
    }
    console.log('SlideBar');
  }
  render(){
    return(
      <div className="contenedorSlideBar">
        <div className='headerSlide'>
          <Icon name='bars'></Icon>
          <h1>Mi cuenta</h1>
        </div>
        <p className='bienvenido' >¡Bienvenido {this.props.nombre}!</p>
        <div className='listaContent'>
          <div className='IconColumn'>
          <Link to="/fortunaAdmin">
            <Icon name='pie graph'></Icon>
            <p className='slideTitle'>Resumen</p>
          </Link>
          </div>
          <div className='IconColumn'>
          <Link to="/fortunaAdmin/MisProductos">

            <Icon name='clipboard'></Icon>
            <p className='slideTitle'>Mis productos</p>
          </Link>
          </div>
          <div className='IconColumn'>
          <Link to="/fortunaAdmin/Categorias">

            <Icon name='clipboard'></Icon>
            <p className='slideTitle'>Categorias</p>
          </Link>
          </div>
          <div className='IconColumn'>
            <Link to="/fortunaAdmin/Ventas">
              <Icon name='shopping bag'></Icon>
              <p className='slideTitle'>Ventas</p>
            </Link>
          </div>

          <div className='IconColumn' onClick={()=>firebase.auth().signOut()}>
              <Icon name='log out'></Icon>
              <p className='slideTitle'>Salir</p>
          </div>
          <div className='clear'></div>
        </div>
      </div>
    )
  }
}

export default slideBar;
