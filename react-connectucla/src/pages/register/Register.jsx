import React, {useRef} from 'react';
import {useNavigate} from 'react-router';
import Button from '@mui/material/Button';
import "./register.css"
import UserAPI from '../../services/user.js'

export default function Register() {
    const username= useRef();
    const password= useRef();
    const email= useRef();
    const passwordAgain= useRef();
    const isOrganization = useRef();
    const navigate = useNavigate();

    const handleRegister= async (e)=>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value) {
            password.current.setCustomValidity("Passwords do not match. Try again.")
        } else if (isOrganization.current.checked && !email.current.value) {
            email.current.setCustomValidity("Email required for organization registration.")
        } else {
            try {
                const user = {
                    username: username.current.value,
                    password: password.current.value,
                    email: email.current.value ? email.current.value : null,
                    isOrganization: isOrganization.current.checked
                }
                await UserAPI.registerUser(user);
                navigate("/login");
            } catch(err){
                console.log(err);
            }
        }
    };
    const handleLogin=()=> {
        window.location.href = "/login";
    }

    return (
        <div className="register">
            <Button className="regLogoBox" href="/">ConnectUCLA</Button>
            <form className="regBox" onSubmit={handleRegister}>
                <input 
                    className="regInput" 
                    placeholder="Username" 
                    type="username *"
                    ref={username}
                    required
                />
                <label>
                    <input
                    type="checkbox"
                    ref={isOrganization}
                    />
                    I am a club / organization. 
                </label>

                <input 
                    className="regInput" 
                    placeholder="Email" 
                    type="email"
                    ref={email}
                />
                
                <input 
                    className="regInput" 
                    placeholder="Password *" 
                    type="password"
                    ref={password}
                    minLength="8"
                    required
                />

                <input 
                    className="regInput" 
                    placeholder="Confirm *" 
                    type="password"
                    ref={passwordAgain}
                    minLength="8"
                    required
                />

                <button className="regButton" 
                type="submit">Register</button>

                <button 
                    className="registerLoginButton" 
                    onClick={handleLogin}>
                    Return to Log In
                </button>
            </form>
        </div>
    );
}
