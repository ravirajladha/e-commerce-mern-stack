import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
const Signup = () => {
    useEffect(() => {
        const auth  = localStorage.getItem('user');
        if(auth)
        {
            navigate('/')
        }
    
    })
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const collectData = async () => {
        console.warn(name, email, password);
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        result = await result.json();
        console.warn(result)
        localStorage.setItem('user', JSON.stringify(result));

        if(result){
            navigate('/')
        }else{

            console.warn('error')
        }
    }
    return (
        <div>
            <h1>Register</h1>

            <input className="form-control" type="text" placeholder="Enter name" style={{ width: '50%' }} value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            <input className="form-control" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <input className="form-control" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" className="btn btn-primary" onClick={collectData}>Submit</button>
        </div>
    )
}

export default Signup;