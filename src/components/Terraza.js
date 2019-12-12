import React, {Component} from 'react';

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
         <div className="seccion1">
           <ul className="col2">
            <li>
            </li>
            <li>
            </li>
           </ul>
         </div>
       </div>
    )
  }
}
export default Terraza;
