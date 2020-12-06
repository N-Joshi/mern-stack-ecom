import React, { useState } from 'react'
import Base from '../core/Base'
import {Link , Redirect } from 'react-router-dom'
import { signin , authenticate , isAuthenticated  } from '../auth/helper'


function Signin() {

    const [values, setvalues] = useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        didRedirect:false,
        success:false
    })

    const {email,password,success,error,didRedirect,loading} = values
    const  {user} = isAuthenticated()

    const handleChange = name => event => {
        setvalues({...values, error: false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        setvalues({...values,error:false,loading:true})
        signin({email,password})
        .then(data=>{
            if(data.err){
                setvalues({...values , error:data.err,loading:false,success:false})
            }else{
                authenticate(data , () =>
                         setvalues({...values , email:'' ,password:'',error:'',success:true,didRedirect:true,loading:true})
                )
            }   
        })
        .catch(err=> {console.log('Error in signin')})
    }

    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard"/>
            }else{
                return  <Redirect to="/user/dashboard"/>
            }
        }
        if(isAuthenticated()){
           return <Redirect to='/' />
        }
    }

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">E-mail</label>
                            <input  className="form-control" type='email' value={email} onChange={handleChange("email")}/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input  className="form-control" type='password' value={password} onChange={handleChange("password")}/>
                        </div>
                        <button className="btn btn-warning btn-block" onClick={onSubmit}>Login</button>
                    </form> 
                </div>
            </div>
        )
    }

    const successMessage = () =>{
        return (
        loading && 
        <div className="alert alert-info" >
          <h2>Loading...</h2>
        </div>)
    }

    const errorMessage = () =>{
        return (
        <div className="alert alert-danger" style={{display:error ? "" : "none"}}>
          {error}
        </div>)
    }
    
    
    return (
        <div>
           <Base title="Login Form" description="Already a customer ?? Sign In">
            {successMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            </Base>
        </div>
    )
}

export default Signin
