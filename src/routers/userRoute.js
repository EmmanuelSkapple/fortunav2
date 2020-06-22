import React,{Component} from 'react'
import {Route, BrowserRouter, Link, Redirect, Switch,Router} from 'react-router-dom'
import * as firebase from 'firebase'
import axios from 'axios';
import {ref,firebaseAuth} from '../strings/const.js'
import {Direccion} from '../strings/peticiones.js';
import HomepageLayout from '../components/home.js';
import finalizarCompra from '../components/userComponents/finalizarCompra.js'
import MisCompras from '../components/userComponents/MisCompras.js'
import ResumenCuenta from '../components/userComponents/ResumenCuenta.js'
import Perfil from '../components/userComponents/Perfil.js'
import InfoExtraTerraza from '../components/infoTerraza.js'
import Variedades from '../components/Variedades.js';
import Tienda from '../components/Tienda/Tienda.js';
import DetalleProducto from '../components/Tienda/DetalleProducto.js';

class UserRoutes extends Component{
  constructor(){
    super()
    console.log('router user');
  }
  render(){
    return(
      <div>
            <Switch>
              <Route exact path="/user" component={Perfil}/>
              <Route path="/user/FinalizarCompra" component={finalizarCompra}/>
              <Route path="/user/Perfil" component={Perfil}/>
              <Route path="/user/Compras" component={MisCompras}/>
              <Route  path= '/' component={HomepageLayout}/>
              <Route  path= '/Terraza' component={InfoExtraTerraza}/>
              <Route  path= '/tienda' component={Tienda}/>
              <Route  path= '/variedades' component={Variedades}/>
              <Route path="/producto/:id/:nombre" component={DetalleProducto}/>
            </Switch>
      </div>
    )
  }
}
export default UserRoutes;
