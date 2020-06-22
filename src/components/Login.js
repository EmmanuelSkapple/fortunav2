import React, {Component} from 'react';
import LogoSVG from './logoSvg.js';
import Menu from './header.js';
import Alerta from './utileriaComponents/Alerta.js';
import '../styles/Login.css';
import '../styles/General.css';
import {Icon} from 'semantic-ui-react'
import * as firebase from 'firebase'
import axios from 'axios';
import {ref,firebaseAuth} from '../strings/const.js'
import {Direccion} from '../strings/peticiones.js';

class ContentLogin extends Component {
  render(){
    return(
      <div>
        <Menu black={true}/>
        <Login/>
      </div>
    )
  }
}

class Login extends Component {
  constructor(){
    super();
    this.state={
      registro:false,
      EmailLogin:'',
      PassLogin:'',
      EmailRegistro:'',
      NombreRegistro:'',
      ApellidoRegistro:'',
      TelefonoRegistro:'',
      PassRegistro:'',
      PassConfirmacionRegistro:'',
      ErrorPassword:false,
      ErrorLengthPassword:true,
      ErrorConfirmarPassword:0,
      showPass:false,
      ventana:1,
      loading:false,
      openAlert:false,
    }
  }

  handleRegistrar=()=>{
    let self = this;
    self.setState({loading:true})
    console.log('entrando');
    if (this.validaRegistro()) {
      console.log('ya entre');

      axios.post(Direccion+`/registro-usuario`,{Email:this.state.EmailRegistro,Nombre:this.state.NombreRegistro, Apellido:this.state.ApellidoRegistro,Telefono:this.state.TelefonoRegistro,Pass:this.state.PassRegistro})
          .then(res => {
            console.log(res.data);

            if(res.data.status == "OK"){
              self.setState({
                EmailRegistro:'',
                NombreRegistro:'',
                ApellidoRegistro:'',
                TelefonoRegistro:'',
                PassRegistro:'',
                PassConfirmacionRegistro:'',
                loading:false,
                openAlert:true,
                tipoAlerta: 'success',
                registro:false,
                titleAlert:"¡Exito!",
                messageAlert:'Tu cuenta fue creada, ¡ingresa ahora!',
              })
              window.location.reload();
            }
            else if(res.data.status == 'error'){
              self.setState({
                loading:false,
                openAlert:true,
                tipoAlerta: 'error',
                titleAlert:"Algo anda mal!",
                messageAlert:res.data.contentStatus,
              })
            }
          })
    }
    else{
      self.setState({
        loading:false,
        openAlert:true,
        tipoAlerta: 'error',
        titleAlert:"Algo anda mal!",
        messageAlert:'Llena todos los campos',
      })
    }

  }
  validaRegistro=()=>{
    console.log(this.state);
    if(!this.state.EmailRegistro){return false}
    else if(!this.state.NombreRegistro){return false}
    else if(!this.state.ApellidoRegistro){return false}
    else if(!this.state.TelefonoRegistro){return false}
    else if(!this.state.PassRegistro){return false}
    else if(this.state.ErrorConfirmarPassword !=1){return false}
    else{return true}
  }
  handleLogin=()=>{
    this.setState({loading:true})
    let self = this;
    firebase.auth().signOut();
    firebaseAuth.signInWithEmailAndPassword(this.state.EmailLogin, this.state.PassLogin)
    .then(function(user){
    })
    .catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        self.setState({
          loading:false,
          openAlert:true,
          tipoAlerta: 'error',
          titleAlert:"Contraseña incorrecta",
          messageAlert:"Tu contraseña no es correcta, intentalo de nuevo."
        })
      }
      else if(errorCode==='auth/user-not-found'){
        self.setState({
          loading:false,
          openAlert:true,
          tipoAlerta: 'warning',
          messageAlert:"Usuario no existe, crea una cuenta para poder ingresar",
          titleAlert:"Usuario inexistente"
        })
      }
      else {
        alert(errorMessage);
      }
       console.log(error);
    });
  }

  HandleValidarPass=(e)=>{
    let value = e.target.value;
    let regex = /^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[#?!@$%^&*\-_]).{8,}$/;
    if (value.length < 8) {
      this.setState({ErrorLengthPassword:true,ErrorPassword:false})
    }else{
      this.setState({ErrorLengthPassword:false})
      if (regex.test(value)) {
        this.setState({ErrorPassword:false,PassRegistro:value})
        } else {
          this.setState({ErrorPassword:true})
        }
    }
  }
  ConfirmarPass=(e)=>{
    if (this.state.PassRegistro == e.target.value) {
      this.setState({ErrorConfirmarPassword:1})
    }else{
      this.setState({ErrorConfirmarPassword:2})
    }
  }

  resetAlert=()=>{this.setState({openAlert:false,tipoAlerta:'',messageAlert:'',titleAlert:''})}

  handleKeyPress = event => {
    if (event.key == 'Enter') {
      this.handleLogin();
    }
  };

  render (){
       return (
         <div className="Login">
           <section className='seccion1'>
             <div className='bgLogin'>
               {!this.state.registro?
                 <div className='loginContent'>
                    <div className='loginHeader'>Ingresar</div>
                    <div className='loginForm' onKeyPress={this.handleKeyPress}>
                        <input placeholder='Jose.Perez@ejemplo.com' onChange={(e)=>this.setState({EmailLogin : e.target.value})} />
                        <input value={this.state.PassLogin} type='password' placeholder='******' onChange={(e)=>this.setState({PassLogin : e.target.value})}/>
                    </div>
                    <div className='forgotPassword'>Olvide mi contraseña</div>
                    {this.state.loading?
                      <div  className='btnIngresar'  >
                        <Icon loading name='spinner' color='white' />
                      </div>
                      :
                      <div className='btnIngresar' onClick={this.handleLogin}>Entrar</div>
                    }
                    <div className='btnCrearCuenta' onClick={()=>this.setState({registro:true})}>Crear cuenta</div>
                 </div>
                 :
                 <div className='registroContent'>
                    <div className='loginHeader'>Registro</div>
                    <div className='loginForm'>
                      <div className='middleInputs'>
                       <div className='item'>
                         <label>Nombre</label>
                         <input placeholder='Jose'  onChange={(e)=>this.setState({NombreRegistro : e.target.value})} />
                       </div>
                       <div className='item'>
                         <label>Apellido</label>
                         <input placeholder='Perez' onChange={(e)=>this.setState({ApellidoRegistro : e.target.value})} />
                       </div>
                      </div>
                      <div className='middleInputs'>
                       <div className='item'>
                         <label>Correo electrónico</label>
                         <input placeholder='Jose.Perez@ejemplo.com' onChange={(e)=>this.setState({EmailRegistro : e.target.value})} />
                       </div>
                       <div className='item'>
                         <label>Telefono</label>
                         <input placeholder='1234567890' onChange={(e)=>this.setState({TelefonoRegistro : e.target.value})} />
                       </div>
                      </div>
                      <div className='middleInputs'>
                       <div className='item'>
                         <label>Constraseña</label>
                         <input type={this.state.showPass?'text':'password'} placeholder='******' onChange={this.HandleValidarPass} />
                           {this.state.ErrorLengthPassword?
                             <label className='warningPassword'>Minimo 8 caracteres</label> :<div></div>
                           }
                           {this.state.ErrorPassword?
                             <label className='warningPassword' >Incluye un numero y un signo</label> :<div></div>
                           }
                           {!this.state.ErrorLengthPassword && !this.state.ErrorPassword?
                             <label className='successPassword' >Perfecta!</label> :<div></div>

                           }
                           <div className='iconEyeRegistro' onMouseDown={()=>this.setState({showPass:true})} onMouseUp={()=>this.setState({showPass:false})}>
                             {!this.state.showPass?
                               <Icon name='eye slash outline'></Icon>:<Icon name='eye'></Icon>
                             }
                           </div>
                       </div>
                       <div className='item'>
                         <label>Confirmar Constraseña</label>
                         <input type={this.state.showPass?'text':'password'} placeholder='******' onChange={this.ConfirmarPass} />
                         {this.state.ErrorConfirmarPassword == 2?
                           <label className='warningPassword'>No coiciden las contraseñas</label>
                          :this.state.ErrorConfirmarPassword == 1?
                           <label className='successPassword'>Perfecto!</label>
                          :
                           <div></div>
                         }
                       </div>
                      </div>
                    </div>
                    {this.state.loading?
                      <div  className='btnIngresar'  >
                        <Icon loading name='spinner' color='white' />
                      </div>

                      :
                      <div  className='btnIngresar' onClick={this.handleRegistrar} >Registrarse</div>

                    }
                    <div className='btnCrearCuenta' onClick={()=>this.setState({registro:false})}>Regresar</div>
                 </div>
               }
             </div>
           </section>
           <Alerta titleAlert={this.state.titleAlert} messageAlert={this.state.messageAlert} tipoAlerta={this.state.tipoAlerta} openAlert={ this.state.openAlert} resetAlert={this.resetAlert}/>
         </div>
      )
    }
}
export default ContentLogin;
