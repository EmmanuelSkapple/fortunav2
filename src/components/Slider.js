import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../styles/Slider.css';
import '../styles/General.css';
import Spritesheet from 'react-responsive-spritesheet';
import MenuSlider from './MenuSlider.js';
import YouTube from 'react-youtube';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-163516545-1');
ReactGA.pageview(window.location.pathname + window.location.search);



class Slider extends Component {
  constructor(){
    super();
    this.state={
      galeriaImg:'03',
      index:0,
      mayorEdad: localStorage.getItem('mayorEdad'),
    }

  }
  render(){
    console.log(localStorage.getItem('mayorEdad'));
    return (
      <div className="Slider">

        <div className={this.state.mayorEdad?'MayorEdadDimmer':'MayorEdadDimmer activo'}>
          <div className='imgContentEdad'>
          </div>

          <div className='contentIzquierdoEdad'>
            <h1>¿Tienes <span class="whiteText">más de 18 <span class="blackText">a</span>ños?</span></h1>
            <div className='btnEdad'>
              <div className='btnSi' onClick={()=>{this.setState({mayorEdad:true});localStorage.setItem('mayorEdad',true)}}>Si</div>
              <div className='btnNo' onClick={()=>window.location.replace("http://google.com")}>No</div>

            </div>
          </div>
        </div>
        <section className="seccion1">
            <div className="filterBlack">

            <video poster="/imgs/FortunaPosterCorto.jpg" id="videoBG" autoPlay loop muted>
              <source src="https://storage.cloud.google.com/fortuna/fortuna-web.mp4" type="video/webm; "/>
            </video>
               <Spritesheet
                 className={`logo-animado`}
                 image={`/imgs/sprites.png`}
                 widthFrame={482}
                 heightFrame={450}
                 steps={30}
                 fps={25}
                 autoplay={true}
                 loop={false}
               />

               <div className="MouseScroll"></div>
                 <svg id='MouseScroll' width="40px" height="100%" viewBox="0 0 247 390" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{fillRule:'evenodd',clipRule:'evenodd',strokeLinecap:'round',strokeLinejoin:'round',strokeMiterlimit:'1.5'}}>
                  <path id="wheel" d="M123.359,79.775l0,72.843" style={{fill:'none',stroke:'#ececec',strokeWidth:'20px',}}/>
                  <path id="mouse" d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z" style={{fill:'none',stroke:'#ececec',strokeWidth:'20px',}}/>
                </svg>
              </div>
              <div className="redesSociales">
                  <ul>
                    <li className="LineUp">
                        <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="140 20 937.3 2441.9" >
                        <style>{`.st0{fill:#8B191D;}`}</style>
                        <polygon id="XMLID_1_" class="st0" points="615.4,7.6 657,920.8 614.9,1840.0 578,920.8 "/>
                        </svg>

                    </li>
                    <li>
                      <a href='https://www.facebook.com/Cervezafortuna.mx'>
                        <svg style={{cursor:'pointer'}} id="FacebookIcon"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 414.67 414.68">
                          <defs>
                            <style>{`.cls-1{fill:#ececec;}.cls-2{fill:#ececec;}`}</style>
                          </defs>
                          <path  id="circle" class="cls-1" d="M463.51,257.21c0,114.8-93.24,207.39-208.59,207.22-113.23-.17-206.12-93.3-206.07-206.61,0-115.14,92.39-207.88,207.21-208.07C370.27,49.56,463.55,142.84,463.51,257.21Zm-20.85.38c.08-102.74-83.35-186.1-186.55-186.4C153.28,70.89,70,154.06,69.57,257.4c-.39,102.78,83.66,186.92,186.64,186.85C358.92,444.17,442.58,360.41,442.66,257.59Z" transform="translate(-48.85 -49.75)"/><path class="cls-2" d="M272.77,261V282c0,20.66-.08,41.33.07,62,0,4.6-1.29,6.67-6.26,6.54-10.66-.28-21.33-.26-32,0-4.67.12-6.06-1.65-6-6.14.14-25.83.07-51.67.07-77.5V261c-4.48,0-8.45-.07-12.41,0-3.65.07-5.54-1.2-5.47-5.24.18-9.33.16-18.66,0-28-.06-3.89,1.54-5.47,5.35-5.34,4,.13,7.94,0,12.36,0,0-5.69,0-11,0-16.25.25-26.48,15.76-41.81,42.2-41.72,8.17,0,16.33.12,24.5,0,3.79,0,5.48,1.55,5.45,5.37q-.13,13.5,0,27c.06,4.14-1.84,5.59-5.83,5.45-5.49-.2-11,.05-16.49-.09-3.74-.09-5.63,1.34-5.55,5.23.09,4.8,0,9.6,0,14.89,7.74,0,15.19.16,22.63-.06,4.5-.13,6,1.75,5.46,6-1.09,9.42-2.06,18.87-3,28.32-.34,3.51-2.44,4.34-5.48,4.31C286.09,261,279.76,261,272.77,261Z" transform="translate(-48.85 -49.75)"/>
                        </svg>
                      </a>

                    </li>
                    <li>
                      <a href='https://www.instagram.com/cervezafortuna/'>

                        <svg style={{cursor:'pointer'}} id="InstagramIcon"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 414.67 414.68">
                        <defs>
                          <style>{`.cls-1{fill:#ececec;}`}</style>
                        </defs>
                          <path class="cls-1" d="M1087,257.65c0,114.8-93.24,207.39-208.6,207.22-113.22-.17-206.11-93.3-206.07-206.61,0-115.14,92.4-207.88,207.21-208.07C993.72,50,1087,143.27,1087,257.65Zm-20.85.38c.07-102.74-83.35-186.1-186.55-186.4C776.72,71.33,693.4,154.5,693,257.84c-.39,102.78,83.66,186.92,186.65,186.85C982.37,444.61,1066,360.85,1066.11,258Z" transform="translate(-672.29 -50.19)"/>
                          <path class="cls-1" d="M780.15,340.33V175.45a15.08,15.08,0,0,0,.68-1.8A27,27,0,0,1,807,152.9q78.21,0,156.4,0a26.72,26.72,0,0,1,26.73,26.72q.07,78.3,0,156.61A27,27,0,0,1,969,362.31c-.74.16-1.48.38-2.22.58H802.7a5.68,5.68,0,0,0-1-.47q-16.82-4.28-21.08-21.08A6.12,6.12,0,0,0,780.15,340.33ZM948,241.89c.21.77.39,1.41.56,2.07a60.32,60.32,0,0,1-3,40.25c-17.82,40.82-72.09,51.9-105,21.49-14.77-13.63-21.7-30.46-20.25-50.56.33-4.44,1.33-8.83,2-13.28H803.52v2.06q0,42.75,0,85.49c0,6.13,3.19,9.28,9.38,9.28H957c6.09,0,9.33-3.26,9.33-9.38V241.89Zm-62.65,56.74c3.31-.45,6.68-.65,9.91-1.4,25-5.77,40.59-32.82,27.81-58.17-8.31-16.47-26.16-24.71-45.34-21.85-18,2.68-40.07,21.36-33.39,50C848.55,285.36,866,298.4,885.35,298.63Zm59.54-80.94c4,0,8.07.05,12.1,0a9.21,9.21,0,0,0,9.35-9.37q.09-11.28,0-22.56a9.3,9.3,0,0,0-9.48-9.47q-11.8-.06-23.59,0a9.34,9.34,0,0,0-9.56,9.61q-.06,11.07,0,22.15c0,5.71,4,9.61,9.7,9.65C937.24,217.72,941.06,217.7,944.89,217.69Z" transform="translate(-672.29 -50.19)"/>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href='https://twitter.com/fortunacerveza'>

                        <svg style={{cursor:'pointer'}} id="TwitterIcon"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 414.67 414.68">
                        <defs>
                          <style>{`.cls-1{fill:#ececec;}.cls-3{fill:#ececec;}`}</style>
                        </defs>
                        <title>TwitterIcon</title>
                        <path class="cls-1" d="M1701,257.65c0,114.8-93.24,207.39-208.6,207.22-113.22-.17-206.11-93.3-206.07-206.61,0-115.14,92.4-207.88,207.21-208.07C1607.72,50,1701,143.27,1701,257.65Zm-20.85.38c.07-102.74-83.35-186.1-186.55-186.4-102.84-.3-186.16,82.87-186.55,186.21-.39,102.78,83.66,186.92,186.65,186.85C1596.37,444.61,1680,360.85,1680.11,258Z" transform="translate(-1286.29 -50.19)"/><g id="rGnhkc.tif">
                        <path class="cls-3" d="M1458,309.37c-22.5-2.55-39.78-15.57-43.66-32.75a48.7,48.7,0,0,0,20-.77c-3.75-1.51-7.85-2.75-11.53-4.77a47.53,47.53,0,0,1-18.45-17.47,48.74,48.74,0,0,1-5.05-11.64c-1.18-4.09-1.44-8.43-1.81-12.8a53,53,0,0,0,21.25,5.47c-10.36-7.44-17-16.85-19.61-28.76a46.73,46.73,0,0,1,5.14-34q38.25,45,96.79,49.21c-.19-4.75-.8-9.31-.48-13.8,1.26-17.57,9.82-30.78,25.39-38.82,18.68-9.66,39.34-6.25,54.64,8.29a3,3,0,0,0,3.14.84,96.23,96.23,0,0,0,25.67-9.68c.6-.34,1.25-.6,2.07-1-1.92,8.69-9.64,18.59-19.84,25.5,9.08-.84,17.33-3.47,25.45-6.63l.39.5a60.16,60.16,0,0,1-5,6.56c-5.33,5.33-10.89,10.43-16.29,15.7a4.26,4.26,0,0,0-1.32,2.74q.78,53-33.41,93.49c-18.13,21.47-41.14,35.25-68.53,41.6a139.21,139.21,0,0,1-50.16,2.37,132.81,132.81,0,0,1-53.28-19.25,5.56,5.56,0,0,1-.67-.6C1414.45,331.27,1437.33,325,1458,309.37Z" transform="translate(-1286.29 -50.19)"/></g>
                        </svg>
                      </a>
                    </li>
                    <li className="LineUp">
                       <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="140 20 937.3 2441.9" >
                        <style>{`.st0{fill:#8B191D;}`}</style>
                        <polygon id="XMLID_1_" class="st0" points="615.4,7.6 657,920.8 614.9,1840.0 578,920.8 "/>
                        </svg>
                    </li>
                  </ul>
              </div>
            </section>
      </div>


    );
  }
}

export default Slider;
