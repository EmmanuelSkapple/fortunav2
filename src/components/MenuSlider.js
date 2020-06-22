import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import {Icon} from 'semantic-ui-react'

import '../styles/Header.css';
import '../styles/General.css';

class MenuSlider extends Component{
  constructor(){
    super();
    this.state={}
  }
  componentDidMount(){

    if(!this.props.black){
      $(document).scroll(function() {
        var scrollTop = $(window).scrollTop();
          if (scrollTop >= 20 ) {
              $('#MenuSlider').addClass("hidden");
          }
          else{
              $('#MenuSlider').removeClass("hidden");
          }
      });
    }


  }
  render() {
   return (
     <div id='MenuSlider' className='MenuSlider Menu'>
       <div className='contentMenu'>
         <ul className="col5">

           <li>
             <Link className="menu" to={`/`}>Inicio</Link>
           </li>
           <li>
              <Link className="menu"to={`/variedades`}>Nuestras cervezas</Link>
           </li>
           <li>
             <Link className="menu" to={`/tienda`}>Tienda</Link>
           </li>
           <li>
             <Link className="menu" to={`/user`}><Icon name='user outline'></Icon></Link>

           </li>
         <div className="clear"></div>
         </ul>
       </div>
     </div>
   );
 }
}



export default MenuSlider;
