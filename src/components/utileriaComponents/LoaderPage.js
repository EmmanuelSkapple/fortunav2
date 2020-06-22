import React, { Component } from 'react';
import '../../styles/General.css';

class Loader extends Component{
  render(){
    return(
      <div id="ContenedorLoader">
        <div id="subcontainerLoader">
          <div id="loader"></div>
        </div>
      </div>

    )
  }
}


export default Loader;
