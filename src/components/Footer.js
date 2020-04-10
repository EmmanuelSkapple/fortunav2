import React, {Component} from 'react';
import LogoSVG from './logoSvg.js';
import BarraSVG from './BarraSvg.js';

import '../styles/Footer.css';
import '../styles/General.css';

class Footer extends Component {

  constructor(){
    super();
    this.state={}
  }



render (){
     return (
       <div className="Footer">
         <section className='seccion1'>
           <div className='contenedor'>
             <ul className='col3'>
               <li>
                 <p>Cerveza Fortuna</p>
                 <p>Carretera Guadalajara-Nogales No. 4380</p>
                 <p>Zapopan, Jalisco</p>
                 <p>CP 45011</p>
                 <p>Teléfono  36277132</p>
                 <div className='lineVertical'></div>
               </li>
               <li>
                 <p>Redes Sociales</p>
                 <div className='RedesSociales'></div>
                 <div className='lineVertical'></div>

               </li>
               <li>
                 <p>www.alcoholinformate.org.mx</p>
                 <p>Aviso de privacidad</p>
                 <p>Responsabilidad social</p>
                 <div className='lineVertical'></div>

               </li>
               <div className='clear'></div>
             </ul>
             <div className='PowerBy'>
               <p>TODOS LOS DERECHOS RESERVADOS LYM GRUPO CERVECERO</p>
               <p>Hecho por Kodika</p>
             </div>
           </div>
         </section>
       </div>
    )
  }
}
export default Footer;
