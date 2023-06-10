import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'

const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth =localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })
    const handleData = async () => {
        console.warn(email, password);
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        result = await result.json();
        // console.warn(result)
        // localStorage.setItem('user', JSON.stringify(result));
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/')

        } else {
            alert('please correct Credentials')
        }
    }
    // const handleData =  async () => {
    //     console.warn(email, password);
    // }
    return (
        <div>
            <h1>Login page</h1>


            <input className="form-control" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <input className="form-control" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" className="btn btn-primary" onClick={handleData}>Submit</button>
        </div>
    )
}

export default Login