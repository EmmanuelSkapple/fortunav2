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
          {/* <div className='IconColumn'>
          <Link to="/user">
            <Icon name='pie graph'></Icon>
            <p className='slideTitle'>Resumen</p>
          </Link>
          </div> */}
          <div className='IconColumn'>
          <Link to="/user/Perfil">

            <Icon name='user outline'></Icon>
            <p className='slideTitle'>Mis datos</p>
          </Link>

          </div>

          <div className='IconColumn'>
            <Link to="/user/Compras">
              <Icon name='shopping bag'></Icon>
              <p className='slideTitle'>Compras</p>
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
