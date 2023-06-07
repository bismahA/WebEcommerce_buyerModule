import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios';
import "../css/style.css"

const LoginForm = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (!loginData.email.includes("@")) {
            alert("Invalid email");
            return;
        }

        // Check password length
        if (loginData.password.length < 1 || loginData.password.length > 15) {
            alert("Password must be between 1 and 15 characters");
            return;
        }

        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharRegex.test(loginData.password)) {
            alert("Password must contain a special character");
            return;
        }


        try {
            const response = await axios.post('http://localhost:3000/user/login', loginData);
            const { token } = response.data;

            // Save token to localStorage
            localStorage.setItem('token', token);

            // Redirect or perform any other action after successful login
            console.log('Login successful');
            navigate("/home")
        } catch (error) {
            alert(error.response.data.message, "TRY AGAIN!!")
            console.error('Login error:', error.response.data.message);
            setLoginData({ email: '', password: '' });
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
                <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Log in</button>
            </form>
        </div>
    );
};

const SignupForm = () => {

    const navigate = useNavigate();
    const [signupData, setSignupData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPass: '',
    });

    const handleSignupChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        // if (signupData.password !== signupData.confirmPass) {
        //   console.error('Password not matching');
        //   return;
        // }
        // Check if email is valid
        if (!signupData.email.includes("@")) {
            alert("Invalid email");
            return;
        }

        // Check password length
        if (signupData.password.length < 1 || signupData.password.length > 8) {
            alert("Password must be between 1 and 8 characters");
            return;
        }
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharRegex.test(signupData.password)) {
            alert("Password must contain a special character");
            return;
        }

        // Check if first name and last name contain only letters
        const nameRegex = /^[A-Za-z]+$/;
        if (!nameRegex.test(signupData.firstName) || !nameRegex.test(signupData.lastName)) {
            alert("First name and last name must contain only letters");
            return;
        }

        // Check if any field is left empty
        for (const key in signupData) {
            if (signupData[key] === "") {
                alert("Please fill in all fields");
                return;
            }
        }

        if (signupData.password !== signupData.confirmPass) {
            alert('Password not matching');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/user/signup', signupData);
            console.log('Signup successful:', response.data);
            alert("Signup successful!Now plz login")
            setSignupData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPass: '',
              });
              
            navigate("/")
        } catch (error) {
            alert(error.response.data.error)
            console.error('Signup error:', error.response.data.error);
            
        }
    };

    return (
        <div className="signup-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={signupData.firstName}
                    onChange={handleSignupChange}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    value={signupData.lastName}
                    onChange={handleSignupChange}
                    placeholder="Last Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    placeholder="Password"
                    required
                />
                <input
                    type="password"
                    name="confirmPass"
                    value={signupData.confirmPass}
                    onChange={handleSignupChange}
                    placeholder="Confirm Password"
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

const AuthPage = () => {
    return (
        <div>
            <div className="logo" style={{ paddingBottom: '50px', fontSize: '80px', textAlign: 'center' }}>
                <Link to="/home" >دورہ فِروشی سینٹر</Link>
            </div>
            <div className="auth-page">

                <LoginForm />
                <SignupForm />
            </div>
        </div>

    );
};

export default AuthPage;
