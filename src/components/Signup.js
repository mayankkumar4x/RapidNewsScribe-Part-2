import React, { useState } from 'react'
// import {useHistory} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });
    let history = useNavigate();
    // const [password,setPassword]=useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credential;
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history('/');
            props.showAlert("Successfully Account Created", "success");
        }
        else {
            props.showAlert("Invalid Credential", "danger");
        }
    }
    const onChange = (e) => {
        console.log(e.target.name, e.target.value);
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h2>Signup to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control my-2" name="name" value={credential.name} onChange={onChange} id="name" aria-describedby="emailHelp" placeholder="Enter name" minLength={3} required />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control my-2" name="email" value={credential.email} onChange={onChange} id="email" aria-describedby="emailHelp" placeholder="Enter email" required />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control my-2" name="password" value={credential.password} onChange={onChange} id="password" placeholder="Password" minLength={5} required />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control my-2" name="cpassword" value={credential.cpassword} onChange={onChange} id="cpassword" placeholder="Confirm Password" pattern={credential.password} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
