import React,{useEffect,useState} from 'react'
import Tilt from 'react-parallax-tilt';
import { MdFavorite, MdShoppingCart } from "react-icons/md";
import "../Styles/global.css";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const HoverCard = ({product, loggedin, userid}) => {

    const getPrice = (p,qty) =>{
        return p.productOfferPrice * qty;
    } 

    const AddtoCartSaveDetails =  async (p) =>{
        
            const item_details = {
                productName: p.productName,
                productSize: "M",
                productQty: 1,
                productPrice: getPrice(p,1),
                pId: p.pId,
                uId: Number(userid),
                productImage:p.productImage,
            }

            console.log(item_details);
            try {
                const response = await axios.post('https://localhost:7101/cart/Cart/addtocart', item_details);
                console.log(response.data);
                if(response.data == "ItemExist"){
                    toast.warn("Item already exist in the cart Qty has been updated");
                }
                else{
                    toast.success("Item added to cart successfully!");
                }
            } catch (error) {
                toast.error("Something went wrong")
            }
        
    }

    return (
        <div>
            <div className=''>
                <div className="m-5">
                    <div className="HovCard">
                        <div className="ImgTilt">
                                <Tilt>
                                <img className='ProductImg' src={(`https://localhost:7101/resources/${product.productImage}`)} alt="images" />
                                </Tilt>
                        </div>
                        <div className="HovCardDetail">
                            <h3 className='text-red text-capitalize'>{product.productName}</h3>
                            <h4 className='text-red-50 ms-5 mb-4 text-capitalize'>Price :{product.productOfferPrice ? <> <del>{product.productOrginalPrice}</del> <span>Offer Price:{product.productOfferPrice}</span> </> : product.productOrginalPrice}</h4>
                            <div className="HovCardBtn">
                                {loggedin ? <button className="btn btn-success" onClick={()=>{
                                    console.log("add to cart");
                                    AddtoCartSaveDetails(product);
                                }}><MdShoppingCart /> </button> : <button disabled className="btn btn-success" onClick={()=>{
                                    console.log("add to cart");
                                }}><MdShoppingCart /> </button>}
                                
                                <button className="btn btn-danger" onClick={()=>{
                                    console.log("navigate to product details");
                                    window.location.href = `/#/productdetail/${product.pId}`;
                                }}>View</button>
                            </div>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// TODO: add -- Add to cart and show -- product details page with pid as params 

export default HoverCard;
