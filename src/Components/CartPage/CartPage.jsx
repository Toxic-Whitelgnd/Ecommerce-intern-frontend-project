import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import CartCard from '../../Cards/CartCard';
import { ToastContainer, toast } from 'react-toastify';
import CheckoutPage from '../CheckoutPage/CheckoutPage';

const CartPage = () => {

    const [userloggedin, setUserloggedin] = useState(false);
    useEffect(() => {
        console.log(Cookies.get('ext_name'), Cookies.get('email'));
        var isCooks = Cookies.get('ext_name');
        if (isCooks) {
            var email = Cookies.get('email');
            var userid = Cookies.get('userid');
            console.log("from productlisting:", email, userid);
            // make a get request using the email address
            setUserloggedin(true);
        }

        fetchCartItems();
   

    }, []);

    const userid = Cookies.get('userid');

    const [cartItems, setCartitems] = useState([]);
    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`https://localhost:7101/cart/Cart/getcartbyuid?uid=${userid}`);
            setCartitems(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // for handling cart items
    const handleIncrement = (p) => {
        console.log("clciked on ince");
        setCartitems((previtme) => {
            return previtme.map(item => {
                if (item.id == p.id) {
                    const newqty = item.productQty + 1;
                    return { ...item, productQty: newqty }
                }

                return item;
            })
        })

    }
    const handleDecrement = (p) => {
        if (p.productQty > 1) {
            console.log("clciked on decrement");
            setCartitems((previtme) => {
                return previtme.map(item => {
                    if (item.id == p.id) {
                        const newqty = item.productQty - 1;
                        return { ...item, productQty: newqty }
                    }

                    return item;
                })
            })
        }

    }

    const handleDelete = async (p) => {
        try {
            const response = await axios.delete(`https://localhost:7101/cart/Cart/deletebypid?pid=${p.pId}`)
            console.log(response.data);
            toast.success("Item removed from the cart");
            setTimeout(() => {
                window.location.reload();
            }, 3000)
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
    // write teh function to get total
    const total = cartItems.reduce((acc, item) => {
        return acc + (item.productPrice * item.productQty);
    }, 0);

    // for handling the popup
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    

    const handleSaveCustomerDetails = (customerDetails) => {
        // Handle saving customer details here
        console.log("Customer details:", customerDetails);

        // TODO: SAVE CUSTOMER DEATILS
        UpdateCustomerDetails(customerDetails);

        // toast.success("Start the razor payment transaction")
        Checkout(customerDetails);
    };

    const UpdateCustomerDetails = async (customerDetails) => {
        try {
            const res = await axios.put('https://localhost:7101/api/LoginSignup/updateuserdata',customerDetails);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const Checkout = (cd)=>{
        const options = {
                key: 'rzp_test_AZ9LyozDGv5aSK',
                key_secret: 'k7q5Fkbd9EAoJaJ5JPl5dzrH',
                amount: total * 100, //dynamic
                currency: 'INR',
                name: 'Ecommerce',
                description: 'Pyament for a Ecoomerce order',
                // order_id: order_id, // dynamic
                handler: function (response) {
                    // Handle the payment success
                    alert(response.razorpay_payment_id);
                 
                    
                    setTimeout(() => {
                        SuccessfullPayment(response.razorpay_payment_id);
                        //     response.razorpay_signature);
                    }, 2000);
                },
                prefill: {
                    name: cd.name, // dynamic
                    contact: cd.mobileNo, // dynamic
                    email: cd.email, // dynamic
                },
                theme: {
                    color: '#528FF0', // restuarant theme
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        }

        const SuccessfullPayment = async (rzrpayid)=>{
            // save the customer details and items ordered by customer
            // uid , pid , name , qty , price , image , pdtsize , paymentid , date, time , Oevralltotal
            // delete from the cart 

            console.log(cartItems);
            const updateCartitem = cartItems.map(item =>{
                return {
                    ...item,
                    productTotal: item.productQty * item.productPrice ,
                    total: total,
                    paymentid: rzrpayid,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString([], { hour12: false }),
                }
            })
            console.log("how to save them");
            console.log(updateCartitem);

            const newArray = updateCartitem.map(item => {
                const { id, ...newItem } = item;
                return newItem;
              });

            const len = newArray.length;
            console.log(len);
            console.log(newArray);
            try {
                for(let i=0;i<len;i++){
                    const res = await axios.post('https://localhost:7101/items/ItemsOrdered/additems',newArray[i],{
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    console.log(res.data);
                    const res2 = await axios.delete(`https://localhost:7101/cart/Cart/deletebypid?pid=${newArray[i].pId}`)
                    console.log(res2.data);

                }

                toast.success("Order placed successfully!");
                setTimeout(()=>{
                    window.location.href = '/#/allproduct'
                },3000);
                
            } catch (error) {
                console.log(error);
            }
        }
    

      

    return (
        <div>
            <h1>Cart Items</h1>

            {userloggedin ? '' : <h3>Please login to use this</h3>}
            {
                cartItems.length > 0 ?
                    <div>


                        <div className='d-flex flex-wrap m-lg-5'>
                            {cartItems.map(p => {
                                return (
                                    <>
                                        <div>
                                            {p.productName} --- qty: {p.productQty} --- price: {p.productPrice} --- total: {p.productPrice * p.productQty}
                                            <CartCard
                                                product={p}
                                                onIncrement={handleIncrement}
                                                onDecrement={handleDecrement}
                                                onDelete={handleDelete}
                                            />
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                        <div>
                            <h3>Total: {total}</h3>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button className='btn btn-warning' onClick={() => setIsModalOpen(true)}>Checkout</button>
                            <CheckoutPage

                                isOpen={isModalOpen}
                                onClose={handleCloseModal}
                                onSave={handleSaveCustomerDetails} 
                                userid={userid}/>
                        </div>

                    </div>

                    : <h3>Add item to your cart  <ToastContainer /></h3>
            }
        </div>
    );
}

export default CartPage;
