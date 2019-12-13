import React, {Component} from 'react';
import LogoSVG from './logoSvg.js';
import BarraSVG from './BarraSvg.js';

import '../styles/Terraza.css';
import '../styles/General.css';

class Terraza extends Component {

// componentDidMount(){
//   var elementBotella = document.getElementsByClassName('explosion');
//   var elementHeight = elementBotella[0].clientHeight;
//   document.addEventListener('scroll', animate);
//
//   // check if element is in view
//   function inView() {
//     // get window height
//     var windowHeight = window.innerHeight;
//     // get number of pixels that the document is scrolled
//     var scrollY = window.scrollY || window.pageYOffset;
//
//     // get current scroll position (distance from the top of the page to the bottom of the current viewport)
//     var scrollPosition = scrollY + windowHeight;
//     // get element position (distance from the top of the page to the bottom of the element)
//     var elementPosition = elementBotella[0].getBoundingClientRect().top + scrollY + elementHeight +50;
//
//     // is scroll position greater than element position? (is element in view?)
//     if (scrollPosition > elementPosition) {
//       return true;
//     }
//     return false;
//   }
//
//   // animate element when it is in view
//   function animate() {
//     // is element in view?
//     if (inView()) {
//         // element is in view, add class to element
//          elementBotella[0].classList.add('BotellaActive');
//          console.log(elementBotella[0].classList);
//
//     }else {
//        elementBotella[0].classList.remove('BotellaActive');
//        console.log(elementBotella[0].classList);
//
//     }
//
//   }
// }

render (){
     return (
       <div className="Terraza">
         <section className="seccion1">
          <div className="BarraContenedor">
            <BarraSVG/>
          </div>
          <div className="contenedor">
            <ul className="col2 primer_lista">
              <li>
                <div className="ContainerLeft">
                  <div className="ContainetTitle">
                    <h1>Terr<span class="whiteText">aza</span> </h1>
                    <h1>Fo<span class="whiteText">rtuna</span></h1>
                  </div>

                  <a><div className="btnReserva"><p>Reserva</p> <i class="fas fa-caret-right"></i></div></a>
                </div>
                
              </li>
              <li>
                <div className="TerrazaImg01">
                <img  src="/imgs/TerrazaNueva01.png"  />
                </div>
              </li>
              <div className="clear"></div>
             </ul>
            
             <div className="LogoContainer">
                <LogoSVG/>
              </div>
          </div>
         </section>
         <section className="seccion2">
           <div className="BarraContenedor">
              <ul className="col2 segunda_lista">
                <li>
                  <div className="TerrazaImg02">
                    <img  src="/imgs/TerrazaNueva02.png"  />
                  </div>
                  
                </li>
                <li>
                  <div className="TerrazaImg03">
                  <img  src="/imgs/TerrazaNueva03.png"  />
                  </div>
                </li>
                <div className="clear"></div>
              </ul>
            </div>
          </section>
       </div>
    )
  }
}
export default Terraza;
