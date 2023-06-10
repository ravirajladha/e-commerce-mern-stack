
import React from 'react'

import { Link, useNavigate } from 'react-router-dom'
import MyImage from './logo.jpg';
//if we will use <link>, then the page will nto get refresh
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div>
 
            {auth ? <ul className="nav-ul">
                <li><img src={MyImage} alt="image1" style={{height:'50px'}}/></li>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/Add_product">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>

                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/signup">logout {JSON.parse(auth).name}</Link></li></ul>
                :

                <ul className="nav-ul" > 
                <li><img src={MyImage} alt="image1" style={{height:'50px'}}/></li>
                    <li style={{float:'right'}}><Link to="/signup">Signup</Link> </li> <li style={{float:'right'}}><Link to="/login">Login</Link> </li>
                </ul>
            }
        </div>
    )
}

export default Nav