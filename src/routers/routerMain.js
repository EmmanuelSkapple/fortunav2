import React,{Component} from 'react'
import {Switch, Route,BrowserRouter} from 'react-router-dom'
import HomepageLayout from '../components/home.js';
import InfoExtraTerraza from '../components/infoTerraza.js'
import Variedades from '../components/Variedades.js'
class RouterPrincipal extends Component {
  state = {
    authed: false,
    loading: true,
  }


  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path= '/' component={HomepageLayout}/>
          <Route exact path= '/Terraza' component={InfoExtraTerraza}/>
          <Route exact path= '/variedades' component={Variedades}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RouterPrincipal;
