import React, { useState } from 'react'
import Base from '../core/Base'
import {isAuthenticated} from "../auth/helper"
import {Link} from 'react-router-dom'
import {createCategory} from './helper/adminapicall'

function AddCategory() {

    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user,token} = isAuthenticated()
 

    const goBack = () => {
        return(
            <div className="mt-5">
                <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">Return to Dashboard</Link>
            </div>
        )
    }

    const handleChange = event =>{
            setError("")
            setName(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setError('')
        createCategory(user.id,token,{name}).then(data=>{
            if(data.err){
                setError(true)
            }else{
                setError('')
                setName('')
                setSuccess(true)
            }
        }).catch(err=>{console.log(err)})
    }

    const successMessage = () => {
        if(success){
            return <h4 className="text-success">Category Created Successfully</h4>
        }
    }

    const errorMessage = () => {
        if(error){
            return <h4 className="text-success">Category Created Failed</h4>
        }
    }
    const addCategoryForm = () => {
        return (
            <form>
            <div className="form-group">
                <label className="text-black mb-0 mt-2">Category</label>
                <input type="text" className="form-control my-3" onChange={handleChange} value={name} autoFocus required placeholder="For Ex. Summer"/>
            </div>
            <button className="btn btn-outline-info my-2" onClick={onSubmit}>Create Category</button>
        </form>
        )
    }

    return (
        <Base title="Create Category" description='Add new Product Category' className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-2">
                    {successMessage()}
                    {errorMessage()}
                   {addCategoryForm() }{ goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory
