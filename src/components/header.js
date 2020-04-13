import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';

import '../styles/Header.css';
import '../styles/General.css';

class Menu extends Component{
  constructor(){
    super();
    this.state={
      black:false,
      openMenuMobil:false,
    }
  }
  componentDidMount(){
    this.setState({black:this.props.black})
    var self =this;
    var width = window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
    if (width <= 839) {
      this.setState({black:true})
    }
      $(document).scroll(function() {
        var scrollTop = $(window).scrollTop()
        if (!self.state.black) {
          if (scrollTop >= 20 ) {
              $('#Menu').addClass("topBlack");
          }
          else{
            var width = window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
            if (width >= 839) {
              $('#Menu').removeClass("topBlack");

            }
          }
        }
      });

  }
  render() {

   return (
     <div id='Menu' className={this.state.black?'Menu topBlack':'Menu'}>
       <div className='contentMenu'>
         <div className='menu_mobil' onClick={()=>this.setState({openMenuMobil:!this.state.openMenuMobil})}>
           <div className='dash'></div>
           <div className='dash'></div>
           <div className='dash'></div>
         </div>
         <ul className={this.state.openMenuMobil?'col1 lista_mobil activa':'col1 lista_mobil'}>
           <li>
             <Link className="menu" to={`/`}>Inicio</Link>
           </li>
           <li>
              <Link className="menu"to={`/variedades`}>Nuestras cervezas</Link>
           </li>
           <li>
             <Link className="menu" to={`/tienda`}>Tienda</Link>
           </li>
           <div className='clear'></div>
         </ul>
         <ul className="col5 lista_pc">
           <li className='Not_mobil'>
             <img className='logo'  src="/imgs/sprites-uno.png"  />
           </li>
           <li className='Not_mobil'>
             <Link className="menu" to={`/`}>Inicio</Link>
           </li>
           <li className='Not_mobil'>
              <Link className="menu"to={`/variedades`}>Nuestras cervezas</Link>
           </li>
           <li className='Not_mobil'>
             <Link className="menu" to={`/tienda`}>Tienda</Link>
           </li>
           <li>
           <div className='carrito'>
             <div className="BadgeCarrito">
               <p>9</p>
             </div>
               <div  className="MenuCar" >
               <span>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15">
                   <path d="M3 0c.7.2 1 .8 1.2 1.5l.6 2.1c.1.3.2.3.4.3h9.6c.7 0 .9.2.6.9l-2.1 6.3c-.2.5-.2.6-.8.6h-6c-.6 0-.7-.1-.8-.6C4.8 8 4 4.8 3.1 1.7c-.2-.6-.2-.6-.8-.6H.8c-.3 0-.5 0-.6-.3C.1.5.2.3.5.1 1.3 0 2.1 0 3 0zm2.1 4.8V5c.5 1.8 1 3.6 1.4 5.4.1.2.2.3.4.3h5.2c.2 0 .3-.1.4-.3.6-1.7 1.2-3.5 1.7-5.2 0-.1 0-.2.1-.3-3.1-.1-6.1-.1-9.2-.1z" style={{color: '#ececec'}}></path>
                   <circle cx="7.1" cy="13.8" r="1.2" style={{color: '#ececec'}}></circle>
                   <circle cx="11.5" cy="13.8" r="1.2" style={{color: '#ececec'}}></circle>
                 </svg>
               </span>
               </div>
             </div>
           </li>
         <div className="clear"></div>
         </ul>
       </div>
     </div>
   );
 }
}



export default Menu;
