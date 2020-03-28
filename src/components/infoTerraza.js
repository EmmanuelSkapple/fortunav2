import React, {Component} from 'react';
import LogoSVG from './logoSvg.js';
import Menu from './header.js';
import Footer from './Footer.js';
import BarraSVG from './BarraSvg.js';

import '../styles/infoTerraza.css';
import '../styles/General.css';


class ContentTerraza extends Component {

  render(){
    return(
      <div>
        <Menu black={true}/>
        <InfoTerraza/>
        <Footer/>
      </div>
    )
  }
}

class InfoTerraza extends Component {

  constructor(){
    super();
    this.state={
      galeriaImg:'03',
      index:0,
    }
  }

  render (){
    console.log("/imgs/TerrazaNueva"+this.state.galeriaImg+".png");
       return (
         <div className="infoTerraza">
           <section className="seccion1">
            <div className="BarraContenedor">
              <BarraSVG/>
            </div>
            <div className="contenedor">
              <ul className="col2 primer_lista">
                <li>
                  <div className="ContainerLeft">
                    <a className="btn btnReserva"><p>Reserva</p> <i class="fas fa-caret-right"></i></a>
                  </div>

                </li>
                <li>
                  <div className="ContainetTitle">
                    <p>Terr<span class="whiteText">aza</span> </p>
                    <p>Fo<span class="whiteText">rtuna</span></p>
                  </div>
                  <div className="TerrazaImg01">
                    <img  src="/imgs/TerrazaNueva01.png"  />
                    <a className="btnMasInfo">Mas informacion</a>
                  </div>

                </li>
                <div className="clear"></div>
               </ul>
            </div>
            <div className='diagonalSimple'><img  src="/imgs/diagonalSimple.png"  /></div>

           </section>

           <section className='seccion2'>
             <div className='contenedor'>
               <ul className='col2'>
                 <li>
                   <div className='contenedorPasion'>
                       <div className='listaImg'>
                         <img  src="/imgs/logoTapa.png"  />
                       </div>
                       <div className='listaLetra'>
                         <h1>Pasión</h1>
                         <h1 className='active'>Noción</h1>
                         <h1>Respeto</h1>
                       </div>
                       <div className='listaImg'>
                         <img  src="/imgs/logoTapa.png"  />
                       </div>
                       <div className='clear'></div>
                   </div>
                 </li>
                 <li>
                   <div className='contenTerrazaPasion'>
                     <img  src="/imgs/infoTerraza.png"  />
                   </div>
                 </li>
                 <div className='clear'></div>
               </ul>
             </div>
           </section>
           <div className='lineaHorizontal'><img  src="/imgs/lineaHorizontal.png"  /></div>
           <section className='seccion3'>
             <div className='contenedor'>
               <ul className='col2'>
                 <li>
                   <div className='TourContent'>
                     <img  src="/imgs/TourGuiado.png"  />
                     <div className='contentInfoTour'>
                       <h1>Tour Guiado</h1>
                       <p>Tour abierto al publico</p>
                       <p>lunes a domingo 11:30 am.</p>
                       <div className='btnReserva'>Reserva</div>
                       <p>Tour privados desde seis personas.</p>
                       <p>Martes a viernes 1-3:00pm.</p>
                       <p>Sabados a domingo 1:00pm.</p>
                       <p>Previa reservación</p>
                     </div>
                   </div>
                 </li>
                 <li>
                   <div className='petContent'>
                      <div className='petTitle'>
                        <h1> <span>En</span> Cerveza Fortuna</h1>
                        <p>somos</p>
                      </div>
                      <div className='petBirds'><img  src="/imgs/pajarosPet.png"/></div>
                      <div className='petFriend'><h1><span>Pet</span> friendly</h1></div>
                      <div className='petAnimal'><img  src="/imgs/animalesPet.png"/></div>
                   </div>
                 </li>
                 <div className='clear'></div>
               </ul>
             </div>
           </section>
           <section className='seccion4'>
             <div className='contenedor'>
               <h1>Proximos eventos</h1>
               <ul className='col3'>
                 <li>
                   <div className='contentEventos'>
                     <div className='imagenEventos'><img  src="/imgs/Evento1.png"/></div>
                     <div className='descripcionEventos'>
                       <h3>World Beer Cup</h3>
                       <p>Cerveza Fortuna presente en el World Beer Cup 2020</p>
                     </div>
                   </div>
                 </li>
                 <li>
                   <div className='contentEventos'>
                     <div className='imagenEventos'><img  src="/imgs/Evento2.png"/></div>
                     <div className='descripcionEventos'>
                       <h3>Primer Open House 2020</h3>
                       <p>Cerveza Fortuna te invita a nuestro primer Open House del año. llamanos y reserva tu lugar</p>
                     </div>
                   </div>
                 </li>
                 <li>
                   <div className='contentEventos'>
                     <div className='imagenEventos'><img  src="/imgs/Evento3.png"/></div>
                     <div className='descripcionEventos'>
                       <h3>Posada de los cerveceros</h3>
                       <p>Si eres cervecero y te la quieres pasar bien, visitanos el 27 de noviembre y disfruta nuestra posada</p>
                     </div>
                   </div>
                 </li>
                 <div className='clear'></div>
               </ul>
             </div>
           </section>
         </div>
      )
    }
}
export default ContentTerraza;
