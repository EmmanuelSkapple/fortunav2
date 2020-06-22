import React, {Component} from 'react';
import LogoSVG from './logoSvg.js';
import Menu from './header.js';
import Footer from './Footer.js';
import { Parallax, Background } from 'react-parallax';
import { mdiHops,mdiBarley,mdiBottleWine } from '@mdi/js'
import Icon from '@mdi/react'

import '../styles/Variedades.css';
import '../styles/General.css';
import ReactGA from 'react-ga';
ReactGA.pageview(window.location.pathname + window.location.search);


class ContentVariedades extends Component {

  render(){
    return(
      <div>
        <Menu black={true}/>
        <Variedades/>
        <Footer/>
      </div>
    )
  }
}

class Variedades extends Component {

  constructor(){
    super();
    this.state={
      galeriaImg:'03',
      index:0,
    }
  }

  render (){
       return (
          <div className="Variedades">
            <section className='seccion1' vertical>
              <Parallax strength={-200} className={"parallax"}  bgImage={'https://images.pexels.com/photos/208560/pexels-photo-208560.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}>
                <div className='contentCervezas'>

                  <div className='derecha'>
                    <div className='galeria'>
                      <ul className='col1'>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-af1.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-af2.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-af3.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-af4.jpg"  /></div></li>
                        <div className='clear'></div>
                      </ul>
                    </div>
                  </div>

                  <div className="izquierda">
                    <h1>Afortunada</h1>
                    <p className='descripcion-cerveza' >
                      Cerveza de trigo estilo alemán(Hefe Weizen), se caracteriza por su color pálido sin filtrar, aroma dominado por notas frutales
                      principalmente el plátano y toques especiados como clavo. </p>
                      <div className='especificaciones'>
                        <div className='item tres'>
                          <div className='Header'>
                            <Icon path={mdiHops} id="Lupulo" color={'#fff'}/>
                            <p>18 IBUS</p>
                          </div>
                        </div>
                        <div className='item tres'>
                          <div className='Header'>
                            <Icon path={mdiBottleWine} id="Botella" color={'#fff'} />
                            <p>4.8 % vol.</p>
                          </div>
                        </div>
                        <div className='item tres'>
                          <div className='Header'>
                            <Icon path={mdiBarley}   id="Malta"  color={'#fff'} />
                            <p>50 % trigo</p>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div className="botella afortunada"></div>
                </div>
              </Parallax>
              <Parallax strength={-200} className={"parallax"}  bgImage={'https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}>
                <div className='contentCervezas'>
                  <div className='derecha'>
                    <div className='galeria'>
                      <ul className='col1'>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-pa1.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-pa2.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-pa3.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-pa4.jpeg"  /></div></li>
                        <div className='clear'></div>
                      </ul>
                    </div>
                  </div>
                  <div className="izquierda">
                    <h1>Pale Ale</h1>
                    <p className='descripcion-cerveza' >
                    Cerveza Ale de color ambarino con sabor moderado a lúpulo con notas herbales, cítricas y de pino.
                    De cuerpo bajo y sabor refrescante con cáracter. </p>
                    <div className='especificaciones'>
                      <div className='item'>
                        <div className='Header'>
                          <Icon path={mdiHops} id="Lupulo" color={'#fff'} />
                          <p>25 IBUS</p>
                        </div>
                      </div>
                      <div className='item'>
                        <div className='Header'>
                          <Icon path={mdiBottleWine} id="Botella" color={'#fff'}  />
                          <p>5.0 % vol.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="botella pale"></div>
                </div>
              </Parallax>
              <Parallax strength={-200} className={"parallax"}  bgImage={'https://images.pexels.com/photos/3225479/pexels-photo-3225479.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}>
                <div className='contentCervezas'>
                  <div className='derecha'>
                    <div className='galeria'>
                      <ul className='col1'>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-ca1.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-ca2.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-ca3.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-ca4.jpeg"  /></div></li>
                        <div className='clear'></div>
                      </ul>
                    </div>
                  </div>
                  <div className="izquierda">
                    <h1>California Ale</h1>

                    <p className='descripcion-cerveza' >
                      Cerveza clara con intenso color dorado, fresco sabor a malta y lúpulos con notas citricas al olfato.
                      Estilo Blonde Ale americano con balance perfecto en aroma, sabor y cuerpo, logrando la frescura cítrica afrutada que la convierte en una cerveza de fácil paladear. </p>
                    <div className='especificaciones'>
                      <div className='item'>
                        <div className='Header'>
                          <Icon path={mdiHops} id="Lupulo" color={'#fff'} />
                          <p>17 IBUS</p>
                        </div>
                      </div>
                      <div className='item'>
                        <div className='Header'>
                          <Icon path={mdiBottleWine} id="Botella"  color={'#fff'} />
                          <p>4.8 % vol.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="botella california"></div>
                </div>
              </Parallax>
              <Parallax strength={-200} className={"parallax"}  bgImage={'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}>
                <div className='contentCervezas'>
                  <div className='derecha'>
                    <div className='galeria'>
                      <ul className='col1'>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-canita1.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-canita2.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-canita3.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-canita4.jpeg"  /></div></li>
                        <div className='clear'></div>
                      </ul>
                    </div>
                  </div>
                  <div className="izquierda">
                      <h1>Cañita</h1>
                    <p className='descripcion-cerveza' >Cerveza clara de color brillante, ligera y refrescante al paladar</p>
                    <div className='especificaciones'>
                      <div className='item'>
                        <div className='Header'>
                          <Icon path={mdiHops} id="Lupulo" color={'#fff'} />
                          <p>15 IBUS</p>
                        </div>
                      </div>
                      <div className='item'>
                        <div className='Header'>
                          <Icon path={mdiBottleWine} id="Botella"  color={'#fff'} />
                          <p>4.2 % vol.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="botella canita"></div>
                </div>
              </Parallax>
              <Parallax strength={-200} className={"parallax"}  bgImage={'https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'}>
                <div className='contentCervezas'>
                  <div className='derecha'>
                    <div className='galeria'>
                      <ul className='col1'>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-canita3.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-canita1.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-canita4.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-canita2.jpeg"  /></div></li>

                        <div className='clear'></div>
                      </ul>
                    </div>
                  </div>
                  <div className="izquierda">
                    <h1>Cañita Light</h1>
                    <p className='descripcion-cerveza' >
                      Cañita light, el sabor de una buena cerveza con menos calorias </p>
                     <div className='especificaciones'>
                       <div className='item'>
                         <div className='Header'>
                           <Icon path={mdiHops} id="Lupulo" color={'#fff'} />
                           <p>7 IBUS</p>
                         </div>
                       </div>
                       <div className='item'>
                         <div className='Header'>
                           <Icon path={mdiBottleWine} id="Botella"  color={'#fff'} />
                           <p>3.9 % vol.</p>
                         </div>
                       </div>
                     </div>
                  </div>
                  <div className="botella canitaLigth"></div>
                </div>
              </Parallax>
              <Parallax strength={-200} className={"parallax"}  bgImage={'https://images.pexels.com/photos/641038/pexels-photo-641038.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}>
                <div className='contentCervezas'>
                  <div className='derecha'>
                    <div className='galeria'>
                      <ul className='col1'>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-ip1.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-ip2.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-ip3.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-ip4.jpeg"  /></div></li>
                        <div className='clear'></div>
                      </ul>
                    </div>
                  </div>
                  <div className="izquierda">
                    <h1>Ippólita</h1>
                    <p className='descripcion-cerveza' >
                      Nuestra India Pale Ale (IPA) tiene un color cobrizo anaranjado con fuertes notas herbales y frutales y sabor intenso
                      con un perfecto equilibrio entre la malta y su alto contenido de lúpulo que deja realzar un amargor relajador
                      alfinal de su trayectoria
                    </p>
                    <div className='especificaciones'>
                      <div className='item'>
                        <div className='Header'>
                          <Icon path={mdiHops} id="Lupulo" color={'#fff'} />
                          <p>60 IBUS</p>
                        </div>
                      </div>
                      <div className='item'>
                        <div className='Header'>
                          <Icon path={mdiBottleWine} id="Botella" color={'#fff'}  />
                          <p>5.5 % vol.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="botella ipa"></div>
                </div>
              </Parallax>
              <Parallax strength={-200} className={"parallax"}  bgImage={'https://images.pexels.com/photos/1556665/pexels-photo-1556665.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}>
                <div className='contentCervezas'>
                  <div className='derecha'>
                    <div className='galeria'>
                      <ul className='col1'>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-st1.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-st2.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-st3.jpg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-st4.jpg"  /></div></li>
                        <div className='clear'></div>
                      </ul>
                    </div>
                  </div>
                  <div className="izquierda">
                    <h1>Stout</h1>
                    <p className='descripcion-cerveza' >
                      De tradicional estilo inglés y color obscuro, hecha a base de malta tostada con
                      tonos ligeros sabor a chocolate y café
                    </p>
                    <div className='especificaciones'>
                      <div className='item'>
                        <div className='Header'>
                          <Icon path={mdiHops} id="Lupulo" color={'#fff'} />
                          <p>30 IBUS</p>
                        </div>
                      </div>
                      <div className='item'>
                        <div className='Header'>
                          <Icon path={mdiBottleWine} id="Botella" color={'#fff'}  />
                          <p>5.5 % vol.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="botella stout"></div>

                </div>
              </Parallax>
              <Parallax strength={-200} className={"parallax"}  bgImage={'https://images.pexels.com/photos/1438516/pexels-photo-1438516.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}>
                <div className='contentCervezas'>
                  <div className='derecha'>
                    <div className='galeria'>
                      <ul className='col1'>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-sk1.jpg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-sk2.jpg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-sk3.jpg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-sk4.jpg"  /></div></li>
                        <div className='clear'></div>
                      </ul>
                    </div>
                  </div>
                  <div className="izquierda">
                    <h1>Sake Ale</h1>
                    <p className='descripcion-cerveza' >
                      Elaborada con levadura de sake y lúpulo japonés Sorachi Ace. De color dorado intenso y aromas frutales.
                     </p>
                     <div className='especificaciones'>
                       <div className='item'>
                         <div className='Header'>
                           <Icon path={mdiHops} id="Lupulo" color={'#fff'} />
                           <p>40 IBUS</p>
                         </div>
                       </div>
                       <div className='item'>
                         <div className='Header'>
                           <Icon path={mdiBottleWine} id="Botella"  color={'#fff'} />
                           <p>6.8 % vol.</p>
                         </div>
                       </div>
                     </div>
                  </div>
                  <div className="botella sake"></div>
                </div>
              </Parallax>
              <Parallax strength={-200} className={"parallax"}  bgImage={'https://images.pexels.com/photos/325520/pexels-photo-325520.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'}>
                <div className='contentCervezas'>
                  <div className='derecha'>
                    <div className='galeria'>
                      <ul className='col1'>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-sor1.jpg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-sor2.jpg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-sor3.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-sk4.jpg"  /></div></li>
                        <div className='clear'></div>
                      </ul>
                    </div>
                  </div>
                  <div className="izquierda">
                    <h1>Sourindo</h1>
                    <p className='descripcion-cerveza' >
                      Las notas ácidas y refrescantes de nuestra sour con tamarindo la hacen ideal para disfrutarse antes, durante o después de la fiesta. </p>
                     <div className='especificaciones'>
                       <div className='item'>
                         <div className='Header'>
                           <Icon path={mdiHops} id="Lupulo" color={'#fff'} />
                           <p>20 IBUS</p>
                         </div>
                       </div>
                       <div className='item'>
                         <div className='Header'>
                           <Icon path={mdiBottleWine} id="Botella"  color={'#fff'} />
                           <p>4.5 % vol.</p>
                         </div>
                       </div>
                     </div>
                  </div>
                  <div className="botella sour"></div>
                </div>
              </Parallax>
              <Parallax strength={-200} className={"parallax"}  bgImage={'https://images.pexels.com/photos/2388639/pexels-photo-2388639.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'}>
                <div className='contentCervezas'>
                  <div className='derecha'>
                    <div className='galeria'>
                      <ul className='col1'>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-sk1.jpg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-af3.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-ca4.jpeg"  /></div></li>
                        <li><div className='imgGaleria'> <img   src="/imgs/maridaje/maridaje-sk4.jpg"  /></div></li>
                        <div className='clear'></div>
                      </ul>
                    </div>
                  </div>
                  <div className="izquierda">
                    <h1>CantaBeerto</h1>
                    <p className='descripcion-cerveza' >
                      Cerveza refrescante con notas cítricas frutales. Inspirada en el “Cantarito” de la región de tequila Jalisco. Compuesta de jugo de agave, agua, malta, lúpulo, levadura, toronja, naranja, limón y sal de mar. </p>
                     <div className='especificaciones'>
                       <div className='item'>
                         <div className='Header'>
                           <Icon path={mdiHops} id="Lupulo" color={'#fff'} />
                           <p>7 IBUS</p>
                         </div>
                       </div>
                       <div className='item'>
                         <div className='Header'>
                           <Icon path={mdiBottleWine} id="Botella"  color={'#fff'} />
                           <p>4.8 % vol.</p>
                         </div>
                       </div>
                     </div>
                  </div>
                  <div className="botella canta"></div>
                </div>
              </Parallax>


            </section>

          </div>
      )
    }
}
export default ContentVariedades;
