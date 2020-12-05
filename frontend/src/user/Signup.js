import React, { useState } from 'react'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import { signup } from '../auth/helper'

function Signup() {

    const [values, setvalues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    })

    const {name,email,password,success,error} = values

    const handleChange = name => event => {
        setvalues({...values, error: false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        setvalues({...values,error:false})
        signup({name,email,password})
        .then(data=>{
            if(data.error){
                setvalues({...values , error:data.error,success:false})
            }else{
                setvalues({...values , name:'' ,email:'' ,password:'',error:'',success:true})
            }
        })
        .catch(console.log('Error in signup'))
    }

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input type='text' className="form-control" value={name} onChange={handleChange("name")}/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">E-mail</label>
                            <input  className="form-control" type='email'  value={email} onChange={handleChange("email")}/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input  className="form-control" type='password'  value={password} onChange={handleChange("password")}/>
                        </div>
                        <button className="btn btn-warning btn-block"  onClick={onSubmit}>Sign Up</button>
                    </form> 
                </div>
            </div>
        )
    }

    const successMessage = () =>{
        return (
        <div className="alert alert-success" style={{display:success ? "" : "none"}}>
            New Account Created successfully. Please <Link to="/signin">Login Here</Link>
        </div>)
    }

    const errorMessage = () =>{
        return (
        <div className="alert alert-danger" style={{display:error ? "" : "none"}}>
          {error}
        </div>)
    }

    return (
     <Base title="Sign Up Form" description="Sign up to check out other cool features">
         {successMessage()}
         {errorMessage()}
         {signUpForm()}
         <p className="text-white text-center">{JSON.stringify(values)}</p>
     </Base>
    )
}

export default Signup
