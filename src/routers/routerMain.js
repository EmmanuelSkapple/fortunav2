import React,{Component} from 'react'
import {Switch, Route,BrowserRouter} from 'react-router-dom'
import HomepageLayout from '../components/home.js';

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
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RouterPrincipal;
