import React, {Component} from 'react';
import Menu from './header.js';
import Slider from './Slider.js';
import Terraza from './Terraza.js';
import Footer from './Footer.js';

import '../styles/Home.css';
import '../styles/General.css';


class Home extends Component {
  constructor(){
    super();
    this.state={}
  }


render (){
     return (
      <div className="Home">
      <Menu/>
      <Slider/>
      <Terraza/>
      <Footer/>
      </div>
    )
  }
}

export default Home;
