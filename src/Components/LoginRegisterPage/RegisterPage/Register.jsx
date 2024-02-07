import React, { useState } from 'react';
import axios from 'axios';
import img1 from "../../../assets/image-1.png"
import img2 from "../../../assets/image-2.png"
import { FaUser, FaPhone } from "react-icons/fa";
import { MdMail, MdPassword } from "react-icons/md";
import "../../../Styles/global.css";

const Register = () => {
	const [formData, setFormData] = useState({
		// Your form fields here, e.g., username, email, password, etc.
		name: '',
		email: '',
		phoneNumber: '',
		password: '',
		address:'',
	});

	/**
	 {
{
  "id": 0,
  "name": "RAJ",
  "email": "raj@gmail.com",
  "password": "raj",
  "phoneNumber": "8975637482",
  "address": ""
}
}
	 */



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
			// passing this to backend of the c#
			const response = await axios.post('https://localhost:7101/api/LoginSignup/register', JSON.stringify(formData),
				{
					headers: {
						'Content-Type': 'application/json',
					},
				});
			console.log('Data posted successfully:', response.data);
			// Handle success or perform additional actions here
			setFormData({
				name: '',
				email: '',
				password: '',
				phoneNumber: '',
				address:'',
			});

            window.location.href = '/login';
		} catch (error) {
			console.error('Error posting data:', error);
			// Handle error or show a user-friendly message
		}

	};
	return (
		<div>
			<div class="wrapper">
				<div class="inner">
					<img src={img1} alt="" class="image-1" />
					<form action="" method='post' onSubmit={handleSubmit}>
						<h3>New Account?</h3>
						<div class="form-holder">
							<span class="lnr lnr-user"><FaUser /></span>
							<input type="text" name='name' value={formData.name} onChange={handleChange} class="form-control" placeholder="Username" />
						</div>
						<div class="form-holder">
							<span class="lnr lnr-phone-handset"><FaPhone /></span>
							<input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} class="form-control" placeholder="Phone Number" />
						</div>
						<div class="form-holder">
							<span class="lnr lnr-envelope"><MdMail /></span>
							<input type="text" name="email" value={formData.email} onChange={handleChange} class="form-control" placeholder="Mail" />
						</div>
						<div class="form-holder">
							<span class="lnr lnr-lock"><MdPassword /></span>
							<input type="password" value={formData.password} onChange={handleChange} name="password" class="form-control" placeholder="Password" />
						</div>
						<button className='btn1'>
							<span>Register</span>
						</button>
					</form>
					<img src={img2} alt="" class="image-2" />
				</div>
			</div>
		</div>

	);
}

export default Register;
