import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { MdShoppingCart } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';

const ProductDetailPage = () => {
    const { pid } = useParams();
    useEffect(() => {
        fetchData();

        fetchSizes();
    }, [])

    const [data, setData] = useState('');
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://localhost:7101/product/Product/getproductbyid?id=${pid}`);
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }

    }

    const [productsize, setProductsize] = useState([]);
    const fetchSizes = async () => {
        try {
            const response = await axios.get(`https://localhost:7101/productsize/ProductSize/getproductsizebyid?productId=${pid}`);
            console.log(response.data);
            setProductsize(response.data);
        } catch (error) {
            console.log(error);
        }

    }

    const [selectedCategory, setSelectedCategory] = useState('');
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const categories = [...new Set(productsize.map(pds => pds.productSize))]
    const rating = [...new Set(productsize.map(pds => pds.productRating))]

    // For checking wheter the user sigged in or not
    const [userloggedin, setUserloggedin] = useState(false);
    useEffect(() => {
        console.log(Cookies.get('ext_name'), Cookies.get('email'));
        var isCooks = Cookies.get('ext_name');
        if (isCooks) {
            var email = Cookies.get('email');
            const userid = Cookies.get('userid');
            console.log("from productlisting:", email, userid);
            // make a get request using the email address
            setUserloggedin(true);
        }

    }, []);

    const userid = Cookies.get('userid');

    // TODO: QTY should be controlled
    const [prdqty,setPrdqty] = useState(1);
    const handleIncrement = ()=>{
        setPrdqty(prevqty => prevqty +1);
    }
    const handleDecrement = ()=>{
        if(prdqty > 1){
            setPrdqty(prevqty => prevqty - 1)
        }
        
    }

    // save the item before pushing to cart
    const getPrice = (p,qty) =>{
        return p.productOfferPrice * qty;
    } 

    const AddtoCartSaveDetails =  async (p) =>{
        if(selectedCategory == ""){
            toast.error("Please select the size")
        }else{
            const item_details = {
                productName: p.productName,
                productSize: selectedCategory,
                productQty: prdqty,
                productPrice: getPrice(p,prdqty),
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
        

        
    }

    // the details should contain name,qty , price , size , pid , uid , image

    return (
        <div>
            {
                data && data.map((p) => {
                    return (
                        <>
                            <h3>{p.productName}</h3>
                            <div>
                                <div className="row">
                                    <div className="col">
                                        <img className='ProductDetailImg' src={(`https://localhost:7101/resources/${p.productImage}`)} alt="images" />
                                    </div>
                                    <div className="col">
                                        <div className="row pd">Product Description: {p.productDescription}</div>
                                        <div className="row pd">Product Qty: {p.productQty}</div>
                                        <div className="row pd">Product Category: {p.productCategory}</div>
                                        <div className="row pd">Product OrginalPrice: ₹ <del> {p.productOrginalPrice} </del></div>
                                        <div className="row pd">Product offer price: ₹ {p.productOfferPrice}</div>
                                        <div className="col pd"><select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                                            <option value="">Set Size</option>
                                            {categories.map((category, index) => (
                                                <option key={index} value={category}>{category}</option>
                                            ))}
                                        </select>
                                            <p>{selectedCategory == '' ? '' : <><div className='col'>Selected size: {selectedCategory}</div></>}</p></div>
                                        {/* ADD QTY BTN */}
                                        <div className="col"><button className='btn btn-danger' onClick={handleDecrement}>-</button> {prdqty} <button onClick={handleIncrement} className='btn btn-success'>+</button></div>

                                        <div className="row pd">Rating : {rating}</div>
                                        <div className="ProductDetailBtn col">
                                            {userloggedin ? <button className="btn btn-success mt-5" onClick={() => {
                                                console.log("add to cart");
                                                AddtoCartSaveDetails(p);
                                            }}><MdShoppingCart /> </button> : <button disabled className="btn btn-success mt-5" onClick={() => {
                                                console.log("add to cart");
                                            }}><MdShoppingCart /> </button>}
                                            <button className='btn btn-danger mt-5 ms-5'>Buy now</button>
                                            <ToastContainer />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })
            }
        </div>
    );
}

export default ProductDetailPage;
