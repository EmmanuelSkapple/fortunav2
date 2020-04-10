import React, {Component} from 'react';
import LogoSVG from './logoSvg.js';
import BarraSVG from './BarraSvg.js';
import Mapa from './Mapa.js';
import InstagramEmbed from 'react-instagram-embed';
import {Link} from 'react-router-dom'

import '../styles/Terraza.css';
import '../styles/General.css';

class Terraza extends Component {

  constructor(){
    super();
    this.state={
      galeriaImg:'03',
      index:0,
    }
  }

componentDidMount(){
  // document.addEventListener('scroll', animate);
  //
  // var elementRojo = document.getElementsByClassName('TerrazaImg03');
  // var elementHeight = elementRojo[0].clientHeight;
  // document.addEventListener('scroll', animate);
  //
  // // check if element is in view
  // function inView() {
  //   // get window height
  //   var windowHeight = window.innerHeight;
  //   // get number of pixels that the document is scrolled
  //   var scrollY = window.scrollY || window.pageYOffset;
  //
  //   // get current scroll position (distance from the top of the page to the bottom of the current viewport)
  //   var scrollPosition = scrollY + windowHeight;
  //   // get element position (distance from the top of the page to the bottom of the element)
  //   var elementPosition = elementRojo[0].getBoundingClientRect().top + scrollY + elementHeight +550;
  //
  //   // is scroll position greater than element position? (is element in view?)
  //   if (scrollPosition > elementPosition) {
  //     return true;
  //   }
  //   return false;
  // }
  //
  // // animate element when it is in view
  // function animate() {
  //   // is element in view?
  //   console.log('entrando');
  //
  //   if (inView()) {
  //       // element is in view, add class to element
  //        elementRojo[0].classList.add('active');
  //        console.log(elementRojo[0].classList);
  //
  //   }else {
  //      elementRojo[0].classList.remove('active');
  //      console.log(elementRojo[0].classList);
  //
  //   }
  //
  // }
}
// changeImage=()=>{
//   let GaleriaTerraza = ['03','02'];
//   let imgGaleria='';
//   let nuevoIndex = 0;
//   if (GaleriaTerraza.length-1 == this.state.index) {
//     nuevoIndex = 0;
//     imgGaleria =  GaleriaTerraza[nuevoIndex];
//
//   }else{
//     imgGaleria = GaleriaTerraza[this.state.index+1];
//     nuevoIndex = this.state.index+1;
//   }
//   console.log(imgGaleria);
//   console.log(nuevoIndex);
//
//   this.setState({
//     galeriaImg:imgGaleria,
//     index:nuevoIndex,
//   })
// }


render (){
  console.log("/imgs/TerrazaNueva"+this.state.galeriaImg+".png");
     return (
       <div className="Terraza">
         <section className="seccion1">
          <div className="BarraContenedor">
            <BarraSVG/>
          </div>
            <ul className="col2 primer_lista">
              <li>
                <div className="ContainerLeft">
                  <a onClick={()=>this.setState({reserva:!this.state.reserva})} className={!this.state.reserva?"btn btnReserva":"btn btnReserva LLama"}>{!this.state.reserva?<p>Reserva</p>:<p>Llama al : 3336277134</p>} <i class="fas fa-caret-right"></i></a>
                </div>
              </li>
              <li>

                <div className="TerrazaImg01">
                  <div className="ContainetTitle">
                    <p>Terr<span class="whiteText">aza</span> </p>
                    <p>Fo<span class="whiteText">rtuna</span></p>
                  </div>
                  <img  src="/imgs/TerrazaNueva01.png"  />
                  <a className="btnMasInfo">
                    <Link to='/Terraza'>
                      Mas informacion
                    </Link>
                  </a>
                </div>

              </li>
              <div className="clear"></div>
             </ul>
         </section>
         <section className="seccion2">
          <div className="bgContentBeer">
            <img className="bgBeer"  src="/imgs/BeerGardenWebHD.png"  />
            <div className='tituloBeer'>
              <p>Relajate</p>
              <span>en nuestro</span>
              <p className='titleGreen'>BeerGarden</p>
              <div className='descriptionBeer'>
                <p>
                  Encuentra una experiencia única, espacios verdes y aire fresco sin dejar de disfrutar cada una de nuestras cervezas, todo esto rodeado por el bosque de la primavera.
                </p>
              </div>
            </div>
          </div>
         </section>
         <section className='seccion3'>
           <div className='tanque Left'><img className="iconIngrediente"  src="/imgs/tanqueLeft.png"  /></div>
            <div className='tanque Right'><img className="iconIngrediente"  src="/imgs/tanqueRigth.png"  /></div>
            <div className='contenedor'>
              <ul className='col3'>
                <li>
                    <div className='contentLetf'>
                        <div className='contentIngediente'>
                          <img className="iconIngrediente"  src="/imgs/agua.png"  />

                          <div className='contentTitulo'>
                            <img className="vineta"  src="/imgs/vinetaLeft.png"  />
                            <h3>Agua</h3>
                            <img className="vineta"  src="/imgs/vinetaRigth.png"  />
                          </div>
                          <p>Responsable del alto poder hidratante en nuestra cerveza.</p>
                        </div>

                        <div className='contentIngediente down'>
                          <img className="iconIngrediente lupulo"  src="/imgs/lupulo.png"  />
                          <div className='contentTitulo '>
                            <img className="vineta"  src="/imgs/vinetaLeft.png"  />
                            <h3>Lupulo</h3>
                            <img className="vineta"  src="/imgs/vinetaRigth.png"  />
                          </div>
                          <p>si de amargor, aroma y sabor se habla, este ingrediente es el jefe.</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className='contentBotella'>
                      <img className="Botella"  src="/imgs/ipaBottle.png"  />

                    </div>
                </li>
                <li>
                  <div className='contentRigth'>
                    <div className='contentIngediente'>
                      <img className="iconIngrediente"  src="/imgs/malta.png"  />
                      <div className='contentTitulo'>
                        <img className="vineta"  src="/imgs/vinetaLeft.png"  />
                        <h3>Malta</h3>
                        <img className="vineta"  src="/imgs/vinetaRigth.png"  />
                      </div>
                      <p> Elemento decisivo en su color, en sus aromas y cuerpo.</p>
                    </div>
                    <div className='contentIngediente down levadura'>
                      <img className="iconIngrediente"  src="/imgs/levadura.png"  />
                      <div className='contentTitulo'>
                        <img className="vineta"  src="/imgs/vinetaLeft.png"  />
                        <h3>Levadura</h3>
                        <img className="vineta"  src="/imgs/vinetaRigth.png"  />
                      </div>
                      <p>Encargada de toda la magia para crear una cerveza perfecta</p>
                    </div>
                  </div>
                </li>
                <div className='clear'></div>
              </ul>
              <div className='verVariedades'>Ver variedades</div>
            </div>
         </section>
         <section className='seccion4'>
           <img className='diagonalFortuna' src="/imgs/diagonalFortuna.png"  />

           <div className='contenedor'>
             <ul className='col2'>
               <li>
                 <div className='contentProceso Up'>
                   <div className='imgMiddle'>
                     <img src="/imgs/fotoProcesoMiddle1.png"  />
                     <img src="/imgs/fotoProcesoMiddle2.png"  />
                   </div>
                   <div className='imgLarge'>
                     <img src="/imgs/fotoProcesoLarge1.png"  />
                   </div>
                 </div>
                 <div className='contentProceso Down'>
                   <img src="/imgs/fotoProcesoLarge2.png"  />
                 </div>
                 <div className='lineDown'>
                   <img src="/imgs/lineaDecora.png"  />
                 </div>
               </li>
               <li>
                 <p>Descubre</p>
                 <span>nuestro</span>
                 <p className='goldText'>Proceso</p>

                 <div className='contentTours'>
                   <h3 className='goldText'>Tours guiados</h3>
                   {!this.state.reservaTour?
                     <p>Disfruta de una experiencia completa, dentro de nuestra planta conocerás todo el proceso que se lleva acabo para poder crear la cerveza artesanal.</p>
                     :
                     <div>
                       <div style={{pointerEvents: 'none',margin:'5px'}}>LLama al : 33 3627 7134</div>
                       <div style={{pointerEvents: 'none',margin:'5px'}}>Cel : 33 13 52 58 72</div>
                       <div style={{pointerEvents: 'none',margin:'5px'}}>Email : arodriguez@cervezafortuna.com</div>
                     </div>
                   }
                   <div  onClick={()=>this.setState({reservaTour:!this.state.reservaTour})} className='ReservarTour'>{this.state.reservaTour?'Reserva':'Regresar'}</div>
                 </div>
               </li>
               <div className='clear'></div>
             </ul>
           </div>
         </section>
         <section className='seccion5'>
           <div className='Tequilaline Up'>
             <img  draggable="false" src="/imgs/rutaTequilaLineaUp.png"  />
           </div>
           <div draggable="false" className='TequilaBG'>
               <div className={this.state.VerMapa?'mapa activo':'mapa hidden'}>
                 <Mapa id='mapaFortuna'/>
               </div>
               <img className={!this.state.VerMapa?'imgRuta activo':'imgRuta hidden'} src="/imgs/rutaTequilaBG.png"  />

           </div>
           <div className='titleTequila'>
             {!this.state.VerMapa?
               <div>
                 <h1>Ruta del Tequila</h1>
                 <p>Cerveza Fortuna es la unica y primera cervecería afiliada a la Ruta del Tequila.</p>
                 <p className='verMapa' onClick={()=>this.setState({VerMapa:!this.state.VerMapa})}>Ver mapa</p>
               </div>:
               <div>
                 <p className='verMapaRegresar' onClick={()=>this.setState({VerMapa:!this.state.VerMapa})}>Regresar</p>
               </div>
             }

           </div>
           <div className='Tequilaline Down'>
             <img  draggable="false" src="/imgs/rutaTequilaLineaDown.png"  />
           </div>
         </section>
         <section className='seccion6'>
           <div className='contendor'>
             <div className='contendorInstagram'>
               <ul className='col3'>
                 <li>
                   <InstagramEmbed
                      id='InstagramCard'
                      url='https://instagr.am/p/B-AKXUdFUvI/'
                      maxWidth={320}
                      hideCaption={false}
                      containerTagName='div'
                      injectScript
                      protocol=''
                      onLoading={() => {}}
                      onSuccess={() => {}}
                      onAfterRender={() => {}}
                      onFailure={() => {}}
                    />
                 </li>
                 <li>
                   <InstagramEmbed
                     id='InstagramCard'
                      url='https://instagr.am/p/B9rpivlnXW2/'
                      maxWidth={320}
                      hideCaption={false}
                      containerTagName='div'
                      injectScript
                      protocol=''
                      onLoading={() => {}}
                      onSuccess={() => {}}
                      onAfterRender={() => {}}
                      onFailure={() => {}}
                    />
                 </li>
                 <li>
                   <InstagramEmbed
                     id='InstagramCard'
                      url='https://instagr.am/p/B89ZBgYn-Mg/'
                      maxWidth={320}
                      hideCaption={false}
                      containerTagName='div'
                      injectScript
                      protocol=''
                      onLoading={() => {}}
                      onSuccess={() => {}}
                      onAfterRender={() => {}}
                      onFailure={() => {}}
                    />
                 </li>

                 <div className='clear'></div>
               </ul>
             </div>

           </div>
         </section>

       </div>
    )
  }
}
export default Terraza;
