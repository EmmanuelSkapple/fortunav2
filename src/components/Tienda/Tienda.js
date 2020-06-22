import React, {Component} from 'react';
import LogoSVG from '../logoSvg.js';
import Menu from '../header.js';
import Footer from '../Footer.js';
import '../../styles/Tienda.css';
import '../../styles/General.css';
import CardProducto from '../../componentesGenerales/CardProducto.js';
import axios from 'axios'
import {Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import AlertSnack from '../utileriaComponents/Alerta.js';
import {Direccion} from '../../strings/peticiones.js';


class ContentTienda extends Component {

  render(){
    return(
      <div>
        <Menu black={true}/>
        <Tienda/>
      </div>
    )
  }
}

class Tienda extends Component {

  constructor(){
    super();
    this.state={
      galeriaImg:'03',
      index:0,
      productos:[],
      loading:true,
    }
  }

  componentDidMount(){
    this.getProductosPromocion();
  }

  getProductosPromocion = () =>{
    axios.get(Direccion+'/tomar-producto-promocion')
      .then(res=>{
        if(res.data.status){
          this.setState({
            productos:res.data.datos,
            loading:false,
          })
        }else{
          this.setState({openAlert:true,errorType:res.data.errorCode,loading:false,})
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  resetAlert = ()=>{this.setState({openAlert:false,titleAlert:'',AlertMessage:'',AlertType:''})}

  render (){
       return (
         <div className="Tienda">
           <AlertSnack openAlert={this.state.openAlert} titleAlert={this.state.titleAlert} resetAlert={this.resetAlert} AlertMessage={this.state.AlertMessage} AlertType={this.state.AlertType}/>
           <section className='seccion1'>
             <div className='bannerContent'>
               <img  src="/imgs/TiendaBanner.png"  />
               <div className='bannerText'>
                 <h2>Cerveceros por Fortuna</h2>
                 <p>Tienda</p>
               </div>
             </div>
           </section>

           <section className='seccion2'>
             <div className='headerTienda'>
               <div className='divisorHeaderTienda'></div>
               <h2 className='titleTiendaSeccion'>Cerveza</h2>
               <div className='divisorHeaderTienda'></div>
             </div>
             <div className='contenedor'>

               {this.state.loading?
                 <div className='loaderSpinner'>
                   <Icon loading={this.state.loading} name={this.state.loading?'spinner':'image outline'}></Icon>
                 </div>
                 :
                 <ul className='col4'>
                   {this.state.productos.map((it,i)=>{
                      return( <li  key={it.idProducto}><CardProducto producto={it}/></li>  )
                      })
                    }
                   <div className='clear'></div>
                 </ul>
               }
             </div>
           </section>

         </div>
      )
    }
}
export default ContentTienda;
