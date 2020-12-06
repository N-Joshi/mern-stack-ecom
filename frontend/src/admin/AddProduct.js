import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Base from '../core/Base'
import {createAProduct, getAllCategories } from './helper/adminapicall'
import {isAuthenticated} from '../auth/helper/index'

function AddProduct() {

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        inventory: "",
        images:"",
        categories:[],
        category:'',
        loading:false,
        error:'',
        productCreated:"",
        getRedirect:false,
        formData:""
      });
    
      const { name, description, price, inventory,categories,images,category,loading,error,productCreated,getRedirect,formData} = values;
      const  {user,token} = isAuthenticated()

      const handleChange = name => event => {
        const value = name === 'images' ? event.target.files[0] :  event.target.value
        formData.set(name,value)
        setValues({...values, error: false, [name]: value})
      }

      useEffect(() => {
        preload()
      }, [])

      const preload = () =>{
        getAllCategories().then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({ ...values, categories: data, formData: new FormData() });
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    const goBack = () => {
        return(
            <div className="mt-5">
                <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">Return to Dashboard</Link>
            </div>
        )
    }

    const onSubmit = (event) => {
            event.preventDefault()
            setValues({...values, error:'',loading:'true'})
            createAProduct(user.id,token,formData).then(data=>{
                if(data.error){
                    setValues({...values,error:data.error})
                }else{
                    setValues({...values,name:"",description:"",price:"",productCreated:data.name,category:"",inventory:'',loading:false,images:''})
                }
            }).catch(err=>{
                console.log(err)
            })
        };
    

    const addProductForm = () => (
        <form>
          <span>Post images</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("images")}
                type="file"
                name="images"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="name"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="description"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
             {categories && 
                categories.map((cat,index)=> (
                    <option key={index} value={cat._id}>{cat.name}</option>
                ))
             }
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("inventory")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={inventory}
            />
          </div>
    
          <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-outline-success mb-3"
          >
            Create Product
          </button>
        </form>
      );
    

    const successMessage = () => {
        if(productCreated){
            return <h4 className="text-success">{productCreated} Created Successfully</h4>
        }
    }

    const errorMessage = () => {
        if(error){
            return <h4 className="text-success">Category Created Failed</h4>
        }
    }

    return (
        <Base title="Create Product" description='Add a new Product ' className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-2">
                    {successMessage()}
                    {errorMessage()}
                    {addProductForm() }{ goBack()}
                  
                </div>
            </div>
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    )
}

export default AddProduct
