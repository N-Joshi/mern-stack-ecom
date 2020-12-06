import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import AdminRoutes from './auth/helper/AdminRoutes'
import PrivateRoutes from './auth/helper/PrivateRoutes'
import Home from './core/Home'
import AdminDashBoard from './user/AdminDashBoard'
import Signin from './user/Signin'
import Signup from './user/Signup'
import UserDashBoard from './user/UserDashBoard'



function Routes() {
    return (
       <BrowserRouter>
           <Switch>
               <Route path='/' exact component={Home}></Route>
               <Route path='/signin' exact component={Signin}></Route>
               <Route path='/signup' exact component={Signup}></Route>
                <PrivateRoutes path='/user/dashboard' exact component={UserDashBoard}></PrivateRoutes>
                <AdminRoutes  path='/admin/dashboard' exact component={AdminDashBoard }></AdminRoutes>
                <AdminRoutes  path='/admin/create/category' exact component={AddCategory }></AdminRoutes>
                <AdminRoutes  path='/admin/create/product' exact component={AddProduct }></AdminRoutes>
           </Switch>
       </BrowserRouter>
    )
}

export default Routes
