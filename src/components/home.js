import React, {Component} from 'react';
import Menu from './header.js';
import Slider from './Slider.js';
import Terraza from './Terraza.js';

import '../styles/Home.css';
import '../styles/General.css';


class Home extends Component {
render (){
     return (
      <div className="Home">
      <Menu/>
      <Slider/>
      <Terraza/>
      </div>
    )
  }
}

export default Home;
