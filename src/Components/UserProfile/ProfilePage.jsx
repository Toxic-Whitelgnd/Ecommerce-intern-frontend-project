import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const ProfilePage = () => {

    useEffect(() => {
        fetchUserDeatils();
    }, []);

    const userid = Cookies.get('userid');

    const [userdeat, setUserdeat] = useState('');
    const fetchUserDeatils = async () => {
        try {
            const res = await axios.get(`https://localhost:7101/api/LoginSignup/getuserdatabyid?id=${userid}`);
            console.log(res.data);
            setUserdeat(res.data);


        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        // Clear cookies and reset state
        Cookies.remove('ext_name');
        Cookies.remove('email');
        Cookies.remove('loggedIn');
        window.location.reload();
      };

    return (
        <div>
            <h1>User Profile Page</h1>
            {userdeat && (
                <>
                    <h3>Name: {userdeat.name}</h3>
                    <h3>Mobile: {userdeat.phoneNumber}</h3>
                    <h3>email: {userdeat.email}</h3>
                    <h3>Address: {userdeat.address ? userdeat.address : ''}</h3>
                </>
            )}
            <div>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default ProfilePage;
