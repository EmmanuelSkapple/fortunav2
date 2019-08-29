import React from 'react';
import {Link} from 'react-router-dom'

import '../styles/Slider.css';
import '../styles/General.css';

function Slider() {
  return (
    <div>
      <div>
        <video id="videoBG" autoPlay muted loop playsInline poster='imgs/01.JPG'>

            <source src="imgs/fortuna-web.webm" type="video/webm"/>
            <source src="imgs/fortuna-web.mp4" type="video/mp4"/>
        </video>
      </div>
      </div>
  );
}

export default Slider;
