import React, { Component } from 'react';
import * as firebase from 'firebase';
import MenuUsuario from './slideBar.js'
import Footer from '../Footer.js'
import '../../stylesUser/ResumenCuenta.css';
import Menu from '../header.js'
import '../../styles/General.css';


class ContentResumenCuenta extends Component{
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
            <ResumenCuenta/>
          </div>
        </div>
      </div>
    )
  }
}

class ResumenCuenta extends Component{
  constructor(){
    super()

  }

  render(){
    return(
      <div className='contentResumenCuenta'>
        <div className='cardsAnaliticas'>
          <div className='cardsAnaliticasIndividual'>
            <div className='headerCard'><div className='iconHelp'>?</div></div>
            <div className='IconCard'><img  src="../imgs/iconPublicaciones.png"/></div>
            <div className='CardDigito'>140</div>
            <div className='descripcionCard'>total publicaciones</div>
          </div>
          <div className='cardsAnaliticasIndividual'>
            <div className='headerCard'><div className='iconHelp'>?</div></div>
            <div className='IconCard dinero'><img  src="../imgs/iconDinero.png"/></div>
            <div className='CardDigito'>10K</div>
            <div className='descripcionCard'>Dinero generado</div>
          </div>
          <div className='cardsAnaliticasIndividual'>
            <div className='headerCard'><div className='iconHelp'>?</div></div>
            <div className='IconCard'><img  src="../imgs/iconCompras.png"/></div>
            <div className='CardDigito'>5</div>
            <div className='descripcionCard'>total compras</div>
          </div>
        </div>
      </div>
    )
  }
}


export default ContentResumenCuenta;
