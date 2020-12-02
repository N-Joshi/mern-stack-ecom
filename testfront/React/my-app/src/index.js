import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Link,Switch,BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import error from './error';
import user from './user';
import Visit from './Visit';

const Routing = (
  <BrowserRouter>
  <div>
    <ul>
      <li ><Link to="/">Home</Link></li>
      <li> <Link to="/user">User</Link></li>
    </ul>
  </div>
  <Switch>
   <Route exact path="/" component={App}></Route>
   <Route path="/visit" component={Visit}></Route>
   <Route path="/user" component={user}></Route>
   <Route component={error}></Route>
   </Switch>
  </BrowserRouter>
)


ReactDOM.render(
  Routing,
  document.getElementById('root')
);


reportWebVitals();
