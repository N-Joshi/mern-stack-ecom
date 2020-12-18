import React from 'react'
import Base from '../core/Base'
import {isAuthenticated} from '../auth/helper/index'
import { Link } from 'react-router-dom';
 
function AdminDashBoard() {

    const {user: {name,email,role}} = isAuthenticated();

    const adminLeftCorner = () =>{
        return(
            <div className="card col-xs-4">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item"><Link className="nav-link text-success" to="/admin/create/category">Create Category</Link></li>
                    <li className="list-group-item"><Link className="nav-link text-success" to="/admin/categories">Manage Categories</Link></li>
                    <li className="list-group-item"><Link className="nav-link text-success" to="/admin/create/product">Create Product</Link></li>
                    <li className="list-group-item"><Link className="nav-link text-success" to="/admin/products">Manage Products</Link></li>
                    <li className="list-group-item"><Link className="nav-link text-success" to="/admin/orders">Manage Orders</Link></li>
                </ul>
            </div>
        )
    }

    const adminRightCorner =  () =>{
        return(
            <div className="card mb-4">
                <h4 className="card-header">Personal Info: </h4>
                <ul className="list-group">
                    <li className="list-group-item"><span className="badge badge-pill badge-warning mr-2">Name</span>{name}</li>
                    <li className="list-group-item"><span className="badge badge-pill badge-warning mr-2">Email</span>{email}</li>
                    <li className="list-group-item"><span className="badge badge-danger badge-pill mr-3">ADMIN ACCESS</span></li>
                </ul>
            </div>
        )
    }



    return (
       <Base title="Welcome to Admin Dashboard" description="You can manage the whole website from here" className="container bg-success p-4" >
            <div className="row">
            <div className="col-3">
            {adminLeftCorner()}
            </div>
            <div className="col-9">
            {adminRightCorner()}
            </div>
            </div>
       </Base>
    )
}

export default AdminDashBoard
