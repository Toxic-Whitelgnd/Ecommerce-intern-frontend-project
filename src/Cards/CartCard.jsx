import React, { useState } from 'react';
import "../Styles/global.css";
import { ToastContainer, toast } from 'react-toastify';

const CartCard = ({ product, onIncrement, onDecrement , onDelete }) => {
    const [prdqty, setPrdqty] = useState(1);

    return (
        <div>
            <div className='CartCardContainer'>
                <div className="row">
                    <div className="col">
                        <img className='CartcardImage' src={(`https://localhost:7101/resources/${product.productImage}`)} alt='fkimage' />

                    </div>
                    <div className="col">
                        <div className="row"><h3>{product.productName}</h3></div>
                        <div className="row"> </div>
                        <div className="col text-dark"><h3>Qty:</h3></div>
                        <div className="col mb-3 d-flex justify-content-center align-content-baseline text-black">
                        <button className='btn btn-danger me-3' onClick={()=>{onDecrement(product)}}>-</button> {product.productQty} <button onClick={()=>{onIncrement(product)}}className='btn btn-success ms-3'>+</button>
                        </div>
                        <div className="row"><h3>Size: {product.productSize}</h3></div>
                        <div className="row"><h3>Price: {product.productPrice}</h3></div>
                        <div className="row"><h3>Total: {product.productQty * product.productPrice}</h3></div>
                    </div>
                </div>
                <button className='btn btn-danger' onClick={()=>{
                    onDelete(product);
                    

                }}>Remove item</button>
            </div>
                <ToastContainer />
        </div>
    
    );
}

export default CartCard;
