import React, { useEffect, useState } from 'react';
import "../../Styles/global.css"
import axios from 'axios';

const CheckoutPage = ({ isOpen, onClose, onSave , userid }) => {

    useEffect(()=>{
        fetchUserDeatils();
    },[]);

    const [userdeat,setUserdeat] = useState('');
    const fetchUserDeatils = async () => {
        try {
            const res = await axios.get(`https://localhost:7101/api/LoginSignup/getuserdatabyid?id=${userid}`);
            console.log(res.data);
            setUserdeat(res.data); 
            setCustomerDetails(res.data);
            
        } catch (error) {
            console.log(error);
        }
    };

    const [customerDetails, setCustomerDetails] = useState({
        name:  '',
        phoneNumber:  '',
        address: '',
        email:  '',
        id: 0,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        onSave(customerDetails);
        setCustomerDetails({
          name: '',
          phoneNumber: '',
          address: '',
          email: ''
        });
        onClose();
      };
    return (
        <div>
            <div className={`modal ${isOpen ? 'open' : ''}`}>
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2>Enter Customer Details</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input type="text" name="name" value={customerDetails.name} onChange={handleChange} />
                        </label>
                        <label>
                            Mobile Number:
                            <input type="text" name="phoneNumber" value={customerDetails.phoneNumber} onChange={handleChange} />
                        </label>
                        <label>
                            Address:
                            <input type="text" name="address" value={customerDetails.address} onChange={handleChange} />
                        </label>
                        <label>
                            Email ID:
                            <input type="text" name="email" value={customerDetails.email} onChange={handleChange} />
                        </label>
                        <button className='btn btn-success' type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
