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

componentDidMount(){
  window.addEventListener('load',
    function () {
      let numLeaves = 30;
      let numSnow = 0;
      let curLeaves = 10;
      let curSnow = 0;

      let didScroll = false;

      function scrolled() {
          didScroll = true;
          window.removeEventListener("scroll", scrolled);
      }

      window.addEventListener("scroll", scrolled);

      let wait = 800;

      setInterval(function() {
          if(didScroll) {
              didScroll = false;
              let cur = (document.documentElement.scrollTop || document.body.scrollTop);
              let loc = cur / ((document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight) * 100;
              if (loc < 25) {
                  numLeaves = 60;
                  numSnow = 0;
                  wait = 800;
              } else if (loc < 50) {
                  numLeaves = 100;
                  numSnow = 20;
                  wait = 500;
              } else if (loc < 75) {
                  numLeaves = 20;
                  numSnow = 110;
                  wait = 300;
              } else {
                  numLeaves = 35;
                  numSnow = 25;
                  wait = 1000;
              }
              window.addEventListener("scroll", scrolled);
          }
      }, 750);

      /*
                      PROCEDURE TO CONTROL BACKGROUND ANIMATIONS
                       */

      let height = document.documentElement.clientHeight;

      let width = Math.max(
          document.documentElement.clientWidth,
          document.body.scrollWidth,
          document.documentElement.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.offsetWidth
      );

      window.addEventListener("resize", function () {
          height = document.documentElement.clientHeight;


          width = Math.max(
              document.documentElement.clientWidth,
              document.body.scrollWidth,
              document.documentElement.scrollWidth,
              document.body.offsetWidth,
              document.documentElement.offsetWidth
          );
      });

      let dir = [];
      let speed = [];
      let grav = [];
      let wind = [];
      let rot = [];
      let delta = [];

      function createChild(parent, childName) {
          let bound = parent.getBoundingClientRect();
          let startX = ((Math.random() * (bound.right - bound.left)) + bound.left) + "px";
          let startY = ((Math.random() * (bound.bottom - bound.top)) + bound.top) + "px";

          let newChild = document.createElement("div");

          newChild.style.top = startY;
          newChild.style.left = startX;
          newChild.style.transform = randomRotate();
          let z = newChild.style.transform.split(" ")[2].replace("rotateZ(", "").replace("deg)", "");
          grav.push(Math.random() / 6 + 0.3);
          speed.push(Math.random() / 6 + 1);
          if (childName === "leaf") {
              wind.push(Math.random() / 4 + 0.5);
              newChild.className = childName + Math.floor(Math.random() * 2);
              let random = Math.random() * 15;
              newChild.style.width = (60 - random) + "px";
              newChild.style.height = (60 - random) + "px";
          } else {
              wind.push(0.2);
              newChild.className = childName + Math.floor(Math.random());
              let random = Math.random() * 5;
              newChild.style.width = (10 - random) + "px";
              newChild.style.height = (10 - random) + "px";
          }
          rot.push(Math.random() / 4 + 0.4);
          delta.push(Math.random() * 40 - 20);
          if (z < 90) {
              dir.push(-1);
          } else {
              dir.push(1);
          }

          document.getElementsByClassName("container")[0].appendChild(newChild);
          fadeIn(newChild,300);
      }

      function fadeIn(el, time) {
        el.style.opacity = 0;

        var last = +new Date();
        var tick = function() {
          el.style.opacity = +el.style.opacity + (new Date() - last) / time;
          last = +new Date();

          if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
          }
        };

        tick();
      }

      function randomRotate() {
          let x = Math.random() * 10;
          let y = Math.random() * 30 - 15;
          let z = Math.random() * 180;
          return "rotateX(" + x + "deg) rotateY(" + y + "deg) rotateZ(" + z + "deg)";
      }

      //Animates the children of a given parent to fall
      function animate(parent) {

          if (curLeaves < numLeaves) {
              let bound = (numLeaves - curLeaves);
              for (let i = 0; i < bound; i++) {
                  setTimeout(function () {
                      createChild(document.getElementsByClassName("tree")[0], "leaf");
                  }, (wait * i));
                  curLeaves++;
              }
          }

          if (curSnow < numSnow) {
              let bound = (numSnow - curSnow);
              for (let i = 0; i < bound; i++) {
                  setTimeout(function () {
                      createChild(document.getElementsByClassName("sky")[0], "snowflake");
                  }, ((wait + 100) * i));
                  curSnow++;
              }
          }

          for (let i = 0; i < parent.children.length; i++) {
              let child = parent.children[i];
              let z = child.style.transform.split(" ")[2].replace("rotateZ(", "").replace("deg)", "");
              let dx = speed[i];
              let dy = Math.random() * 2 * Math.abs(Math.cos(z * Math.PI / 180));
              if (child.className.indexOf("leaf") >= 0) {
                  child.style.top = (child.style.top.replace("px", "") - (0.2 * Math.sin(z / 180 * Math.PI)) + grav[i] + "px");
              } else {
                  child.style.top = (child.style.top.replace("px", "") - 0 + grav[i] + "px");
              }
              child.style.left = (child.style.left.replace("px", "") - 0 - (0.1 * Math.sin(z / 180 * Math.PI)) + (dir[i] * speed[i] * 1.5) + wind[i]) + "px";

              if ((child.style.top.replace("px", "") - 0 + dy) > height || (child.style.left.replace("px", "") - 0 + dx) > width || (child.style.left.replace("px", "") - 0 + dx) < -100) {
                  parent.removeChild(child);
                  dir.splice(i, 1);
                  speed.splice(i, 1);
                  wind.splice(i, 1);
                  grav.splice(i, 1);
                  rot.splice(i, 1);
                  delta.splice(i, 1);
                  if (child.className.indexOf("leaf") >= 0) {
                      curLeaves--;
                  } else {
                      curSnow--;
                  }
                  i--;
              } else {
                  if (z >= 92 && dir[i] === -1) {
                      if (speed[i] > 0) {
                          speed[i] -= speed[i] / 50;
                      }
                  } else if (z >= 100 && dir[i] === 1) {
                      if (speed[i] < 1.1) {
                          speed[i] += 0.02;
                      }
                  } else if (z <= 80 && dir[i] === -1) {
                      if (speed[i] < 1.1) {
                          speed[i] += 0.03;
                      }
                  } else if (z <= 88 && dir[i] === 1) {
                      if (speed[i] > 0) {
                          speed[i] -= speed[i] / 50;
                      }
                  }

                  if (z <= 92 && z >= 88) {
                      speed[i] = 1 + (Math.random() / 4);
                  }

                  if ((z <= 140 && dir[i] === -1 && speed[i] > 0.22) || (z >= 20 && dir[i] === 1 && speed[i] > 0.22)) {
                      z = z - (dir[i] * rot[i]);
                  }

                  if (z >= 110 && speed[i] <= 0.2 && dir[i] === -1) {
                      dir[i] = 1;
                  } else if (z < 70 && speed[i] <= 0.2 && dir[i] === 1) {
                      dir[i] = -1;
                  }

                  let x = child.style.transform.split(" ")[0].replace("rotateX(", "").replace("deg)", "");
                  if (x > 0 + delta[i] && dir[i] === -1) {
                      x = x - Math.random() / 2;
                  } else if (x < 40 + delta[i] && dir[i] === 1) {
                      x = x - 0 + Math.random() / 2;
                  }

                  let y = child.style.transform.split(" ")[1].replace("rotateY(", "").replace("deg)", "");
                  if (y > 0 + delta[i] && dir[i] === -1) {
                      y = y - Math.random() / 2;
                  } else if (y < 40 + delta[i] && dir[i] === 1) {
                      y = y - 0 + Math.random() / 2;
                  }

                  child.style.transform = "rotateX(" + x + "deg) rotateY(" + y + "deg) rotateZ(" + z + "deg)";
              }
          }
      }

      setInterval(function () {
          animate(document.getElementsByClassName("container")[0]);
      }, 10);

      /*
      END OF PROCEDURE
       */
                

    }, false);
}

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
              <ul className="col2 segunda_lista">
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
                <li>
                  <div className="TerrazaImg03">
                    <img  src="/imgs/TerrazaNueva03.png"  />
                  </div>
                
                  <div className="LogoContainer">
                    <LogoSVG/>
                  </div>
                </li>
                <div className="clear"></div>
              </ul>
              <div class="container"></div>
              <div class="tree"></div>
              <div class="sky"></div>
            </div>
          </section>
       </div>
    )
  }
}
export default Terraza;
