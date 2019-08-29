import React from 'react';
import {Link} from 'react-router-dom'

import '../styles/Header.css';
import '../styles/General.css';

function Menu() {
  return (
    <div className="Menu">
      <ul className="col4">
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
          <Link className="menu" to={`/tienda`}>Tienda</Link>
        </li>
      <div className="clear"></div>
      </ul>
    </div>
  );
}

export default Menu;
