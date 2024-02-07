import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HoverCard from '../../Cards/HoverCard';
import Cookies from 'js-cookie';

const ProductListing = () => {
    // axios to fetch and render
    useEffect(() => {
        fetchData();
    }, []);

    const [userloggedin,setUserloggedin] = useState(false);
    useEffect(() => {
        console.log(Cookies.get('ext_name'),Cookies.get('email'));
        var isCooks = Cookies.get('ext_name');
        if(isCooks){
            var email = Cookies.get('email');
            var userid = Cookies.get('userid');
            console.log("from productlisting:",email , userid);
            // make a get request using the email address
            setUserloggedin(true);
        }
        
    },[]);

    const userid = Cookies.get('userid');

    const [product, setProduct] = useState([]);
    const fetchData = async () => {
        const response = await axios.get('https://localhost:7101/product/Product/getallproduct')
        console.log(response.data);
        setProduct(response.data);
    }

    // for filtering
    const [selectedCategory, setSelectedCategory] = useState('');
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const categories = [...new Set(product.map(products => products.productCategory))];

    const filteredProducts = selectedCategory
    ? product.filter(products => products.productCategory === selectedCategory)
    : product;

    

    return (
        <div>
            <h1>Available Products in our store</h1>
            <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
            {/* create a hover card from  */}
            <div className='d-flex flex-wrap'>


                {
                    filteredProducts && filteredProducts.map(p => {
                        return (
                            <>
                                <div className=''>
                                    {/* <h1>{p.productName}</h1>
                            <img src={(`https://localhost:7101/resources/${p.productImage}`)} alt="images" /> */}
                                    <HoverCard
                                        product={p} 
                                        loggedin={userloggedin}
                                        userid={userid}
                                        />
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ProductListing;
