import React, {Component} from 'react';
import LogoSVG from './logoSvg.js';
import BarraSVG from './BarraSvg.js';

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
  document.addEventListener('scroll', animate);

  var elementRojo = document.getElementsByClassName('TerrazaImg03');
  var elementHeight = elementRojo[0].clientHeight;
  document.addEventListener('scroll', animate);

  // check if element is in view
  function inView() {
    // get window height
    var windowHeight = window.innerHeight;
    // get number of pixels that the document is scrolled
    var scrollY = window.scrollY || window.pageYOffset;

    // get current scroll position (distance from the top of the page to the bottom of the current viewport)
    var scrollPosition = scrollY + windowHeight;
    // get element position (distance from the top of the page to the bottom of the element)
    var elementPosition = elementRojo[0].getBoundingClientRect().top + scrollY + elementHeight +550;

    // is scroll position greater than element position? (is element in view?)
    if (scrollPosition > elementPosition) {
      return true;
    }
    return false;
  }

  // animate element when it is in view
  function animate() {
    // is element in view?
    console.log('entrando');

    if (inView()) {
        // element is in view, add class to element
         elementRojo[0].classList.add('active');
         console.log(elementRojo[0].classList);

    }else {
       elementRojo[0].classList.remove('active');
       console.log(elementRojo[0].classList);

    }

  }
}
changeImage=()=>{
  let GaleriaTerraza = ['03','02'];
  let imgGaleria='';
  let nuevoIndex = 0;
  if (GaleriaTerraza.length-1 == this.state.index) {
    nuevoIndex = 0;
    imgGaleria =  GaleriaTerraza[nuevoIndex];

  }else{
    imgGaleria = GaleriaTerraza[this.state.index+1];
    nuevoIndex = this.state.index+1;
  }
  console.log(imgGaleria);
  console.log(nuevoIndex);

  this.setState({
    galeriaImg:imgGaleria,
    index:nuevoIndex,
  })
}


render (){
  console.log("/imgs/TerrazaNueva"+this.state.galeriaImg+".png");
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

                  <a><div className="btn btnReserva"><p>Reserva</p> <i class="fas fa-caret-right"></i></div></a>
                </div>

              </li>
              <li>
                <div className="TerrazaImg01">
                <img  src="/imgs/TerrazaNueva01.png"  />
                </div>

              </li>
              <div className="clear"></div>
             </ul>
          </div>
         </section>
         <section className="seccion2">
           <div className="contenedor">
              <ul className="col3 segunda_lista">
                <li>
                  <div onClick={this.changeImage} className="TerrazaImg03">
                    <img  src={"/imgs/TerrazaNueva"+this.state.galeriaImg+".png"}  />
                  </div>
                </li>
                <li>

                  <div className="LogoContainer">
                    <LogoSVG/>
                  </div>
                  <div className='contentOpenHouse'>
                    <div className='textOpenHouse'>
                      <p>Disfruta</p><span>Experiencia Terraza</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="TerrazaImg02">
                    <img  src="/imgs/TerrazaNueva02.png"  />
                  </div>
                  <div className="LineaHorizontal">
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"viewBox="0 0 4000 240" >
                    <style >{`.Terraza .seccion2 .LineaHorizontal .st0{fill:#841B1E;}`}</style>
                      <polygon id="XMLID_3_" class="st0" points="0,30.2 1984.8,0 4000,30.2 1981.8,57 "/>
                    </svg>
                  </div>
                </li>
                <div className="clear"></div>
              </ul>
            </div>
          </section>
          <section className="seccion3">
            <div className="contenedor">

            </div>
          </section>
       </div>
    )
  }
}
export default Terraza;
