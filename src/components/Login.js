import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {API_URL} from '../api';
const Login = (props) => {
    const [credential, setCredential] = useState({ email:"", password:""});
    let history=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(API_URL+'/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name:credential.name,email: credential.email, password: credential.password })
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            history('/');
            props.showAlert("Successfully Login","success");            
        }
        else{
            props.showAlert("Invalid Credential","danger");
        }
    }
    const onChange = (e) => {
        console.log(e.target.name, e.target.value);
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <>
        {console.log(API_URL)}
        <div className="d-flex w-50 justify-content-center p-5 bg-dark text-light">
            <div>
            <h2 className='mb-4'>Login to Save Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email" value={credential.email} onChange={onChange} id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={credential.password} onChange={onChange} id="password" placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary mt-4 w-100">Login</button>
            </form>
        </div>
        </div>
        </>
    )
}

export default Login
