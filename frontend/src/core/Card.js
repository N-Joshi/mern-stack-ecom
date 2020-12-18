import React, { useState } from "react";
import {Redirect} from 'react-router-dom'
import { addItemToCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({ product , addCart=true,removeCart=false}) => {
  
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescrption = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };


   const showAddToCart = (addCart) =>{
       return(
        addCart && <button
        onClick={addToCart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
        >
            Add to Cart
        </button>
       )

   }

   const showRemoveCart = (removeCart) =>{
      return(
        removeCart && <button
        onClick={() => {}}
        className="btn btn-block btn-outline-danger mt-2 mb-2"
      >
        Remove from cart
      </button>
      ) 
    }

  return (
    <div className="card text-white bg-dark border border-info mt-2 ">
      <div className="card-header lead">{product.name}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap mt-1 mb-2">
          {product.description}
        </p>
        <p className="lead bg-success font-weight-normal text-wrap">
          Category : {product.category.name}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">${product.price}</p>
        <div className="row">
          <div className="col-12" >{showAddToCart(addCart)}</div>
          <div className="col-12" >{showRemoveCart(removeCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
