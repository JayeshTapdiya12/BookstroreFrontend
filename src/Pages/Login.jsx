import React, { useState } from 'react'
import '../Style/Login.css'
import { Container, TextField, Button, Typography, Box, FormControlLabel, Checkbox } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import image from '../Assests/2766594.png'
// import { Link } from 'react-router-dom';
import { login } from '../Service/UserService';
import Alert from '@mui/material/Alert';
import Header from '../compoments/Header';
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();


    const send = async () => {
        if (email === "" || password === "") {
            setAlert(<Alert severity="error">Please enter all the details.</Alert>);
        } else {
            try {
                let res = await login(email, password);
                localStorage.setItem("token", res?.data?.data);
                navigate('/');
            } catch (error) {
                setAlert(<Alert severity="error">Login failed. Please try again.</Alert>);
            }
        }
    };
    const handleLogin = () => {

        send();

    };

    return (
        <>
            <Header />
            <div className="login-container">
                <div className="login-left">
                    <img src={image} alt="Online Book Shopping" className="login-image" style={{ borderRadius: "15vw" }} />
                    <p>ONLINE BOOK SHOPPING</p>
                </div>
                <div className="login-right">
                    <div className="login-box">
                        <div className="login-header">
                            <h2 className='active-tab'>LOGIN</h2>
                            <Link to={'/sign'} style={{ textDecoration: "none" }}>
                                <h2 className='inactive-tab'>SIGNUP</h2>
                            </Link>
                        </div>
                        <div className="input-group">
                            <label>Email Id</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="forgot-password">
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button onClick={handleLogin} className="login-button">Login</button>
                        <div className="or-divider">OR</div>
                        <div className="social-login">
                            <button className="social-button facebook">Facebook</button>
                            <button className="social-button google">Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
