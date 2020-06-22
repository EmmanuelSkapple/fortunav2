import React,{Component} from 'react'
import {Route, BrowserRouter, Link, Redirect, Switch,Router} from 'react-router-dom'
import * as firebase from 'firebase'
import axios from 'axios';
import {ref,firebaseAuth} from '../strings/const.js'
import {Direccion} from '../strings/peticiones.js';
import ResumenCuenta from '../components/adminComponents/ResumenCuenta.js';
import MisVentas from '../components/adminComponents/MisVentas.js'
import MisProductos from '../components/adminComponents/MisProductos.js'
import InfoExtraTerraza from '../components/infoTerraza.js'
import Variedades from '../components/Variedades.js';
import Tienda from '../components/Tienda/Tienda.js';
import DetalleProducto from '../components/Tienda/DetalleProducto.js';
import HomepageLayout from '../components/home.js';

class AdminRoutes extends Component{
  constructor(){
    super()
    console.log('router admin');
  }

  render(){
    return(
      <div>
        <Switch>
          <Route exact path="/fortunaAdmin" component={ResumenCuenta}/>
          <Route path="/fortunaAdmin/Ventas" component={MisVentas}/>
          <Route path="/fortunaAdmin/MisProductos" component={MisProductos}/>
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
export default AdminRoutes;
