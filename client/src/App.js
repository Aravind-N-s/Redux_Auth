import _ from 'lodash'
import './Config/App.css';
import React from 'react';

import {connect} from 'react-redux'

import {BrowserRouter, Route, NavLink, Switch} from 'react-router-dom'

import Login from './Components/User/Login'
import Logout from './Components/User/Logout'
import Account from './Components/User/Account'
import Register from './Components/User/Register' 

class App extends React.Component {
  render(props){
    return (
      <BrowserRouter>
        {!_.isEmpty(this.props.user)?( //logined in
          <div>
              <NavLink to="/users/account">Account</NavLink><br/>       
            <Switch>
              <>   
                <Route exact strict path="/users/account" component={Account}/>                     
                <Route exact strict path="/users/logout" component={Logout}/>             
              </>
            </Switch>      
          </div>
        ):( //logged out
          <div>
              <Login/>
              <Register/>
          </div>
        )}     
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(App)