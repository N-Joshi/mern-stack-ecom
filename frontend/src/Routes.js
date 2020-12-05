import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './core/Home'
import Signin from './user/Signin'
import Signup from './user/Signup'


function Routes() {
    return (
       <BrowserRouter>
           <Switch>
               <Route path='/' exact component={Home}></Route>
               <Route path='/signin' exact component={Signin}></Route>
               <Route path='/signup' exact component={Signup}></Route>
             
           </Switch>
       </BrowserRouter>
    )
}

export default Routes
