import React,{Component} from 'react'
import {Route, BrowserRouter, Link, Redirect, Switch,Router} from 'react-router-dom'
import HomepageLayout from '../components/home.js';
import InfoExtraTerraza from '../components/infoTerraza.js'
import Variedades from '../components/Variedades.js';
import Tienda from '../components/Tienda/Tienda.js';
import * as firebase from 'firebase'
import axios from 'axios';
import {ref,firebaseAuth} from '../strings/const.js'
import {Direccion} from '../strings/peticiones.js';
import DetalleProducto from '../components/Tienda/DetalleProducto.js';
import LoadPage from '../components/utileriaComponents/LoaderPage.js';
import UserRoutes from './userRoute.js'
import AdminRoutes from './adminRoute.js'
import Login from '../components/Login.js';


function PrivateAdministracion({component: Component,mode, authed,user, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true &&   mode!=0
        ? <Component {...props} />
        : <Redirect to={{pathname: '/user' , state: {from: props.location}}} />}
    />
  )
}

function PrivateRouteUser ({component: Component,mode, authed,user, ...rest}) {
  console.log(authed);
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login' , state: {from: props.location}}} />}
    />
  )
}
function PublicRoute ({component: Component,mode, authed, ...rest}) {
  return (
    <Route
      {...rest}

      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/fortunaAdmin' />}
    />
  )
}

class RouterPrincipal extends Component {
  constructor(){
    super()
    this.state={
        autenticado:false,
        loading:true,
        user:'',
        mode:"",
        title:"",
        message:"",
        openAlert:false,
      }
  }
  componentDidMount(){
    var self =this;
    this.removeListener=firebaseAuth.onAuthStateChanged((user)=>{
      if(user){
        self.setState({loading:true,})
        axios.post(Direccion+`/login-usuario`,{idUser:user.uid})
        .then(res => {
          console.log(res.data);
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
              user:user.uid,
              autenticado:true,
              loading:false,
              mode:res.data.mode,
            })
          }
        })
        .catch(error=>{
          self.setState({loading:false,})
          console.log(error);
        })

      }
      else{
        console.log('No logeado');
        this.setState({
          autenticado:false,
          loading:false
        })
      }
    })
  }

    componentWillUnmount(){
      this.removeListener()
    }
  render() {

    return this.state.loading === true ? <LoadPage/> :(
      <BrowserRouter >
        <Switch>
          <Route exact path= '/' component={HomepageLayout}/>
          <Route  path= '/Terraza' component={InfoExtraTerraza}/>
          <Route  path= '/tienda' component={Tienda}/>
          <Route  path= '/variedades' component={Variedades}/>
          <Route path="/producto/:id/:nombre" component={DetalleProducto}/>
          <PrivateRouteUser mode={this.state.mode} user={this.state.user } authed={this.state.autenticado} path="/user" component={UserRoutes}/>
          <PublicRoute mode={this.state.mode} authed={this.state.autenticado} path="/login" component={Login}/>
          <PrivateAdministracion mode={this.state.mode} user={this.state.user } authed={this.state.autenticado} path="/fortunaAdmin" component={AdminRoutes}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RouterPrincipal;
