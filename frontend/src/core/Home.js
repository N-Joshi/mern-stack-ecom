import React, { useEffect, useState } from 'react'
import {API} from '../backend'
import Base from './Base'
import Card from './Card'
import {getProducts} from './helper/coreapicalls'


function Home() {
 

    const [products,setProducts] = useState([])
    const [error,setError] = useState(false)


    const loadAllProducts=()=>{
        getProducts().then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProducts(data)
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        loadAllProducts()
    },[])


    return (
        <Base title="ECOM STORE" description="Welcome to the store">
        <div className="row text-center">
            {products.map((prod,index)=>{
                return (
                    <div className="col-4" key={index}>
                        <Card product={prod}/>
                        </div>
                )
            })}
            </div>
        </Base>
    )
}

export default Home
