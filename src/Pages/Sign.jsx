import React, { useState } from 'react'
import '../Style/Sign.css'
import { Link } from 'react-router-dom';
import image from '../Assests/2766594.png'
import { useNavigate } from 'react-router-dom';
import { sign } from '../Service/UserService';
import Header from '../compoments/Header';
const Sign = () => {
    const [name, setName] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');

    const navigate = useNavigate();

    const send = async (userDetails) => {

        if (email === "" || password === "" || name === "" || lname === "" || mobile === "") {
            alert("Please enter all the details.");
        } else {
            try {
                let res = await sign(name, lname, email, password, mobile);

                navigate('/login');
            } catch (error) {
                alert("Sign-up failed. Please try again.");
            }
        }
    };


    const handleSignup = () => {
        send()
    };

    return (
        <>
            <Header />
            <div className="signup-container">
                <div className="signup-left">
                    <img src={image} alt="Online Book Shopping" className="signup-image" style={{ borderRadius: "15vw" }} />
                    <p>ONLINE BOOK SHOPPING</p>
                </div>
                <div className="signup-right">
                    <div className="signup-box">
                        <div className="signup-header">
                            <Link to={'/login'} style={{ textDecoration: "none" }}>
                                <h2 className="inactive-tab">LOGIN</h2>
                            </Link>
                            <h2 className="active-tab">SIGNUP</h2>
                        </div>
                        <div className="input-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                placeholder="Enter First name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                placeholder="Enter last name"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                            />
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
                        <div className="input-group">
                            <label>Mobile Number</label>
                            <input
                                type="number"
                                placeholder="Enter mobile number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>
                        <button onClick={handleSignup} className="signup-button">Signup</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sign
