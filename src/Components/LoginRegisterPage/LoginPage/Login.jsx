import React, { useState } from 'react';
import img1 from "../../../assets/image-4.png"
import img2 from "../../../assets/image-3.png"
import { MdMail, MdMobileScreenShare, MdPassword, MdVerifiedUser } from "react-icons/md";
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../../Styles/global.css";


const Login = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
        
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		try {
			const response = await axios.get('https://localhost:7101/api/LoginSignup/login', {
				params: {
					email: formData.email,
					password: formData.password,
				},
			});

			console.log('Data sent successfully:', response.data);



			if (response.data === 'Invalid user') {
				toast.error("No user Found")

			} else {


				var val = response.data
				setLoggedIn(true);

				// Store data in cookies
				Cookies.set('email', val.email);
				Cookies.set('loggedIn', true);
				Cookies.set('userid', val.id);

				console.log('Data stored in cookies:', Cookies.get());
				window.location.href = '/';
				toast.success("Login succesful")
			}




			setFormData({
				email: '',
				password: '',

			});
			// Handle success or perform additional actions here




		} catch (error) {
			console.error('Error sending data:', error);
			// Handle error or show a user-friendly message
			toast.error("Backend error: " + error)
		}
	};


	return (
		<div>
			<div class="wrapper">
				<div class="inner">
					<img src={img1} alt="" class="image-4" />
					<form action="" onSubmit={handleSubmit}>
						<h3 className='he'>Already User?</h3>
						<div class="form-holder">
							<span class="lnr lnr-envelope"><MdMail /></span>
							<input type="text" name="email" value={formData.email} onChange={handleChange} class="form-control" placeholder="Mail" />
						</div>
						<div class="form-holder">
							<span class="lnr lnr-lock"><MdPassword /></span>
							<input type="password" name="password" value={formData.password} onChange={handleChange} class="form-control" placeholder="Password" />
						</div>
                        
						<button className='btn1'>
							<span>Login</span>
						</button>
					</form>
					<img src={img2} alt="" class="image-3" />
				</div>
			</div>
			<ToastContainer />
		</div>

	);
}

export default Login;
